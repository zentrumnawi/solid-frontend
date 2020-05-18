import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { BuildAngularLibraryWithSchematicsBuilderOptions } from './schema';
import { JsonObject } from '@angular-devkit/core';
import {
  compileTypeScriptFiles,
  copyAssetFiles,
  normalizeOptions,
} from './compile-schematics';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export function runBuilder(
  options: BuildAngularLibraryWithSchematicsBuilderOptions & JsonObject,
  context: BuilderContext
): Observable<BuilderOutput> {
  const logger = context.logger.createChild('package build process');
  const normalizedOptions = normalizeOptions(options.schematicOptions, context);
  return from(
    new Promise<BuilderOutput>(async (resolve) => {
      const result = await context.scheduleBuilder(
        '@nrwl/angular:package',
        options.packageOptions as any,
        {
          logger,
          target: context.target,
        }
      );
      resolve(result.result);
    })
  ).pipe(
    switchMap(() => {
      return compileTypeScriptFiles(normalizedOptions, context);
    }),
    switchMap(() => {
      return copyAssetFiles(normalizedOptions, context);
    })
  );
}

export default createBuilder(runBuilder);
