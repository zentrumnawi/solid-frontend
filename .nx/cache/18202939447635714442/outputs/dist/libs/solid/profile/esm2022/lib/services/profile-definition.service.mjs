import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import { map } from 'rxjs/operators';
import { ProfilePropertyType } from '../state/profile-definition.model';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common/http';
const ignoredProperties = [
  'id',
  'name',
  'sub_name',
  'short_description',
  'tree_node',
  'photographs',
  'media_objects',
];
export class ProfileDefinitionService {
  http;
  _config;
  constructor(http, _config) {
    this.http = http;
    this._config = _config;
  }
  //OpenAPI 3.0
  loadDefinitions() {
    //prevent Dive calling OpenAPI 3.0
    //so we don't have duplicated data in profile
    if (this._config.appName === 'Div-e') {
      return;
    }
    return this.http.get(`${this._config.apiUrl}/api/schema`).pipe(
      map((openapi) => {
        const schemas = openapi.components?.schemas || {};
        const treeNode = schemas.TreeNode;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const properties = treeNode.properties;
        const listOfGroups = [];
        for (const p in properties) {
          if (p.search('related') !== -1) {
            const related = properties[p];
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const ref = related.items.$ref;
            listOfGroups.push({
              name: ref?.split('/')[3].toLowerCase(),
              properties: this.definitionToGroup(openapi, ref),
            });
          }
        }
        return listOfGroups;
      })
    );
  }
  resolveRef(swagger, $ref) {
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
  definitionToGroup(swagger, $ref) {
    const groupSchema = this.resolveRef(swagger, $ref);
    const properties = [];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const [key, value] of Object.entries(groupSchema.properties)) {
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
          title: schema.title,
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
  schemaToProperty(parent, key, schema) {
    // TODO: Get enum field type from $ref in oneOf[0]
    if (schema.oneOf || schema.allOf) schema.type = 'string'; // workaround for enums
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
    switch (type) {
      case 'string':
        return {
          key: key,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title,
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
          title: title,
          required,
          type: format ? formatType : ProfilePropertyType.List,
        };
      case 'integer':
        return {
          key,
          required,
          type: format ? formatType : ProfilePropertyType.Integer,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title,
        };
      case 'boolean':
        return {
          key,
          required,
          type: ProfilePropertyType.Boolean,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title,
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
  loadDefinitions_swagger() {
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
    return this.http.get(`${this._config.apiUrl}/swagger?format=openapi`).pipe(
      map((swagger) => {
        const definitions = swagger.definitions || {};
        const properties = definitions.TreeNode.properties;
        const listOfGroups = [];
        for (const p in properties) {
          if (p.search('related') !== -1) {
            const ref = properties[p].items.$ref;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            listOfGroups.push({
              name: ref?.split('/')[2].toLowerCase(),
              properties: this.definitionToGroup_swagger(swagger, ref),
            });
          }
        }
        return listOfGroups;
      })
    );
  }
  resolveRef_swagger(swagger, $ref) {
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
  definitionToGroup_swagger(swagger, $ref) {
    const groupSchema = this.resolveRef_swagger(swagger, $ref);
    const properties = [];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const [key, value] of Object.entries(groupSchema.properties)) {
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
          title: schema.title,
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
  schemaToProperty_swagger(parent, key, schema) {
    const { title, type } = schema;
    const required = parent.required?.includes(key) ?? false;
    switch (type) {
      case 'string':
        return {
          key: key,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title,
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
          title: title,
          required,
          type: ProfilePropertyType.List,
        };
      case 'integer':
        return {
          key,
          required,
          type: ProfilePropertyType.Integer,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title,
        };
      case 'boolean':
        return {
          key,
          required,
          type: ProfilePropertyType.Boolean,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title,
        };
      case 'mdstring':
        return {
          key,
          required,
          type: ProfilePropertyType.Mdstring,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title,
        };
      case 'colstring':
        return {
          key,
          required,
          type: ProfilePropertyType.Colstring,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          title: title,
        };
      case 'object':
      case 'number':
      case 'file':
        throw new Error(`Type not implemented ${type}`);
      default:
        return null;
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: ProfileDefinitionService,
    deps: [{ token: i1.HttpClient }, { token: SOLID_CORE_CONFIG }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: ProfileDefinitionService,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: ProfileDefinitionService,
  decorators: [
    {
      type: Injectable,
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1.HttpClient },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
    ];
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1kZWZpbml0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3Byb2ZpbGUvc3JjL2xpYi9zZXJ2aWNlcy9wcm9maWxlLWRlZmluaXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFtQixNQUFNLHlCQUF5QixDQUFDO0FBRzdFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBRUwsbUJBQW1CLEdBQ3BCLE1BQU0sbUNBQW1DLENBQUM7OztBQUUzQyxNQUFNLGlCQUFpQixHQUFHO0lBQ3hCLElBQUk7SUFDSixNQUFNO0lBQ04sVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixXQUFXO0lBQ1gsYUFBYTtJQUNiLGVBQWU7Q0FDaEIsQ0FBQztBQUdGLE1BQU0sT0FBTyx3QkFBd0I7SUFFekI7SUFDMkI7SUFGckMsWUFDVSxJQUFnQixFQUNXLE9BQXdCO1FBRG5ELFNBQUksR0FBSixJQUFJLENBQVk7UUFDVyxZQUFPLEdBQVAsT0FBTyxDQUFpQjtJQUMxRCxDQUFDO0lBRUosYUFBYTtJQUNOLGVBQWU7UUFDcEIsa0NBQWtDO1FBQ2xDLDZDQUE2QztRQUM3QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRTtZQUNwQyxPQUFPO1NBQ1I7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FDckUsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDZCxN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QUksS0FBSyxDQUFDLHdCQUF3QixJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ2xEO2dCQUNFLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO3VHQTFUVSx3QkFBd0IsNENBR3pCLGlCQUFpQjsyR0FIaEIsd0JBQXdCOzsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVOzswQkFJTixNQUFNOzJCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBTT0xJRF9DT1JFX0NPTkZJRywgU29saWRDb3JlQ29uZmlnIH0gZnJvbSAnQHplbnRydW1uYXdpL3NvbGlkLWNvcmUnO1xyXG5pbXBvcnQgeyBQYXJhbWV0ZXJUeXBlLCBTY2hlbWEsIFNwZWMgfSBmcm9tICdzd2FnZ2VyLXNjaGVtYS1vZmZpY2lhbCc7XHJcbmltcG9ydCB7IE9wZW5BcGksIE9wZW5BcGlSZWZlcmVuY2UsIE9wZW5BcGlTY2hlbWEgfSBmcm9tICdvcGVuYXBpLXYzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge1xyXG4gIFByb2ZpbGVQcm9wZXJ0eSxcclxuICBQcm9maWxlUHJvcGVydHlUeXBlLFxyXG59IGZyb20gJy4uL3N0YXRlL3Byb2ZpbGUtZGVmaW5pdGlvbi5tb2RlbCc7XHJcblxyXG5jb25zdCBpZ25vcmVkUHJvcGVydGllcyA9IFtcclxuICAnaWQnLFxyXG4gICduYW1lJyxcclxuICAnc3ViX25hbWUnLFxyXG4gICdzaG9ydF9kZXNjcmlwdGlvbicsXHJcbiAgJ3RyZWVfbm9kZScsXHJcbiAgJ3Bob3RvZ3JhcGhzJyxcclxuICAnbWVkaWFfb2JqZWN0cycsXHJcbl07XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlRGVmaW5pdGlvblNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgQEluamVjdChTT0xJRF9DT1JFX0NPTkZJRykgcHJpdmF0ZSBfY29uZmlnOiBTb2xpZENvcmVDb25maWdcclxuICApIHt9XHJcblxyXG4gIC8vT3BlbkFQSSAzLjBcclxuICBwdWJsaWMgbG9hZERlZmluaXRpb25zKCkge1xyXG4gICAgLy9wcmV2ZW50IERpdmUgY2FsbGluZyBPcGVuQVBJIDMuMFxyXG4gICAgLy9zbyB3ZSBkb24ndCBoYXZlIGR1cGxpY2F0ZWQgZGF0YSBpbiBwcm9maWxlXHJcbiAgICBpZiAodGhpcy5fY29uZmlnLmFwcE5hbWUgPT09ICdEaXYtZScpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8T3BlbkFwaT4oYCR7dGhpcy5fY29uZmlnLmFwaVVybH0vYXBpL3NjaGVtYWApLnBpcGUoXHJcbiAgICAgIG1hcCgob3BlbmFwaSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjaGVtYXMgPSBvcGVuYXBpLmNvbXBvbmVudHM/LnNjaGVtYXMgfHwge307XHJcbiAgICAgICAgY29uc3QgdHJlZU5vZGUgPSBzY2hlbWFzLlRyZWVOb2RlIGFzIE9wZW5BcGlTY2hlbWE7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cclxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gdHJlZU5vZGUucHJvcGVydGllcyE7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpc3RPZkdyb3VwcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHAgaW4gcHJvcGVydGllcykge1xyXG4gICAgICAgICAgaWYgKHAuc2VhcmNoKCdyZWxhdGVkJykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbGF0ZWQgPSBwcm9wZXJ0aWVzW3BdIGFzIE9wZW5BcGlTY2hlbWE7XHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IHJlZiA9IChyZWxhdGVkIS5pdGVtcyEgYXMgT3BlbkFwaVJlZmVyZW5jZSkuJHJlZjtcclxuICAgICAgICAgICAgbGlzdE9mR3JvdXBzLnB1c2goe1xyXG4gICAgICAgICAgICAgIG5hbWU6IHJlZj8uc3BsaXQoJy8nKVszXS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgICAgIHByb3BlcnRpZXM6IHRoaXMuZGVmaW5pdGlvblRvR3JvdXAob3BlbmFwaSwgcmVmKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsaXN0T2ZHcm91cHM7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc29sdmVSZWYoc3dhZ2dlcjogT3BlbkFwaSwgJHJlZjogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAoISRyZWYpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN3YWdnZXJmaWxlJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXJ0cyA9ICRyZWYuc3BsaXQoJy8nKTtcclxuICAgIGlmIChcclxuICAgICAgcGFydHMubGVuZ3RoICE9PSA0IHx8XHJcbiAgICAgIHBhcnRzWzBdICE9PSAnIycgfHxcclxuICAgICAgcGFydHNbMV0gIT09ICdjb21wb25lbnRzJyB8fFxyXG4gICAgICBwYXJ0c1syXSAhPT0gJ3NjaGVtYXMnXHJcbiAgICApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN3YWdnZXJmaWxlJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBkZWYgPVxyXG4gICAgICBzd2FnZ2VyLmNvbXBvbmVudHM/LnNjaGVtYXMgJiYgc3dhZ2dlci5jb21wb25lbnRzPy5zY2hlbWFzW3BhcnRzWzNdXVxyXG4gICAgICAgID8gc3dhZ2dlci5jb21wb25lbnRzPy5zY2hlbWFzW3BhcnRzWzNdXVxyXG4gICAgICAgIDogbnVsbDtcclxuICAgIGlmICghZGVmKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzd2FnZ2VyZmlsZScpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlZjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZWZpbml0aW9uVG9Hcm91cChzd2FnZ2VyOiBPcGVuQXBpLCAkcmVmOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcclxuICAgIGNvbnN0IGdyb3VwU2NoZW1hID0gdGhpcy5yZXNvbHZlUmVmKHN3YWdnZXIsICRyZWYpIGFzIE9wZW5BcGlTY2hlbWE7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzOiBQcm9maWxlUHJvcGVydHlbXSA9IFtdO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGdyb3VwU2NoZW1hLnByb3BlcnRpZXMhKSkge1xyXG4gICAgICBpZiAoaWdub3JlZFByb3BlcnRpZXMuaW5jbHVkZXMoa2V5KSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICgodmFsdWUgYXMgT3BlbkFwaVJlZmVyZW5jZSkuJHJlZikge1xyXG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMucmVzb2x2ZVJlZihcclxuICAgICAgICAgIHN3YWdnZXIsXHJcbiAgICAgICAgICAodmFsdWUgYXMgT3BlbkFwaVJlZmVyZW5jZSkuJHJlZlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcHJvcGVydGllcy5wdXNoKHtcclxuICAgICAgICAgIGtleSxcclxuICAgICAgICAgIHJlcXVpcmVkOiBncm91cFNjaGVtYS5yZXF1aXJlZD8uaW5jbHVkZXMoa2V5KSB8fCBmYWxzZSxcclxuICAgICAgICAgIHR5cGU6IFByb2ZpbGVQcm9wZXJ0eVR5cGUuR3JvdXAsXHJcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxyXG4gICAgICAgICAgdGl0bGU6IChzY2hlbWEgYXMgT3BlbkFwaVNjaGVtYSkudGl0bGUhLFxyXG4gICAgICAgICAgcHJvcGVydGllczogdGhpcy5kZWZpbml0aW9uVG9Hcm91cChcclxuICAgICAgICAgICAgc3dhZ2dlcixcclxuICAgICAgICAgICAgKHZhbHVlIGFzIE9wZW5BcGlSZWZlcmVuY2UpLiRyZWZcclxuICAgICAgICAgICksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgcHAgPSB0aGlzLnNjaGVtYVRvUHJvcGVydHkoXHJcbiAgICAgICAgICBncm91cFNjaGVtYSxcclxuICAgICAgICAgIGtleSxcclxuICAgICAgICAgIHZhbHVlIGFzIE9wZW5BcGlTY2hlbWFcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChwcCkge1xyXG4gICAgICAgICAgcHJvcGVydGllcy5wdXNoKHBwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNjaGVtYVRvUHJvcGVydHkoXHJcbiAgICBwYXJlbnQ6IE9wZW5BcGlTY2hlbWEsXHJcbiAgICBrZXk6IHN0cmluZyxcclxuICAgIHNjaGVtYTogT3BlbkFwaVNjaGVtYVxyXG4gICk6IFByb2ZpbGVQcm9wZXJ0eSB8IG51bGwge1xyXG4gICAgLy8gVE9ETzogR2V0IGVudW0gZmllbGQgdHlwZSBmcm9tICRyZWYgaW4gb25lT2ZbMF1cclxuICAgIGlmIChzY2hlbWEub25lT2YgfHwgc2NoZW1hLmFsbE9mKSAoc2NoZW1hLnR5cGUgYXMgUGFyYW1ldGVyVHlwZSkgPSAnc3RyaW5nJzsgLy8gd29ya2Fyb3VuZCBmb3IgZW51bXNcclxuXHJcbiAgICAvLyBmb3JtYXQgaXMgdXNlZCB0byBkZWNsYXJlIGN1c3RvbSB0eXBlc1xyXG4gICAgY29uc3QgeyB0aXRsZSwgdHlwZSwgZm9ybWF0IH0gPSBzY2hlbWE7XHJcbiAgICBjb25zdCByZXF1aXJlZCA9IHBhcmVudC5yZXF1aXJlZD8uaW5jbHVkZXMoa2V5KSA/PyBmYWxzZTtcclxuXHJcbiAgICBsZXQgZm9ybWF0VHlwZSA9IFByb2ZpbGVQcm9wZXJ0eVR5cGUuU3RyaW5nO1xyXG4gICAgc3dpdGNoIChmb3JtYXQ/LnRvU3RyaW5nKCkpIHtcclxuICAgICAgY2FzZSAnbWRzdHJpbmcnOlxyXG4gICAgICAgIGZvcm1hdFR5cGUgPSBQcm9maWxlUHJvcGVydHlUeXBlLk1kc3RyaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjb2xzdHJpbmcnOlxyXG4gICAgICAgIGZvcm1hdFR5cGUgPSBQcm9maWxlUHJvcGVydHlUeXBlLkNvbHN0cmluZztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKHR5cGUgYXMgUGFyYW1ldGVyVHlwZSkge1xyXG4gICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXHJcbiAgICAgICAgICB0aXRsZTogdGl0bGUhLFxyXG4gICAgICAgICAgcmVxdWlyZWQsXHJcbiAgICAgICAgICB0eXBlOiBmb3JtYXQgPyBmb3JtYXRUeXBlIDogUHJvZmlsZVByb3BlcnR5VHlwZS5TdHJpbmcsXHJcbiAgICAgICAgfTtcclxuICAgICAgY2FzZSAnYXJyYXknOlxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcykpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXHJcbiAgICAgICAgICB0aXRsZTogdGl0bGUhLFxyXG4gICAgICAgICAgcmVxdWlyZWQsXHJcbiAgICAgICAgICB0eXBlOiBmb3JtYXQgPyBmb3JtYXRUeXBlIDogUHJvZmlsZVByb3BlcnR5VHlwZS5MaXN0LFxyXG4gICAgICAgIH07XHJcbiAgICAgIGNhc2UgJ2ludGVnZXInOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBrZXksXHJcbiAgICAgICAgICByZXF1aXJlZCxcclxuICAgICAgICAgIHR5cGU6IGZvcm1hdCA/IGZvcm1hdFR5cGUgOiBQcm9maWxlUHJvcGVydHlUeXBlLkludGVnZXIsXHJcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxyXG4gICAgICAgICAgdGl0bGU6IHRpdGxlISxcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAga2V5LFxyXG4gICAgICAgICAgcmVxdWlyZWQsXHJcbiAgICAgICAgICB0eXBlOiBQcm9maWxlUHJvcGVydHlUeXBlLkJvb2xlYW4sXHJcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxyXG4gICAgICAgICAgdGl0bGU6IHRpdGxlISxcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICBjYXNlICdmaWxlJzpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgbm90IGltcGxlbWVudGVkICR7dHlwZX1gKTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vT3BlbkFQSSBWZXJzaW9uIDIuMFxyXG4gIHB1YmxpYyBsb2FkRGVmaW5pdGlvbnNfc3dhZ2dlcigpIHtcclxuICAgIC8vcHJldmVudCBHZW9NYXQsIFdBQkUsIFBMQU5UWSAmIEFJUyBmcm9tIGNhbGxpbmcgT3BlbkFQSSAyLjBcclxuICAgIC8vc28gd2UgZG9uJ3QgaGF2ZSBkdXBsaWNhdGVkIGRhdGEgaW4gcHJvZmlsZVxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLl9jb25maWcuYXBwTmFtZSA9PT0gJ0dlb01hdCcgfHxcclxuICAgICAgdGhpcy5fY29uZmlnLmFwcE5hbWUgPT09ICdXQUJFJyB8fFxyXG4gICAgICB0aGlzLl9jb25maWcuYXBwTmFtZSA9PT0gJ0FJUycgfHxcclxuICAgICAgdGhpcy5fY29uZmlnLmFwcE5hbWUgPT09ICdQTEFOVFkyTGVhcm4nXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0PFNwZWM+KGAke3RoaXMuX2NvbmZpZy5hcGlVcmx9L3N3YWdnZXI/Zm9ybWF0PW9wZW5hcGlgKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHN3YWdnZXIpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGRlZmluaXRpb25zID0gc3dhZ2dlci5kZWZpbml0aW9ucyB8fCB7fTtcclxuICAgICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBkZWZpbml0aW9ucy5UcmVlTm9kZS5wcm9wZXJ0aWVzO1xyXG4gICAgICAgICAgY29uc3QgbGlzdE9mR3JvdXBzID0gW107XHJcblxyXG4gICAgICAgICAgZm9yIChjb25zdCBwIGluIHByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgaWYgKHAuc2VhcmNoKCdyZWxhdGVkJykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgcmVmID0gKHByb3BlcnRpZXNbcF0uaXRlbXMgYXMgU2NoZW1hKS4kcmVmO1xyXG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXHJcbiAgICAgICAgICAgICAgbGlzdE9mR3JvdXBzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogcmVmPy5zcGxpdCgnLycpWzJdLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB0aGlzLmRlZmluaXRpb25Ub0dyb3VwX3N3YWdnZXIoc3dhZ2dlciwgcmVmKSxcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiBsaXN0T2ZHcm91cHM7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNvbHZlUmVmX3N3YWdnZXIoc3dhZ2dlcjogU3BlYywgJHJlZjogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAoISRyZWYpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN3YWdnZXJmaWxlJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXJ0cyA9ICRyZWYuc3BsaXQoJy8nKTtcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggIT09IDMgfHwgcGFydHNbMF0gIT09ICcjJyB8fCBwYXJ0c1sxXSAhPT0gJ2RlZmluaXRpb25zJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3dhZ2dlcmZpbGUnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGRlZiA9XHJcbiAgICAgIHN3YWdnZXIuZGVmaW5pdGlvbnMgJiYgc3dhZ2dlci5kZWZpbml0aW9uc1twYXJ0c1syXV1cclxuICAgICAgICA/IHN3YWdnZXIuZGVmaW5pdGlvbnNbcGFydHNbMl1dXHJcbiAgICAgICAgOiBudWxsO1xyXG4gICAgaWYgKCFkZWYpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN3YWdnZXJmaWxlJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVmO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlZmluaXRpb25Ub0dyb3VwX3N3YWdnZXIoc3dhZ2dlcjogU3BlYywgJHJlZjogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBjb25zdCBncm91cFNjaGVtYSA9IHRoaXMucmVzb2x2ZVJlZl9zd2FnZ2VyKHN3YWdnZXIsICRyZWYpO1xyXG4gICAgY29uc3QgcHJvcGVydGllczogUHJvZmlsZVByb3BlcnR5W10gPSBbXTtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXHJcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhncm91cFNjaGVtYS5wcm9wZXJ0aWVzISkpIHtcclxuICAgICAgaWYgKGlnbm9yZWRQcm9wZXJ0aWVzLmluY2x1ZGVzKGtleSkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmFsdWUuJHJlZikge1xyXG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMucmVzb2x2ZVJlZl9zd2FnZ2VyKHN3YWdnZXIsIHZhbHVlLiRyZWYpO1xyXG4gICAgICAgIHByb3BlcnRpZXMucHVzaCh7XHJcbiAgICAgICAgICBrZXksXHJcbiAgICAgICAgICByZXF1aXJlZDogZ3JvdXBTY2hlbWEucmVxdWlyZWQ/LmluY2x1ZGVzKGtleSkgfHwgZmFsc2UsXHJcbiAgICAgICAgICB0eXBlOiBQcm9maWxlUHJvcGVydHlUeXBlLkdyb3VwLFxyXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cclxuICAgICAgICAgIHRpdGxlOiBzY2hlbWEudGl0bGUhLFxyXG4gICAgICAgICAgcHJvcGVydGllczogdGhpcy5kZWZpbml0aW9uVG9Hcm91cF9zd2FnZ2VyKHN3YWdnZXIsIHZhbHVlLiRyZWYpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHBwID0gdGhpcy5zY2hlbWFUb1Byb3BlcnR5X3N3YWdnZXIoZ3JvdXBTY2hlbWEsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgIGlmIChwcCkge1xyXG4gICAgICAgICAgcHJvcGVydGllcy5wdXNoKHBwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNjaGVtYVRvUHJvcGVydHlfc3dhZ2dlcihcclxuICAgIHBhcmVudDogU2NoZW1hLFxyXG4gICAga2V5OiBzdHJpbmcsXHJcbiAgICBzY2hlbWE6IFNjaGVtYVxyXG4gICk6IFByb2ZpbGVQcm9wZXJ0eSB8IG51bGwge1xyXG4gICAgY29uc3QgeyB0aXRsZSwgdHlwZSB9ID0gc2NoZW1hO1xyXG4gICAgY29uc3QgcmVxdWlyZWQgPSBwYXJlbnQucmVxdWlyZWQ/LmluY2x1ZGVzKGtleSkgPz8gZmFsc2U7XHJcbiAgICBzd2l0Y2ggKHR5cGUgYXMgUGFyYW1ldGVyVHlwZSB8ICdjb2xzdHJpbmcnIHwgJ21kc3RyaW5nJykge1xyXG4gICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXHJcbiAgICAgICAgICB0aXRsZTogdGl0bGUhLFxyXG4gICAgICAgICAgcmVxdWlyZWQsXHJcbiAgICAgICAgICB0eXBlOiBQcm9maWxlUHJvcGVydHlUeXBlLlN0cmluZyxcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlICdhcnJheSc6XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKSkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cclxuICAgICAgICAgIHRpdGxlOiB0aXRsZSEsXHJcbiAgICAgICAgICByZXF1aXJlZCxcclxuICAgICAgICAgIHR5cGU6IFByb2ZpbGVQcm9wZXJ0eVR5cGUuTGlzdCxcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAga2V5LFxyXG4gICAgICAgICAgcmVxdWlyZWQsXHJcbiAgICAgICAgICB0eXBlOiBQcm9maWxlUHJvcGVydHlUeXBlLkludGVnZXIsXHJcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxyXG4gICAgICAgICAgdGl0bGU6IHRpdGxlISxcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAga2V5LFxyXG4gICAgICAgICAgcmVxdWlyZWQsXHJcbiAgICAgICAgICB0eXBlOiBQcm9maWxlUHJvcGVydHlUeXBlLkJvb2xlYW4sXHJcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxyXG4gICAgICAgICAgdGl0bGU6IHRpdGxlISxcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlICdtZHN0cmluZyc6XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGtleSxcclxuICAgICAgICAgIHJlcXVpcmVkLFxyXG4gICAgICAgICAgdHlwZTogUHJvZmlsZVByb3BlcnR5VHlwZS5NZHN0cmluZyxcclxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXHJcbiAgICAgICAgICB0aXRsZTogdGl0bGUhLFxyXG4gICAgICAgIH07XHJcbiAgICAgIGNhc2UgJ2NvbHN0cmluZyc6XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGtleSxcclxuICAgICAgICAgIHJlcXVpcmVkLFxyXG4gICAgICAgICAgdHlwZTogUHJvZmlsZVByb3BlcnR5VHlwZS5Db2xzdHJpbmcsXHJcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxyXG4gICAgICAgICAgdGl0bGU6IHRpdGxlISxcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICBjYXNlICdmaWxlJzpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFR5cGUgbm90IGltcGxlbWVudGVkICR7dHlwZX1gKTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
