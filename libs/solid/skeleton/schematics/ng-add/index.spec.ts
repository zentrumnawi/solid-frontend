import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { DEPENDENCIES } from '../dependencies';

const collectionPath = require.resolve('../collection.json');

describe('ng-add', () => {
  const testRunner = new SchematicTestRunner('solid-skeleton', collectionPath);

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '6.0.0',
  };

  describe('with project', () => {
    const appOptions: ApplicationOptions = {
      name: 'bar',
      inlineStyle: false,
      inlineTemplate: false,
      routing: false,
      style: Style.Scss,
      skipTests: false,
      skipPackageJson: false,
    };

    let appTree: UnitTestTree;
    beforeEach(async () => {
      appTree = await testRunner.runExternalSchematic(
        '@schematics/angular',
        'workspace',
        workspaceOptions,
      );

      appTree = await testRunner.runExternalSchematic(
        '@schematics/angular',
        'application',
        appOptions,
        appTree,
      );

      appTree = await testRunner.runSchematic(
        'ng-add',
        {
          name: 'test',
        },
        appTree,
      );
    });

    it('files created', async () => {
      expect(appTree.files).toEqual(
        expect.arrayContaining([
          '/projects/bar/src/styles.scss',
          '/projects/bar/src/theme.scss',
          '/projects/bar/src/app/solid-core-config.ts',
          '/projects/bar/src/app/solid-skeleton-config.ts',
          '/projects/bar/src/app/components/landing-banner-content/landing-banner-content.component.ts',
          '/projects/bar/src/app/components/landing-banner-content/landing-banner-content.component.scss',
          '/projects/bar/src/app/components/landing-banner-content/landing-banner-content.component.html',
          '/projects/bar/src/app/components/privacy/privacy.component.ts',
          '/projects/bar/src/app/components/privacy/privacy.component.scss',
          '/projects/bar/src/app/components/privacy/privacy.component.html',
        ]),
      );
    });

    it('dependencies added to package.json', async () => {
      const packageJson = JSON.parse(appTree.readContent('/package.json'));
      const dependencies = packageJson.dependencies;
      DEPENDENCIES.forEach((dep) => {
        expect(dependencies[dep.name]).toEqual(dep.version);
      });
    });

    it('app module correct', async () => {
      const fileContent = appTree.readContent(
        '/projects/bar/src/app/app.module.ts',
      );

      // expect(fileContent).toContain('declarations: [w AppComponent w]');
    });
  });
});
