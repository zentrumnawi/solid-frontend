import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid/core';
import { Schema, Spec } from 'swagger-schema-official';
import { map } from 'rxjs/operators';
import {
  ProfileProperty,
  ProfilePropertyType
} from '../state/profile-definition.model';

const ignoredProperties = ['id', 'name', 'systematics'];

@Injectable()
export class ProfileDefinitionService {
  constructor(
    private http: HttpClient,
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig
  ) {}

  public loadDefinitions() {
    return this.http
      .get<Spec>(`${this._config.newApiUrl}/api/swagger/?format=openapi`)
      .pipe(
        map(swagger => {
          const definitions = swagger.definitions || {};
          // tslint:disable-next-line:no-non-null-assertion
          const topLevelRef = (definitions.TreeNode.properties!.profiles!
            .items as Schema).$ref;
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
    // tslint:disable-next-line:no-non-null-assertion
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
          // tslint:disable-next-line:no-non-null-assertion
          title: schema.title!,
          properties: this.definitionToGroup(swagger, value.$ref)
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
    const required = parent.required?.includes(key) || false;
    // tslint:disable:no-non-null-assertion
    switch (type) {
      case 'string':
        return {
          key: key,
          title: title!,
          required,
          type: ProfilePropertyType.String // TODO: asdf
        };
      case 'array':
        if (Array.isArray(schema.items)) {
          throw new Error('Not implemented');
        }
        return {
          key: key,
          title: schema.items!.title!,
          required,
          type: ProfilePropertyType.List
        };
      case 'integer':
        return {
          key,
          required,
          type: ProfilePropertyType.Integer,
          title: title!
        };
      case 'boolean':
        return {
          key,
          required,
          type: ProfilePropertyType.Boolean,
          title: title!
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
