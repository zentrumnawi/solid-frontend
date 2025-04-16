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
  'sub_name',
  'short_description',
  'tree_node',
  'photographs',
  'media_objects',
];

@Injectable()
export class ProfileDefinitionService {
  constructor(
    private http: HttpClient,
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig,
  ) {}

  //OpenAPI 3.0
  public loadDefinitions() {
    //prevent Dive calling OpenAPI 3.0
    //so we don't have duplicated data in profile
    if (this._config.appName === 'Div-e') {
      return;
    }
    return this.http.get<OpenApi>(`${this._config.apiUrl}/api/schema`).pipe(
      map((openapi) => {
        const schemas = openapi.components?.schemas || {};
        const treeNode = schemas.TreeNode as OpenApiSchema;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const properties = treeNode.properties!;

        const listOfGroups = [];

        for (const p in properties) {
          if (p.search('related') !== -1) {
            const related = properties[p] as OpenApiSchema;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const ref = (related!.items! as OpenApiReference).$ref;
            listOfGroups.push({
              name: ref?.split('/')[3].toLowerCase(),
              properties: this.definitionToGroup(openapi, ref),
            });
          }
        }
        return listOfGroups;
      }),
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
          (value as OpenApiReference).$ref,
        );
        properties.push({
          key,
          required: groupSchema.required?.includes(key) || false,
          type: ProfilePropertyType.Group,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: (schema as OpenApiSchema).title!,
          properties: this.definitionToGroup(
            swagger,
            (value as OpenApiReference).$ref,
          ),
        });
      } else {
        const pp = this.schemaToProperty(
          groupSchema,
          key,
          value as OpenApiSchema,
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
    schema: OpenApiSchema,
  ): ProfileProperty | null {
    // TODO: Get enum field type from $ref in oneOf[0]
    if (schema.oneOf || schema.allOf) (schema.type as ParameterType) = 'string'; // workaround for enums

    // format is used to declare custom types
    const { title, type, format } = schema;
    const required = parent.required?.includes(key) ?? false;

    let formatType = ProfilePropertyType.String;
    switch (format?.toString()) {
      case 'mdstring':
        formatType = ProfilePropertyType.Mdstring;
        break;
      case 'colstring':
        formatType = ProfilePropertyType.Colstring;
        break;
    }

    switch (type as ParameterType) {
      case 'string':
        return {
          key: key,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title!,
          required,
          type: format ? formatType : ProfilePropertyType.String,
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
          type: format ? formatType : ProfilePropertyType.List,
        };
      case 'integer':
        return {
          key,
          required,
          type: format ? formatType : ProfilePropertyType.Integer,
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
      case 'object':
      case 'number':
      case 'file':
        throw new Error(`Type not implemented ${type}`);
      default:
        return null;
    }
  }

  //OpenAPI Version 2.0
  public loadDefinitions_swagger() {
    //prevent GeoMat, WABE, PLANTY & AIS from calling OpenAPI 2.0
    //so we don't have duplicated data in profile
    if (
      this._config.appName === 'GeoMat' ||
      this._config.appName === 'WABE' ||
      this._config.appName === 'AIS' ||
      this._config.appName === 'PLANTY2Learn'
    ) {
      return;
    }
    return this.http
      .get<Spec>(`${this._config.apiUrl}/swagger?format=openapi`)
      .pipe(
        map((swagger) => {
          const definitions = swagger.definitions || {};
          const properties = definitions.TreeNode.properties;
          const listOfGroups = [];

          for (const p in properties) {
            if (p.search('related') !== -1) {
              const ref = (properties[p].items as Schema).$ref;
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              listOfGroups.push({
                name: ref?.split('/')[2].toLowerCase(),
                properties: this.definitionToGroup_swagger(swagger, ref),
              });
            }
          }

          return listOfGroups;
        }),
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
    schema: Schema,
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
      default:
        return null;
    }
  }
}
