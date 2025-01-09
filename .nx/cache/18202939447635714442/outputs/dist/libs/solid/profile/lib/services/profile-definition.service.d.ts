import { HttpClient } from '@angular/common/http';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { Schema, Spec } from 'swagger-schema-official';
import { OpenApi, OpenApiReference, OpenApiSchema } from 'openapi-v3';
import { ProfileProperty } from '../state/profile-definition.model';
import * as i0 from '@angular/core';
export declare class ProfileDefinitionService {
  private http;
  private _config;
  constructor(http: HttpClient, _config: SolidCoreConfig);
  loadDefinitions():
    | import('rxjs').Observable<
        {
          name: string | undefined;
          properties: ProfileProperty[];
        }[]
      >
    | undefined;
  resolveRef(
    swagger: OpenApi,
    $ref: string | undefined
  ): OpenApiReference | OpenApiSchema;
  definitionToGroup(
    swagger: OpenApi,
    $ref: string | undefined
  ): ProfileProperty[];
  schemaToProperty(
    parent: OpenApiSchema,
    key: string,
    schema: OpenApiSchema
  ): ProfileProperty | null;
  loadDefinitions_swagger():
    | import('rxjs').Observable<
        {
          name: string | undefined;
          properties: ProfileProperty[];
        }[]
      >
    | undefined;
  resolveRef_swagger(swagger: Spec, $ref: string | undefined): Schema;
  definitionToGroup_swagger(
    swagger: Spec,
    $ref: string | undefined
  ): ProfileProperty[];
  schemaToProperty_swagger(
    parent: Schema,
    key: string,
    schema: Schema
  ): ProfileProperty | null;
  static ɵfac: i0.ɵɵFactoryDeclaration<ProfileDefinitionService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<ProfileDefinitionService>;
}
