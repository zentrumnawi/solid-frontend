import { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { readJsonFile } from '@nrwl/workspace';
import { fork } from 'child_process';
import { copy, removeSync } from 'fs-extra';
import * as glob from 'glob';
import { basename, dirname, join, relative } from 'path';
import { from, Observable, Subject, Subscriber } from 'rxjs';
import { FileInputOutput, SchematicOptions } from './schema';

interface NormalizedSchematicOptions extends SchematicOptions {
  files: Array<FileInputOutput>;
  normalizedOutputPath: string;
  relativeMainFileOutput: string;
}

export function normalizeOptions(
  options: SchematicOptions,
  context: BuilderContext
) {
  const outDir = options.outputPath;
  const files: FileInputOutput[] = [];

  const globbedFiles = (
    pattern: string,
    input: string = '',
    ignore: string[] = []
  ) => {
    return glob.sync(pattern, {
      cwd: input,
      nodir: true,
      ignore,
    });
  };

  options.assets.forEach((asset) => {
    if (typeof asset === 'string') {
      globbedFiles(asset, context.workspaceRoot).forEach((globbedFile) => {
        files.push({
          input: join(context.workspaceRoot, globbedFile),
          output: join(context.workspaceRoot, outDir, basename(globbedFile)),
        });
      });
    } else {
      globbedFiles(
        asset.glob,
        join(context.workspaceRoot, asset.input),
        asset.ignore
      ).forEach((globbedFile) => {
        files.push({
          input: join(context.workspaceRoot, asset.input, globbedFile),
          output: join(
            context.workspaceRoot,
            outDir,
            asset.output,
            globbedFile
          ),
        });
      });
    }
  });

  // Relative path for the dist directory
  const tsconfig = readJsonFile(join(context.workspaceRoot, options.tsConfig));
  const rootDir = tsconfig.compilerOptions.rootDir || '';
  const mainFileDir = dirname(options.main);
  const tsconfigDir = dirname(options.tsConfig);

  const relativeMainFileOutput = relative(
    `${tsconfigDir}/${rootDir}`,
    mainFileDir
  );

  return {
    ...options,
    files,
    relativeMainFileOutput,
    normalizedOutputPath: join(
      context.workspaceRoot,
      options.outputPath,
      'schematics'
    ),
  };
}

export function compileTypeScriptFiles(
  options: NormalizedSchematicOptions,
  context: BuilderContext
): Observable<BuilderOutput> {
  // Cleaning the /dist folder
  removeSync(options.normalizedOutputPath);
  const tsConfigPath = join(context.workspaceRoot, options.tsConfig);

  const obs = new Subject<BuilderOutput>();
  try {
    const args = ['-p', tsConfigPath, '--outDir', options.normalizedOutputPath];

    if (options.sourceMap) {
      args.push('--sourceMap');
    }

    const tscPath = join(
      context.workspaceRoot,
      '/node_modules/typescript/bin/tsc'
    );
    context.logger.info(
      // tslint:disable-next-line:no-non-null-assertion
      `Compiling TypeScript files for library ${context.target!.project}...`
    );
    const tscProcess = fork(tscPath, args, { stdio: [0, 1, 2, 'ipc'] });
    tscProcess.on('exit', (code) => {
      if (code === 0) {
        context.logger.info(
          `Done compiling TypeScript files for library ${
          // tslint:disable-next-line:no-non-null-assertion
            context.target!.project
          }`
        );
        obs.next({ success: true });
      } else {
        obs.error('Could not compile Typescript files');
      }
      obs.complete();
    });
  } catch (error) {
    obs.error(new Error(`Could not compile Typescript files: \n ${error}`));
  }
  return obs;
}

export function copyAssetFiles(
  options: NormalizedSchematicOptions,
  context: BuilderContext
): Promise<BuilderOutput> {
  context.logger.info('Copying asset files...');
  return Promise.all(options.files.map((file) => copy(file.input, file.output)))
    .then(() => {
      context.logger.info('Done copying asset files.');
      return {
        success: true,
      };
    })
    .catch((err: Error) => {
      return {
        error: err.message,
        success: false,
      };
    });
}
