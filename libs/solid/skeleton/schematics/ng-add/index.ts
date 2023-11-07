import {
  apply,
  applyTemplates,
  chain,
  externalSchematic,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { Schema } from './schema';
import { addPackageJsonDependency } from '@schematics/angular/utility/dependencies';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { InsertChange } from '@schematics/angular/utility/change';
import { targetBuildNotFoundError } from '@schematics/angular/utility/project-targets';
import { relativePathToWorkspaceRoot } from '@schematics/angular/utility/paths';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import {
  getEnvironmentExportName,
  insertImport,
  addSymbolToNgModuleMetadata,
} from '@schematics/angular/utility/ast-utils';
import { DEPENDENCIES } from '../dependencies';
import { normalize } from '@angular-devkit/core';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';

const materialOptions = {
  theme: 'custom',
  typography: true,
  animations: 'true',
};

export function addBaseDependency() {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
  };
}

export function addDependencies() {
  return (tree: Tree, context: SchematicContext) => {
    DEPENDENCIES.forEach((dep) => {
      addPackageJsonDependency(tree, dep);
    });
    return tree;
  };
}

export function getTsSourceFile(tree: Tree, path: string) {
  const buffer = tree.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not read file (${path}).`);
  }
  const content = buffer.toString();
  return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
}

export function getEnvironmentImport(mainPath: string) {
  return (tree: Tree): { name: string; path: string } => {
    const modulePath = getAppModulePath(tree, mainPath);
    const moduleSource = getTsSourceFile(tree, modulePath);
    const environmentExportName = getEnvironmentExportName(moduleSource);
    // if environment import already exists then use the found one
    // otherwise use the default name
    const name = environmentExportName || 'environment';
    const path = '../environments/environment';

    if (!environmentExportName) {
      // if environment import was not found then insert the new one
      // with default path and default export name
      const change = insertImport(moduleSource, modulePath, name, path);
      if (change) {
        const recorder = tree.beginUpdate(modulePath);
        recorder.insertLeft(
          (change as InsertChange).pos,
          (change as InsertChange).toAdd,
        );
        tree.commitUpdate(recorder);
      }
    }
    return { name, path };
  };
}

const modulesToImport: [string, string, string?][] = [
  [
    'NgxsModule',
    '@ngxs/store',
    `NgxsModule.forRoot([], {
      developmentMode: !ENV_NAME.production
    })`,
  ],
  [
    'NgxsDispatchPluginModule',
    '@ngxs-labs/dispatch-decorator',
    'NgxsDispatchPluginModule.forRoot()',
  ],
  [
    'NgxsRouterPluginModule',
    '@ngxs/router-plugin',
    'NgxsRouterPluginModule.forRoot()',
  ],
  [
    'NgxsReduxDevtoolsPluginModule',
    '@ngxs/devtools-plugin',
    `NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: ENV_NAME.production
    })`,
  ],
  ['MatButtonModule', '@angular/material/button'],
  ['MatCardModule', '@angular/material/card'],
  ['MatIconModule', '@angular/material/icon'],
  [
    'RouterModule',
    '@angular/router',
    "RouterModule.forRoot([], { onSameUrlNavigation: 'reload' })",
  ],
];

const componentsToImport: [string, string][] = [
  [
    'LandingBannerContentComponent',
    './components/landing-banner-content/landing-banner-content.component',
  ],
  ['PrivacyComponent', './components/privacy/privacy.component'],
];

export function addImportToNgModule(
  host: Tree,
  modulePath: string,
  classifiedName: string,
  importPath: string,
  customImportFn?: string,
) {
  const moduleSource = getTsSourceFile(host, modulePath);
  {
    const change = insertImport(
      moduleSource,
      modulePath,
      classifiedName,
      importPath,
    );
    const recorder = host.beginUpdate(modulePath);
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
    host.commitUpdate(recorder);
  }
  const recorder = host.beginUpdate(modulePath);
  const changes = addSymbolToNgModuleMetadata(
    moduleSource,
    modulePath,
    'imports',
    classifiedName, //customImportFn || classifiedName,
    null,
  );
  //   (module[0]),// || module[0]).replace('ENV_NAME', environment.name),
  //   null,
  // );
  if (changes) {
    changes.forEach((change) => {
      if (change instanceof InsertChange) {
        const insertChange = change as InsertChange;
        recorder.insertRight(insertChange.pos, insertChange.toAdd);
      }
    });
  }
  host.commitUpdate(recorder);
}

export function updateAppModule(
  mainPath: string,
  environment: { path: string; name: string },
): Rule {
  return (host: Tree) => {
    const modulePath = getAppModulePath(host, mainPath);
    const moduleSource = getTsSourceFile(host, modulePath);
    for (const module of modulesToImport) {
      addImportToNgModule(
        host,
        modulePath,
        module[0],
        module[1],
        module[2]?.replace('ENV_NAME', environment.name) ?? undefined,
      );
      // if (!isImported(moduleSource, module[0], module[1])) {
      //   const change = insertImport(
      //     moduleSource,
      //     modulePath,
      //     module[0],
      //     module[1],
      //     false,
      //   );
      //   const recorder = host.beginUpdate(modulePath);
      //   recorder.insertLeft(
      //     (change as InsertChange).pos,
      //     (change as InsertChange).toAdd
      //   );
      //   host.commitUpdate(recorder);
    }

    // register modules as imports in app module
    for (const module of modulesToImport) {
      // const recorder = host.beginUpdate(modulePath);
      // const metadataChanges = addSymbolToNgModuleMetadata(
      //   moduleSource,
      //   modulePath,
      //   'imports',
      //   (module[0]),// || module[0]).replace('ENV_NAME', environment.name),
      //   null,
      // );
      // if (metadataChanges) {
      //   metadataChanges.forEach((change) => {
      //     const insertChange = change as InsertChange;
      //     recorder.insertRight(insertChange.pos, insertChange.toAdd);
      //   });
      // }
      // host.commitUpdate(recorder);
    }

    // import components in app module
    for (const component of componentsToImport) {
      // const recorder = host.beginUpdate(modulePath);
      // const changes = addSymbolToNgModuleMetadata(
      //   moduleSource,
      //   modulePath,
      //   'declarations',
      //   component[0],
      //   null,
      // );
      // if (changes) {
      //   changes.forEach((change) => {
      //     const insertChange = change as InsertChange;
      //     recorder.insertRight(insertChange.pos, insertChange.toAdd);
      //   });
      // }
      // host.commitUpdate(recorder);
    }
  };
}

export default function ngAdd(options: Schema): Rule {
  return chain([
    externalSchematic('@angular/material', 'ng-add', materialOptions),
    addDependencies(),
    addBaseDependency(),
    async (tree: Tree, context: SchematicContext) => {
      const workspace = await getWorkspace(tree);
      if (!options.project) {
        options.project = workspace.projects.keys().next().value;
      }
      const project = workspace.projects.get(options.project);
      if (!project) {
        throw new SchematicsException(
          `Invalid project name (${options.project})`,
        );
      }
      if (project.extensions.projectType !== 'application') {
        throw new SchematicsException(
          '@zentrumnawi/solid-skeleton requires a project type of "application"',
        );
      }
      const buildTarget = project.targets.get('build');
      if (!buildTarget) {
        throw targetBuildNotFoundError();
      }
      const buildOptions = buildTarget.options || {};
      const mainPath = buildOptions.main as string;

      const environment = getEnvironmentImport(mainPath)(tree);

      const templateSource = apply(url('./files'), [
        applyTemplates({
          ...options,
          environment,
          prefix: project.prefix,
          relativePathToWorkspaceRoot: relativePathToWorkspaceRoot(
            project.root,
          ),
        }),
        move(
          normalize(
            getAppModulePath(tree, buildOptions.main as string) + '/../..',
          ),
        ),
      ]);
      return chain([
        mergeWith(templateSource),
        updateAppModule(mainPath, environment),
      ]);
    },
  ]);
}
