import { TestBed } from '@angular/core/testing';

import { ProfileDefinitionService } from './profile-definition.service';
import {
  HttpClientTestingModule,
  // HttpTestingController,
} from '@angular/common/http/testing';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import { Schema } from 'swagger-schema-official';
import {
  ProfileProperty,
  ProfilePropertyGroup,
  ProfilePropertyType,
} from '../state/profile-definition.model';

describe('ProfileDefinitionService', () => {
  let service: ProfileDefinitionService;
  // let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProfileDefinitionService,
        {
          provide: SOLID_CORE_CONFIG,
          useValue: {
            apiUrl: '',
          },
        },
      ],
    });
    service = TestBed.inject(ProfileDefinitionService);
    // httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('check simple string property', () => {
    const prop = service.schemaToProperty_swagger(
      testSwagger.definitions.Plant as Schema,
      'name',
      testSwagger.definitions.Plant.properties.name as Schema
    );
    if (prop) {
      expect(prop.key).toBe('name');
      expect(prop.required).toBeTruthy();
      expect(prop.title).toBe('Art');
      expect(prop.type).toBe(ProfilePropertyType.String);
    } else {
      fail('Expected to get a property definition');
    }
  });

  it('check string enum property', () => {
    const prop = service.schemaToProperty_swagger(
      testSwagger.definitions.Plant as Schema,
      'interaction',
      testSwagger.definitions.Plant.properties.interaction as Schema
    );
    if (prop) {
      expect(prop.key).toBe('interaction');
      expect(prop.required).toBeFalsy();
      expect(prop.title).toBe('Interaktionen');
      expect(prop.type).toBe(ProfilePropertyType.String);
    } else {
      fail('Expected to get a property definition');
    }
  });

  it('check array enum property', () => {
    const prop = service.schemaToProperty_swagger(
      testSwagger.definitions.Plant as Schema,
      'habitat',
      testSwagger.definitions.Plant.properties.habitat as Schema
    );
    if (prop) {
      expect(prop.key).toBe('habitat');
      expect(prop.required).toBeFalsy();
      expect(prop.title).toBe('Habitat');
      expect(prop.type).toBe(ProfilePropertyType.List);
    } else {
      fail('Expected to get a property definition');
    }
  });

  it('check integer property', () => {
    const prop = service.schemaToProperty_swagger(
      testSwagger.definitions.Plant as Schema,
      'cnt_germ',
      testSwagger.definitions.Plant.properties.cnt_germ as Schema
    );
    if (prop) {
      expect(prop.key).toBe('cnt_germ');
      expect(prop.required).toBeFalsy();
      expect(prop.title).toBe('Anzahl der Keimblätter');
      expect(prop.type).toBe(ProfilePropertyType.Integer);
    } else {
      fail('Expected to get a property definition');
    }
  });

  it('check boolean property', () => {
    const prop = service.schemaToProperty_swagger(
      testSwagger.definitions.Plant as Schema,
      'arr_special',
      testSwagger.definitions.Plant.properties.arr_special as Schema
    );
    if (prop) {
      expect(prop.key).toBe('arr_special');
      expect(prop.required).toBeFalsy();
      expect(prop.title).toBe('Anordung ist buchtig.');
      expect(prop.type).toBe(ProfilePropertyType.Boolean);
    } else {
      fail('Expected to get a property definition');
    }
  });

  it('check group property', () => {
    const defs = service.definitionToGroup_swagger(
      {
        definitions: {
          Leaf: testSwagger.definitions.Leaf,
          Plant: {
            required: ['leaf'],
            properties: { leaf: testSwagger.definitions.Plant.properties.leaf },
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      '#/definitions/Plant'
    );
    if (defs) {
      expect(defs.length).toBe(1);
      const prop = defs[0] as ProfilePropertyGroup & ProfileProperty;
      expect(prop.key).toBe('leaf');
      expect(prop.required).toBeTruthy();
      expect(prop.title).toBe('Leaf');
      expect(prop.type).toBe(ProfilePropertyType.Group);
      expect(prop.properties?.length).toBe(1);
    } else {
      fail('Expected to get a property group');
    }
  });

  // it('check definitions', done => {
  //   service.loadDefinitions().subscribe(def => {
  //     expect(def.length).toBe(4);
  //     done();
  //   });
  //
  //   const req = httpMock.expectOne(`/api/swagger/?format=openapi`);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(testSwagger);
  // });
});

const testSwagger = {
  definitions: {
    Leaf: {
      title: 'Leaf',
      type: 'object',
      properties: {
        id: { title: 'ID', type: 'integer', readOnly: true },
        cnt_germ: {
          title: 'Anzahl der Keimbl\u00e4tter',
          type: 'integer',
          enum: ['1', '2'],
          'x-nullable': true,
        },
      },
    },
    Plant: {
      required: [
        'leaf',
        'sprout',
        'fruit',
        'blossom',
        'name',
        'sub_name',
        'bloom',
        'nodule',
      ],
      type: 'object',
      properties: {
        id: { title: 'ID', type: 'integer', readOnly: true },
        leaf: { $ref: '#/definitions/Leaf' },
        // 'sprout': { '$ref': '#/definitions/Sprout' },
        // 'fruit': { '$ref': '#/definitions/Fruit' },
        // 'blossom': { '$ref': '#/definitions/Blossom' },
        name: { title: 'Art', type: 'string', maxLength: 100, minLength: 1 },
        sub_name: {
          title: 'Subname',
          type: 'string',
          maxLength: 100,
          minLength: 1,
        },
        habitat: {
          type: 'array',
          title: 'Habitat',
          items: {
            type: 'string',
            enum: [
              'Schlammfluren',
              'R\u00f6hrichte',
              'S\u00e4ume',
              'Staudenfluren',
              'Gr\u00fcnland und Zwergstrauchheiden',
              'Ruderalvegetation',
              '\u00c4cker',
              'Weinberge',
              'Intensivgr\u00fcnland',
              'Parks',
              'G\u00e4rten',
              'Trittpflanzengesellschaften',
              'Felsbiotope',
              'Auenw\u00e4lder',
              'Geb\u00fcsche',
              'Ger\u00f6ll',
              'Extensivgr\u00fcnland oder nat\u00fcrlicher Rasen',
              'W\u00e4lder',
              'Ufer',
            ],
          },
        },
        interaction: {
          title: 'Interaktionen',
          type: 'string',
          enum: [
            'parasitisch',
            'nicht parasitisch',
            'obligate Mykorrhiza',
            'fakultative Mykorrhiza',
          ],
        },
        cnt_germ: {
          title: 'Anzahl der Keimbl\u00e4tter',
          type: 'integer',
          enum: ['1', '2'],
          'x-nullable': true,
        },
        arr_special: { title: 'Anordung ist buchtig.', type: 'boolean' },
      },
    },
    TreeNode: {
      required: ['name', 'profiles'],
      type: 'object',
      properties: {
        profiles: {
          type: 'array',
          items: {
            $ref: '#/definitions/Plant',
          },
        },
      },
    },
  },
};
