import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid-core';
import { ParameterType, Schema, Spec } from 'swagger-schema-official';
import { OpenApi } from 'openapi-v3';
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

  // check solid-frontend\node_modules\@types\openapi-v3\index.d.ts for available interfaces
  // compare to solid-frontend\node_modules\@types\swagger-schema-official\index.d.ts

  // You can compare OpenAPI 3.0 and Swagger output by renaming the loadDefinitions() functions
  // (loadDefinitions_swagger will not be called)

  public loadDefinitions() {
    return this.http.get<OpenApi>(`${this._config.apiUrl}/api/schema`).pipe(
      map((swagger) => {
        console.log(swagger);
        const definitions = swagger.components?.schemas || {};
        console.log(definitions);

        // that's exactly the same output as with loadDefinitions_swagger up tp here

        // But then it complains that 'properties' does not exist on OpenApiSchema
        // in openapi-v3/index.d.ts it says that Property Definitions MUST be a Schema Object
        // and not a JSON Schema. That might be an important clue.

        //const topLevelRef =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        // (definitions.properties!.profiles!.items as OpenApiReference)
        // .$ref;
        return; // this.definitionToGroup(swagger, topLevelRef);;
      })
    );
  }

  public loadDefinitions_swagger() {
    return this.http
      .get<Spec>(`${this._config.apiUrl}/swagger?format=openapi`)
      .pipe(
        map((swagger) => {
          console.log(swagger);
          const definitions = swagger.definitions || {};
          console.log(definitions);
          const topLevelRef =
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (definitions.TreeNode.properties!.profiles!.items as Schema).$ref;
          return this.definitionToGroup(swagger, topLevelRef);
        })
      );
  }

  public resolveRef(swagger: Spec, $ref: string | undefined) {
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

  public definitionToGroup(swagger: Spec, $ref: string | undefined) {
    const groupSchema = this.resolveRef(swagger, $ref);
    const properties: ProfileProperty[] = [];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const [key, value] of Object.entries(groupSchema.properties!)) {
      if (ignoredProperties.includes(key)) {
        continue;
      }
      if (value.$ref) {
        const schema = this.resolveRef(swagger, value.$ref);
        properties.push({
          key,
          required: groupSchema.required?.includes(key) || false,
          type: ProfilePropertyType.Group,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: schema.title!,
          properties: this.definitionToGroup(swagger, value.$ref),
        });
      } else {
        const pp = this.schemaToProperty(groupSchema, key, value);
        if (pp) {
          properties.push(pp);
        }
      }
    }
    return properties;
  }

  public schemaToProperty(
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
