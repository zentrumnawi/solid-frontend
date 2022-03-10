import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid-core';
import { ParameterType, Schema, Spec } from 'swagger-schema-official';
import { OpenApi, OpenApiReference, OpenApiSchema } from 'openapi-v3';
import { map } from 'rxjs/operators';
import {
  ProfileProperty,
  ProfilePropertyType,
} from '../state/profile-definition.model';

const ignoredProperties = [
  'id',
  'name',
  'trivial_name',
  'short_description',
  'tree_node',
  'photographs',
  'media_objects',
];

@Injectable()
export class ProfileDefinitionService {
  constructor(
    private http: HttpClient,
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig
  ) {}

  //Now i created 2 ways to calling OpenAPI, one is for the 2.0 Version,
  //another is for the 3.0 Version. Just to make sure the other APPs
  //work as well, which haven't had the OpenAPI 3.0 Version yet.

  //OpenAPI 3.0
  public loadDefinitions() {
    return this.http.get<OpenApi>(`${this._config.apiUrl}/api/schema`).pipe(
      map((swagger) => {
        const schemas = swagger.components?.schemas || {};
        const treeNode = schemas.TreeNode as OpenApiSchema;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const profiles = treeNode.properties!.profiles! as OpenApiSchema;
        const topLevelRef = (profiles.items as OpenApiReference).$ref;
        return this.definitionToGroup(swagger, topLevelRef);
      })
    );
  }

  public resolveRef(swagger: OpenApi, $ref: string | undefined) {
    if (!$ref) {
      throw new Error('Invalid swaggerfile');
    }
    const parts = $ref.split('/');
    if (
      parts.length !== 4 ||
      parts[0] !== '#' ||
      parts[1] !== 'components' ||
      parts[2] !== 'schemas'
    ) {
      throw new Error('Invalid swaggerfile');
    }
    const def =
      swagger.components?.schemas && swagger.components?.schemas[parts[3]]
        ? swagger.components?.schemas[parts[3]]
        : null;
    if (!def) {
      throw new Error('Invalid swaggerfile');
    }
    return def;
  }

  public definitionToGroup(swagger: OpenApi, $ref: string | undefined) {
    const groupSchema = this.resolveRef(swagger, $ref) as OpenApiSchema;
    const properties: ProfileProperty[] = [];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const [key, value] of Object.entries(groupSchema.properties!)) {
      if (ignoredProperties.includes(key)) {
        continue;
      }
      if ((value as OpenApiReference).$ref) {
        const schema = this.resolveRef(
          swagger,
          (value as OpenApiReference).$ref
        );
        properties.push({
          key,
          required: groupSchema.required?.includes(key) || false,
          type: ProfilePropertyType.Group,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: (schema as OpenApiSchema).title!,
          properties: this.definitionToGroup(
            swagger,
            (value as OpenApiReference).$ref
          ),
        });
      } else {
        const pp = this.schemaToProperty(
          groupSchema,
          key,
          value as OpenApiSchema
        );
        if (pp) {
          properties.push(pp);
        }
      }
    }
    return properties;
  }

  public schemaToProperty(
    parent: OpenApiSchema,
    key: string,
    schema: OpenApiSchema
  ): ProfileProperty | null {
    const { title, type } = schema;
    const required = parent.required?.includes(key) ?? false;
    switch (type as ParameterType | 'colstring' | 'mdstring') {
      case 'string':
        return {
          key: key,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title!,
          required,
          type: ProfilePropertyType.String,
        };
      case 'array':
        if (Array.isArray(schema.items)) {
          throw new Error('Not implemented');
        }
        return {
          key: key,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title!,
          required,
          type: ProfilePropertyType.List,
        };
      case 'integer':
        return {
          key,
          required,
          type: ProfilePropertyType.Integer,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title!,
        };
      case 'boolean':
        return {
          key,
          required,
          type: ProfilePropertyType.Boolean,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title!,
        };
      case 'mdstring':
        return {
          key,
          required,
          type: ProfilePropertyType.Mdstring,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title!,
        };
      case 'colstring':
        return {
          key,
          required,
          type: ProfilePropertyType.Colstring,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title!,
        };
      case 'object':
      case 'number':
      case 'file':
        throw new Error(`Type not implemented ${type}`);
    }
    return null;
    // tslint:enable:no-non-null-assertion
  }

  //OpenAPI Version 2.0
  public loadDefinitions_swagger() {
    //prevent GeoMat calling OpenAPI 2.0
    //so we don't have duplicated data in profile
    if (this._config.appName === 'GeoMat') {
      return;
    }
    return this.http
      .get<Spec>(`${this._config.apiUrl}/swagger?format=openapi`)
      .pipe(
        map((swagger) => {
          const definitions = swagger.definitions || {};
          const topLevelRef =
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (definitions.TreeNode.properties!.profiles!.items as Schema).$ref;
          return this.definitionToGroup_swagger(swagger, topLevelRef);
        })
      );
  }

  public resolveRef_swagger(swagger: Spec, $ref: string | undefined) {
    if (!$ref) {
      throw new Error('Invalid swaggerfile');
    }
    const parts = $ref.split('/');
    if (parts.length !== 3 || parts[0] !== '#' || parts[1] !== 'definitions') {
      throw new Error('Invalid swaggerfile');
    }
    const def =
      swagger.definitions && swagger.definitions[parts[2]]
        ? swagger.definitions[parts[2]]
        : null;
    if (!def) {
      throw new Error('Invalid swaggerfile');
    }
    return def;
  }

  public definitionToGroup_swagger(swagger: Spec, $ref: string | undefined) {
    const groupSchema = this.resolveRef_swagger(swagger, $ref);
    const properties: ProfileProperty[] = [];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const [key, value] of Object.entries(groupSchema.properties!)) {
      if (ignoredProperties.includes(key)) {
        continue;
      }
      if (value.$ref) {
        const schema = this.resolveRef_swagger(swagger, value.$ref);
        properties.push({
          key,
          required: groupSchema.required?.includes(key) || false,
          type: ProfilePropertyType.Group,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: schema.title!,
          properties: this.definitionToGroup_swagger(swagger, value.$ref),
        });
      } else {
        const pp = this.schemaToProperty_swagger(groupSchema, key, value);
        if (pp) {
          properties.push(pp);
        }
      }
    }
    return properties;
  }

  public schemaToProperty_swagger(
    parent: Schema,
    key: string,
    schema: Schema
  ): ProfileProperty | null {
    const { title, type } = schema;
    const required = parent.required?.includes(key) ?? false;
    switch (type as ParameterType | 'colstring' | 'mdstring') {
      case 'string':
        return {
          key: key,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title!,
          required,
          type: ProfilePropertyType.String,
        };
      case 'array':
        if (Array.isArray(schema.items)) {
          throw new Error('Not implemented');
        }
        return {
          key: key,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title!,
          required,
          type: ProfilePropertyType.List,
        };
      case 'integer':
        return {
          key,
          required,
          type: ProfilePropertyType.Integer,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title!,
        };
      case 'boolean':
        return {
          key,
          required,
          type: ProfilePropertyType.Boolean,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title!,
        };
      case 'mdstring':
        return {
          key,
          required,
          type: ProfilePropertyType.Mdstring,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title!,
        };
      case 'colstring':
        return {
          key,
          required,
          type: ProfilePropertyType.Colstring,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title!,
        };
      case 'object':
      case 'number':
      case 'file':
        throw new Error(`Type not implemented ${type}`);
    }
    return null;
    // tslint:enable:no-non-null-assertion
  }
}
