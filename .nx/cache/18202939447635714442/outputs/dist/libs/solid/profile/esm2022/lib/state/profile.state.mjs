var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var ProfileState_1;
import { Action, Selector, State } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SOLID_CORE_CONFIG, MediaModel } from '@zentrumnawi/solid-core';
import {
  LoadDefinition,
  LoadDefinitionSwagger,
  LoadProfiles,
} from './profile.actions';
import { map, tap } from 'rxjs/operators';
import { ProfileDefinitionService } from '../services/profile-definition.service';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common/http';
import * as i2 from '../services/profile-definition.service';
export let ProfileState = class ProfileState {
  static {
    ProfileState_1 = this;
  }
  http;
  _config;
  _defService;
  constructor(http, _config, _defService) {
    this.http = http;
    this._config = _config;
    this._defService = _defService;
  }
  static selectProfileAndNode(state) {
    // This redundant variable is required
    // https://github.com/ng-packagr/ng-packagr/issues/696
    const fn = function (profileId, profileType) {
      if (!profileId) {
        return null;
      }
      for (const node of state.nodes) {
        const childSearch = profileType
          ? ProfileState_1.findProfileDeep(node, profileId, profileType)
          : ProfileState_1.findProfileDeep(node, profileId); // temporary for PLANTY
        if (childSearch !== null) {
          return childSearch;
        }
      }
      return null;
    };
    return fn;
  }
  static selectProfile(state) {
    return state.profiles;
  }
  static selectDefinition(state) {
    return state.definition;
  }
  static selectDefinition_swagger(state) {
    return state.definition_swagger;
  }
  static selectTree(state) {
    return [...state.nodes];
  }
  static selectFlat(state) {
    return [...state.profiles];
  }
  static findProfileDeep(node, profileId, profileType) {
    const profile = profileType
      ? node.profiles.find(
          (p) => p.id === profileId && p.def_type === profileType
        )
      : node.profiles.find((p) => p.id === profileId); // temporary for PLANTY
    if (profile) {
      return {
        profile,
        node,
      };
    }
    for (const leafNode of node.children) {
      const childSearch = profileType
        ? ProfileState_1.findProfileDeep(leafNode, profileId, profileType)
        : ProfileState_1.findProfileDeep(leafNode, profileId); // temporary for PLANTY
      if (childSearch !== null) {
        return childSearch;
      }
    }
    return null;
  }
  // Preliminary Workaround for GeoMat to merge unknown rock compounds with minerals from geomat db
  static composeMineralCompounds(compounds, geoMatContent) {
    const compundArray = compounds
      .split(', ')
      .splice(-geoMatContent.length)
      .map((value) => ({
        id: null,
        name: value,
        sub_name: '',
      }));
    const cmp = [...compundArray, ...geoMatContent];
    return cmp;
  }
  set(ctx) {
    if (ctx.getState().profiles.length !== 0) {
      return;
    }
    return this.http.get(`${this._config.apiUrl}/profiles/`).pipe(
      map((response) => {
        const mapit = (input) => {
          return input.map((node) => {
            const multi_profiles = Object.entries(node)
              .filter((property) => {
                if (
                  property[0].search('related') !== -1 &&
                  node[property[0]].length !== 0
                )
                  return property;
              })
              .map((profiles) => {
                return profiles[1].map((profile) => {
                  const profileName = profile.general_information?.name;
                  const profileSubName = profile.general_information?.sub_name;
                  return {
                    ...profile,
                    name: profileName ? profileName : 'Kein Name vorhanden',
                    sub_name: profileSubName,
                    type: 'profile',
                    mediaObjects: profile.media_objects
                      .sort((a, b) => a.profile_position - b.profile_position)
                      .map((m) => new MediaModel(m)),
                    def_type: profiles[0].split('_')[0],
                  };
                });
              });
            return {
              type: 'category',
              name: node.name,
              info: node.info,
              children: mapit(node.children),
              profiles: node.profiles
                ? node.profiles.map((profile) => ({
                    ...profile,
                    type: 'profile',
                    mediaObjects: profile.media_objects.map(
                      (m) => new MediaModel(m)
                    ),
                  }))
                : multi_profiles[0]
                ? multi_profiles[0]
                : [],
            };
          });
        };
        return mapit(response);
      }),
      tap((nodes) => {
        const mapIt = (result, value) => {
          for (const v of value) {
            result.push(...mapIt([], v.children));
            result.push(...v.profiles);
          }
          return result;
        };
        const flat = mapIt([], nodes);
        ctx.patchState({ nodes, profiles: flat });
      })
    );
  }
  loadDefinition(ctx) {
    if (ctx.getState().definition.length !== 0) {
      return;
    }
    return this._defService.loadDefinitions()?.pipe(
      tap((definition) => {
        ctx.patchState({
          definition,
        });
      })
    );
  }
  loadDefinitionSwagger(ctx) {
    if (ctx.getState().definition_swagger.length !== 0) {
      return;
    }
    return this._defService.loadDefinitions_swagger()?.pipe(
      tap((definition_swagger) => {
        ctx.patchState({
          definition_swagger,
        });
      })
    );
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: ProfileState,
    deps: [
      { token: i1.HttpClient },
      { token: SOLID_CORE_CONFIG },
      { token: i2.ProfileDefinitionService },
    ],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: ProfileState,
  });
};
__decorate(
  [
    Action(LoadProfiles),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  ProfileState.prototype,
  'set',
  null
);
__decorate(
  [
    Action(LoadDefinition),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  ProfileState.prototype,
  'loadDefinition',
  null
);
__decorate(
  [
    Action(LoadDefinitionSwagger),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  ProfileState.prototype,
  'loadDefinitionSwagger',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Function),
  ],
  ProfileState,
  'selectProfileAndNode',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  ProfileState,
  'selectProfile',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Array),
  ],
  ProfileState,
  'selectDefinition',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Array),
  ],
  ProfileState,
  'selectDefinition_swagger',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Array),
  ],
  ProfileState,
  'selectTree',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Array),
  ],
  ProfileState,
  'selectFlat',
  null
);
ProfileState = ProfileState_1 = __decorate(
  [
    State({
      name: 'profile',
      defaults: {
        profiles: [],
        nodes: [],
        definition: [],
        definition_swagger: [],
      },
    }),
    __metadata('design:paramtypes', [
      HttpClient,
      Object,
      ProfileDefinitionService,
    ]),
  ],
  ProfileState
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: ProfileState,
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
      { type: i2.ProfileDefinitionService },
    ];
  },
  propDecorators: { set: [], loadDefinition: [], loadDefinitionSwagger: [] },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvcHJvZmlsZS9zcmMvbGliL3N0YXRlL3Byb2ZpbGUuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBZ0IsTUFBTSxhQUFhLENBQUM7QUFFcEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFDTCxpQkFBaUIsRUFFakIsVUFBVSxHQUVYLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUNMLGNBQWMsRUFDZCxxQkFBcUIsRUFDckIsWUFBWSxHQUNiLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7OztBQW9CM0UsV0FBTSxZQUFZLEdBQWxCLE1BQU0sWUFBWTs7SUFFYjtJQUMyQjtJQUMzQjtJQUhWLFlBQ1UsSUFBZ0IsRUFDVyxPQUF3QixFQUNuRCxXQUFxQztRQUZyQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ1csWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDbkQsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO0lBQzVDLENBQUM7SUFHRyxBQUFQLE1BQU0sQ0FBQyxvQkFBb0IsQ0FDekIsS0FBd0I7UUFLeEIsc0NBQXNDO1FBQ3RDLHNEQUFzRDtRQUN0RCxNQUFNLEVBQUUsR0FBRyxVQUFVLFNBQWtCLEVBQUUsV0FBb0I7WUFDM0QsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDZCxPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsS0FB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ZWxlY3RvciwgU3RhdGUsIFN0YXRlQ29udGV4dCB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcclxuaW1wb3J0IHsgUHJvZmlsZSwgVHJlZU5vZGUsIFRyZWVOb2RlQXBpIH0gZnJvbSAnLi9wcm9maWxlLm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7XHJcbiAgU09MSURfQ09SRV9DT05GSUcsXHJcbiAgU29saWRDb3JlQ29uZmlnLFxyXG4gIE1lZGlhTW9kZWwsXHJcbiAgTWVkaWFPYmplY3RNb2RlbCxcclxufSBmcm9tICdAemVudHJ1bW5hd2kvc29saWQtY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgTG9hZERlZmluaXRpb24sXHJcbiAgTG9hZERlZmluaXRpb25Td2FnZ2VyLFxyXG4gIExvYWRQcm9maWxlcyxcclxufSBmcm9tICcuL3Byb2ZpbGUuYWN0aW9ucyc7XHJcbmltcG9ydCB7IG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBQcm9maWxlRGVmaW5pdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9wcm9maWxlLWRlZmluaXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IE11bHRpUHJvZmlsZXMgfSBmcm9tICcuL3Byb2ZpbGUtZGVmaW5pdGlvbi5tb2RlbCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFByb2ZpbGVTdGF0ZU1vZGVsIHtcclxuICBwcm9maWxlczogUHJvZmlsZVtdO1xyXG4gIG5vZGVzOiBUcmVlTm9kZVtdO1xyXG4gIGRlZmluaXRpb246IE11bHRpUHJvZmlsZXNbXTtcclxuICBkZWZpbml0aW9uX3N3YWdnZXI6IE11bHRpUHJvZmlsZXNbXTtcclxufVxyXG5cclxuQFN0YXRlPFByb2ZpbGVTdGF0ZU1vZGVsPih7XHJcbiAgbmFtZTogJ3Byb2ZpbGUnLFxyXG4gIGRlZmF1bHRzOiB7XHJcbiAgICBwcm9maWxlczogW10sXHJcbiAgICBub2RlczogW10sXHJcbiAgICBkZWZpbml0aW9uOiBbXSxcclxuICAgIGRlZmluaXRpb25fc3dhZ2dlcjogW10sXHJcbiAgfSxcclxufSlcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUHJvZmlsZVN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgIEBJbmplY3QoU09MSURfQ09SRV9DT05GSUcpIHByaXZhdGUgX2NvbmZpZzogU29saWRDb3JlQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBfZGVmU2VydmljZTogUHJvZmlsZURlZmluaXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBAU2VsZWN0b3IoKVxyXG4gIHN0YXRpYyBzZWxlY3RQcm9maWxlQW5kTm9kZShcclxuICAgIHN0YXRlOiBQcm9maWxlU3RhdGVNb2RlbFxyXG4gICk6IChcclxuICAgIHByb2ZpbGVJZD86IG51bWJlcixcclxuICAgIHByb2ZpbGVUeXBlPzogc3RyaW5nXHJcbiAgKSA9PiB7IHByb2ZpbGU6IFByb2ZpbGU7IG5vZGU6IFRyZWVOb2RlIH0gfCBudWxsIHtcclxuICAgIC8vIFRoaXMgcmVkdW5kYW50IHZhcmlhYmxlIGlzIHJlcXVpcmVkXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbmctcGFja2Fnci9uZy1wYWNrYWdyL2lzc3Vlcy82OTZcclxuICAgIGNvbnN0IGZuID0gZnVuY3Rpb24gKHByb2ZpbGVJZD86IG51bWJlciwgcHJvZmlsZVR5cGU/OiBzdHJpbmcpIHtcclxuICAgICAgaWYgKCFwcm9maWxlSWQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygc3RhdGUubm9kZXMpIHtcclxuICAgICAgICBjb25zdCBjaGlsZFNlYXJjaCA9IHByb2ZpbGVUeXBlXHJcbiAgICAgICAgICA/IFByb2ZpbGVTdGF0ZS5maW5kUHJvZmlsZURlZXAobm9kZSwgcHJvZmlsZUlkLCBwcm9maWxlVHlwZSlcclxuICAgICAgICAgIDogUHJvZmlsZVN0YXRlLmZpbmRQcm9maWxlRGVlcChub2RlLCBwcm9maWxlSWQpOyAvLyB0ZW1wb3JhcnkgZm9yIFBMQU5UWVxyXG4gICAgICAgIGlmIChjaGlsZFNlYXJjaCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIGNoaWxkU2VhcmNoO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZm47XHJcbiAgfVxyXG5cclxuICBAU2VsZWN0b3IoKVxyXG4gIHN0YXRpYyBzZWxlY3RQcm9maWxlKHN0YXRlOiBQcm9maWxlU3RhdGVNb2RlbCkge1xyXG4gICAgcmV0dXJuIHN0YXRlLnByb2ZpbGVzO1xyXG4gIH1cclxuXHJcbiAgQFNlbGVjdG9yKClcclxuICBzdGF0aWMgc2VsZWN0RGVmaW5pdGlvbihzdGF0ZTogUHJvZmlsZVN0YXRlTW9kZWwpOiBNdWx0aVByb2ZpbGVzW10ge1xyXG4gICAgcmV0dXJuIHN0YXRlLmRlZmluaXRpb247XHJcbiAgfVxyXG5cclxuICBAU2VsZWN0b3IoKVxyXG4gIHN0YXRpYyBzZWxlY3REZWZpbml0aW9uX3N3YWdnZXIoc3RhdGU6IFByb2ZpbGVTdGF0ZU1vZGVsKTogTXVsdGlQcm9maWxlc1tdIHtcclxuICAgIHJldHVybiBzdGF0ZS5kZWZpbml0aW9uX3N3YWdnZXI7XHJcbiAgfVxyXG5cclxuICBAU2VsZWN0b3IoKVxyXG4gIHN0YXRpYyBzZWxlY3RUcmVlKHN0YXRlOiBQcm9maWxlU3RhdGVNb2RlbCk6IFRyZWVOb2RlW10ge1xyXG4gICAgcmV0dXJuIFsuLi5zdGF0ZS5ub2Rlc107XHJcbiAgfVxyXG5cclxuICBAU2VsZWN0b3IoKVxyXG4gIHN0YXRpYyBzZWxlY3RGbGF0KHN0YXRlOiBQcm9maWxlU3RhdGVNb2RlbCk6IFByb2ZpbGVbXSB7XHJcbiAgICByZXR1cm4gWy4uLnN0YXRlLnByb2ZpbGVzXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGZpbmRQcm9maWxlRGVlcChcclxuICAgIG5vZGU6IFRyZWVOb2RlLFxyXG4gICAgcHJvZmlsZUlkOiBudW1iZXIsXHJcbiAgICBwcm9maWxlVHlwZT86IHN0cmluZ1xyXG4gICk6IHsgcHJvZmlsZTogUHJvZmlsZTsgbm9kZTogVHJlZU5vZGUgfSB8IG51bGwge1xyXG4gICAgY29uc3QgcHJvZmlsZSA9IHByb2ZpbGVUeXBlXHJcbiAgICAgID8gbm9kZS5wcm9maWxlcy5maW5kKFxyXG4gICAgICAgICAgKHApID0+IHAuaWQgPT09IHByb2ZpbGVJZCAmJiBwLmRlZl90eXBlID09PSBwcm9maWxlVHlwZVxyXG4gICAgICAgIClcclxuICAgICAgOiBub2RlLnByb2ZpbGVzLmZpbmQoKHApID0+IHAuaWQgPT09IHByb2ZpbGVJZCk7IC8vIHRlbXBvcmFyeSBmb3IgUExBTlRZXHJcbiAgICBpZiAocHJvZmlsZSkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHByb2ZpbGUsXHJcbiAgICAgICAgbm9kZSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGZvciAoY29uc3QgbGVhZk5vZGUgb2Ygbm9kZS5jaGlsZHJlbikge1xyXG4gICAgICBjb25zdCBjaGlsZFNlYXJjaCA9IHByb2ZpbGVUeXBlXHJcbiAgICAgICAgPyBQcm9maWxlU3RhdGUuZmluZFByb2ZpbGVEZWVwKGxlYWZOb2RlLCBwcm9maWxlSWQsIHByb2ZpbGVUeXBlKVxyXG4gICAgICAgIDogUHJvZmlsZVN0YXRlLmZpbmRQcm9maWxlRGVlcChsZWFmTm9kZSwgcHJvZmlsZUlkKTsgLy8gdGVtcG9yYXJ5IGZvciBQTEFOVFlcclxuICAgICAgaWYgKGNoaWxkU2VhcmNoICE9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkU2VhcmNoO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8vIFByZWxpbWluYXJ5IFdvcmthcm91bmQgZm9yIEdlb01hdCB0byBtZXJnZSB1bmtub3duIHJvY2sgY29tcG91bmRzIHdpdGggbWluZXJhbHMgZnJvbSBnZW9tYXQgZGJcclxuICBwcml2YXRlIHN0YXRpYyBjb21wb3NlTWluZXJhbENvbXBvdW5kcyhcclxuICAgIGNvbXBvdW5kczogc3RyaW5nLFxyXG4gICAgZ2VvTWF0Q29udGVudDogb2JqZWN0W11cclxuICApIHtcclxuICAgIGNvbnN0IGNvbXB1bmRBcnJheSA9IGNvbXBvdW5kc1xyXG4gICAgICAuc3BsaXQoJywgJylcclxuICAgICAgLnNwbGljZSgtZ2VvTWF0Q29udGVudC5sZW5ndGgpXHJcbiAgICAgIC5tYXAoKHZhbHVlKSA9PiAoe1xyXG4gICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgIG5hbWU6IHZhbHVlLFxyXG4gICAgICAgIHN1Yl9uYW1lOiAnJyxcclxuICAgICAgfSkpO1xyXG4gICAgY29uc3QgY21wID0gWy4uLmNvbXB1bmRBcnJheSwgLi4uZ2VvTWF0Q29udGVudF07XHJcbiAgICByZXR1cm4gY21wO1xyXG4gIH1cclxuXHJcbiAgQEFjdGlvbihMb2FkUHJvZmlsZXMpXHJcbiAgcHVibGljIHNldChjdHg6IFN0YXRlQ29udGV4dDxQcm9maWxlU3RhdGVNb2RlbD4pIHtcclxuICAgIGlmIChjdHguZ2V0U3RhdGUoKS5wcm9maWxlcy5sZW5ndGggIT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxyXG4gICAgICAuZ2V0PFRyZWVOb2RlQXBpW10+KGAke3RoaXMuX2NvbmZpZy5hcGlVcmx9L3Byb2ZpbGVzL2ApXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG1hcGl0ID0gKGlucHV0OiBUcmVlTm9kZUFwaVtdKTogVHJlZU5vZGVbXSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC5tYXAoKG5vZGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IG11bHRpX3Byb2ZpbGVzID0gT2JqZWN0LmVudHJpZXMobm9kZSlcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKHByb3BlcnR5OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5WzBdLnNlYXJjaCgncmVsYXRlZCcpICE9PSAtMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVbcHJvcGVydHlbMF1dLmxlbmd0aCAhPT0gMFxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5O1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5tYXAoKHByb2ZpbGVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2ZpbGVzWzFdLm1hcCgocHJvZmlsZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZmlsZU5hbWUgPSBwcm9maWxlLmdlbmVyYWxfaW5mb3JtYXRpb24/Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZmlsZVN1Yk5hbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZS5nZW5lcmFsX2luZm9ybWF0aW9uPy5zdWJfbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgLi4ucHJvZmlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHByb2ZpbGVOYW1lID8gcHJvZmlsZU5hbWUgOiAnS2VpbiBOYW1lIHZvcmhhbmRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdWJfbmFtZTogcHJvZmlsZVN1Yk5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncHJvZmlsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICBtZWRpYU9iamVjdHM6IHByb2ZpbGUubWVkaWFfb2JqZWN0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc29ydChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAoYTogTWVkaWFPYmplY3RNb2RlbCwgYjogTWVkaWFPYmplY3RNb2RlbCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEucHJvZmlsZV9wb3NpdGlvbiAtIGIucHJvZmlsZV9wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKG06IE1lZGlhT2JqZWN0TW9kZWwpID0+IG5ldyBNZWRpYU1vZGVsKG0pKSxcclxuICAgICAgICAgICAgICAgICAgICAgIGRlZl90eXBlOiBwcm9maWxlc1swXS5zcGxpdCgnXycpWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnY2F0ZWdvcnknLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogbm9kZS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgaW5mbzogbm9kZS5pbmZvLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IG1hcGl0KG5vZGUuY2hpbGRyZW4pLFxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZXM6IG5vZGUucHJvZmlsZXNcclxuICAgICAgICAgICAgICAgICAgPyBub2RlLnByb2ZpbGVzLm1hcCgocHJvZmlsZTogYW55KSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgLi4ucHJvZmlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwcm9maWxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgIG1lZGlhT2JqZWN0czogcHJvZmlsZS5tZWRpYV9vYmplY3RzLm1hcChcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG06IE1lZGlhT2JqZWN0TW9kZWwpID0+IG5ldyBNZWRpYU1vZGVsKG0pXHJcbiAgICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgICA6IG11bHRpX3Byb2ZpbGVzWzBdXHJcbiAgICAgICAgICAgICAgICAgID8gbXVsdGlfcHJvZmlsZXNbMF1cclxuICAgICAgICAgICAgICAgICAgOiBbXSxcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXR1cm4gbWFwaXQocmVzcG9uc2UpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRhcCgobm9kZXMpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG1hcEl0ID0gKHJlc3VsdDogUHJvZmlsZVtdLCB2YWx1ZTogVHJlZU5vZGVbXSkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHYgb2YgdmFsdWUpIHtcclxuICAgICAgICAgICAgICByZXN1bHQucHVzaCguLi5tYXBJdChbXSwgdi5jaGlsZHJlbikpO1xyXG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKC4uLnYucHJvZmlsZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc3QgZmxhdCA9IG1hcEl0KFtdLCBub2Rlcyk7XHJcbiAgICAgICAgICBjdHgucGF0Y2hTdGF0ZSh7IG5vZGVzLCBwcm9maWxlczogZmxhdCB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgQEFjdGlvbihMb2FkRGVmaW5pdGlvbilcclxuICBwdWJsaWMgbG9hZERlZmluaXRpb24oY3R4OiBTdGF0ZUNvbnRleHQ8UHJvZmlsZVN0YXRlTW9kZWw+KSB7XHJcbiAgICBpZiAoY3R4LmdldFN0YXRlKCkuZGVmaW5pdGlvbi5sZW5ndGggIT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2RlZlNlcnZpY2UubG9hZERlZmluaXRpb25zKCk/LnBpcGUoXHJcbiAgICAgIHRhcCgoZGVmaW5pdGlvbjogTXVsdGlQcm9maWxlc1tdKSA9PiB7XHJcbiAgICAgICAgY3R4LnBhdGNoU3RhdGUoe1xyXG4gICAgICAgICAgZGVmaW5pdGlvbixcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBAQWN0aW9uKExvYWREZWZpbml0aW9uU3dhZ2dlcilcclxuICBwdWJsaWMgbG9hZERlZmluaXRpb25Td2FnZ2VyKGN0eDogU3RhdGVDb250ZXh0PFByb2ZpbGVTdGF0ZU1vZGVsPikge1xyXG4gICAgaWYgKGN0eC5nZXRTdGF0ZSgpLmRlZmluaXRpb25fc3dhZ2dlci5sZW5ndGggIT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9kZWZTZXJ2aWNlLmxvYWREZWZpbml0aW9uc19zd2FnZ2VyKCk/LnBpcGUoXHJcbiAgICAgIHRhcCgoZGVmaW5pdGlvbl9zd2FnZ2VyOiBNdWx0aVByb2ZpbGVzW10pID0+IHtcclxuICAgICAgICBjdHgucGF0Y2hTdGF0ZSh7XHJcbiAgICAgICAgICBkZWZpbml0aW9uX3N3YWdnZXIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=
