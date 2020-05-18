import { JsonObject } from '@angular/compiler-cli/ngcc/src/packages/entry_point';

// tslint:disable-next-line:interface-over-type-literal
export type FileInputOutput = {
  input: string;
  output: string;
};

export type AssetGlob = FileInputOutput & {
  glob: string;
  ignore: string[];
};

export interface PackageOptions extends JsonObject {
  /**
   * The file path for the ng-packagr configuration file, relative to the current workspace.
   */
  project: string;
  /**
   * The full path for the TypeScript configuration file, relative to the current workspace.
   */
  tsConfig?: string;
  /**
   * Run build when files change.
   */
  watch?: boolean;
}

export interface SchematicOptions extends JsonObject {
  main: string;
  tsConfig: string;
  outputPath: string;
  watch: boolean;
  sourceMap: boolean;
  assets: Array<AssetGlob | string>;
  packageJson: string;
}

export interface BuildAngularLibraryWithSchematicsBuilderOptions
  extends JsonObject {
  packageOptions: PackageOptions;
  schematicOptions: SchematicOptions;
}
