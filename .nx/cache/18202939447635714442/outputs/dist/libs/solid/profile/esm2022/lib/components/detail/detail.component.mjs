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
import {
  Component,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  Inject,
} from '@angular/core';
import { ProfileState } from '../../state/profile.state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ProfilePropertyType } from '../../state/profile-definition.model';
import { MatExpansionPanel } from '@angular/material/expansion';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@zentrumnawi/solid-core';
import * as i3 from '@angular/material/expansion';
export class DetailComponent {
  config;
  expansionPanel;
  thumbnails;
  PropertyTypes = ProfilePropertyType;
  //Load definitions from OpenAPI 3.0
  $ProfileDefinitions;
  //Load definitions from OpenAPI 2.0
  $ProfileDefinition_Swagger;
  node;
  selectProfile = new EventEmitter();
  ImageLoaded = [false];
  ImageSelected = 0;
  ImageIndex = 0;
  ImageEndIndex = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  hasDialog;
  _profile;
  hasDescription;
  hasDescriptionToggle = false;
  MediaObjectsOnlyImages;
  definitions = [];
  definitions_swagger = [];
  profileDefinitionSub;
  profileDefinitionSwaggerSub;
  //public shouldExpandAllgemein = this.config.expandAllgemein;
  shouldExpandAllgemein;
  shouldExpandCategories = ['allgemein', 'informatives', 'general information'];
  get profile() {
    return this._profile;
  }
  set profile(profile) {
    this._profile = profile;
    this.ImageLoaded = profile.mediaObjects.map((_) => false);
    if (this.shouldExpandAllgemein) {
      this.expansionPanel?.open(); // expand the category-panel even if it was closed in other profile
    }
    this.MediaObjectsOnlyImages = this.profile.mediaObjects.filter(
      (x) => x.mediaType === 'image'
    );
    this.onImageSelect(0);
  }
  constructor(config) {
    this.config = config;
  }
  ngOnInit() {
    this.shouldExpandAllgemein = this.config.expandAllgemein;
    this.profileDefinitionSwaggerSub =
      this.$ProfileDefinition_Swagger.subscribe((defs) => {
        this.definitions_swagger = defs;
      });
    this.profileDefinitionSub = this.$ProfileDefinitions.subscribe((defs) => {
      this.definitions = defs;
    });
  }
  ngOnDestroy() {
    this.profileDefinitionSwaggerSub.unsubscribe();
    this.profileDefinitionSub.unsubscribe();
  }
  getProperties(profile) {
    const generalInfoKey = 'general_information';
    const def_property = this.definitions.filter(
      (def) => def.name === profile.def_type
    )[0].properties;
    const generalInfo = def_property.find(
      (prop) => prop.key === generalInfoKey
    );
    if (generalInfo) {
      const filter_def = def_property.filter(
        (prop) => prop.key !== generalInfoKey
      );
      filter_def.unshift(generalInfo);
      return filter_def;
    } else {
      return def_property;
    }
  }
  onImageLoaded(index) {
    this.ImageLoaded[index] = true;
  }
  onImageSelect(index) {
    this.ImageSelected = index;
    this.ImageIndex = this.MediaObjectsOnlyImages.findIndex(
      (media) => media.getProfilePosition - 1 === index
    );
    if (this.profile.mediaObjects.length !== 0) {
      if (this.profile.mediaObjects[index].mediaType === 'audio') {
        this.hasDialog = false;
        this.hasDescription = false;
        this.hasDescriptionToggle = true;
      } else if (this.profile.mediaObjects[index].mediaType === 'video') {
        this.hasDialog = false;
        this.hasDescription = true;
        this.hasDescriptionToggle = false;
      } else {
        this.hasDialog = true;
        this.hasDescriptionToggle = false;
        this.hasDescription = false;
      }
    }
  }
  shouldDisplayProperty(property, profile_obj) {
    if (property.required) {
      return true;
    }
    const val =
      profile_obj !== null &&
      profile_obj !== undefined &&
      property.key in profile_obj
        ? profile_obj[property.key]
        : undefined;
    switch (property.type) {
      case ProfilePropertyType.List:
        return Array.isArray(val) && val.length > 0;
      case ProfilePropertyType.Group:
      case ProfilePropertyType.String:
      case ProfilePropertyType.Integer:
      case ProfilePropertyType.Boolean:
      case ProfilePropertyType.Mdstring:
      case ProfilePropertyType.Colstring:
        return val !== undefined && val !== '';
    }
  }
  swipe(currentIndex, action = this.SWIPE_ACTION.RIGHT) {
    if (currentIndex > this.profile.mediaObjects.length || currentIndex < 0) {
      return;
    }
    if (action === this.SWIPE_ACTION.LEFT) {
      const isLast = currentIndex === this.profile.mediaObjects.length - 1;
      this.ImageSelected = isLast ? 0 : currentIndex + 1;
    }
    if (action === this.SWIPE_ACTION.RIGHT) {
      const isFirst = currentIndex === 0;
      this.ImageSelected = isFirst
        ? this.profile.mediaObjects.length - 1
        : currentIndex - 1;
    }
    this.thumbnails?.nativeElement.children[this.ImageSelected].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }
  handleNextDialogEvent() {
    if (this.ImageIndex < this.MediaObjectsOnlyImages.length - 1) {
      this.ImageIndex++;
    } else {
      this.ImageIndex = 0;
    }
    this.ImageSelected =
      this.MediaObjectsOnlyImages[this.ImageIndex].getProfilePosition - 1;
  }
  handlePrevDialogEvent() {
    if (this.ImageIndex > 0) {
      this.ImageIndex--;
    } else {
      this.ImageIndex = this.MediaObjectsOnlyImages.length - 1;
    }
    this.ImageSelected =
      this.MediaObjectsOnlyImages[this.ImageIndex].getProfilePosition - 1;
  }
  getClass(level, type) {
    return `property-${type}-level-${level}`;
  }
  shouldExpand(title) {
    return (
      this.shouldExpandAllgemein &&
      this.shouldExpandCategories.includes(title.toLocaleLowerCase())
    );
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: DetailComponent,
    deps: [{ token: SOLID_CORE_CONFIG }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: DetailComponent,
    selector: 'solid-profile-detail',
    inputs: { node: 'node', profile: 'profile' },
    outputs: { selectProfile: 'selectProfile' },
    viewQueries: [
      {
        propertyName: 'expansionPanel',
        first: true,
        predicate: ['expansionPanel'],
        descendants: true,
        read: MatExpansionPanel,
      },
      {
        propertyName: 'thumbnails',
        first: true,
        predicate: ['thumbnails'],
        descendants: true,
      },
    ],
    ngImport: i0,
    template:
      '<ng-container>\r\n  <div id="profile-short-description" *ngIf="profile.short_description">\r\n    <div class="facts-title">\r\n      <div>Kurzbeschreibung</div>\r\n    </div>\r\n    <p class="facts-body" markdown [data]="profile.short_description"></p>\r\n  </div>\r\n  <solid-core-media\r\n    *ngIf="profile.mediaObjects.length > 0; else noImage"\r\n    id="profile-media-container"\r\n    (swipeleft)="swipe(ImageSelected, $event.type)"\r\n    (swiperight)="swipe(ImageSelected, $event.type)"\r\n    [mediaObject]="profile.mediaObjects[ImageSelected]"\r\n    [name]="profile.name"\r\n    [hasDialog]="hasDialog"\r\n    [hasDescription]="hasDescription"\r\n    [hasDescriptionToggle]="hasDescriptionToggle"\r\n    (NextDialogEmitter)="handleNextDialogEvent()"\r\n    (PrevDialogEmitter)="handlePrevDialogEvent()"\r\n    [hasNavigationInDialog]="MediaObjectsOnlyImages.length > 1"\r\n  ></solid-core-media>\r\n  <ng-template #noImage>\r\n    <div class="no-img-container" id="profile-media-container">\r\n      <img class="no-img" src="assets/profile/no_image.svg" />\r\n    </div>\r\n  </ng-template>\r\n  <div class="scroll-container">\r\n    <div\r\n      *ngIf="profile.mediaObjects.length > 1"\r\n      class="img-toolbar"\r\n      #thumbnails\r\n    >\r\n      <ng-container\r\n        *ngFor="let mediaObject of profile.mediaObjects; let i = index"\r\n      >\r\n        <img\r\n          *ngIf="mediaObject.mediaType === \'image\'"\r\n          (click)="onImageSelect(i)"\r\n          [class.not-selected]="ImageSelected !== i"\r\n          [src]="mediaObject.getRawImage(\'thumbnail\')"\r\n          [alt]="mediaObject.alt"\r\n        />\r\n        <img\r\n          *ngIf="mediaObject.mediaType === \'video\'"\r\n          (click)="onImageSelect(i)"\r\n          [class.not-selected]="ImageSelected !== i"\r\n          [src]="\'assets/profile/video.svg\'"\r\n          [alt]="mediaObject.alt"\r\n        />\r\n        <img\r\n          *ngIf="mediaObject.mediaType === \'audio\'"\r\n          (click)="onImageSelect(i)"\r\n          [class.not-selected]="ImageSelected !== i"\r\n          [src]="\'assets/profile/audio.svg\'"\r\n          [alt]="mediaObject.alt"\r\n        />\r\n      </ng-container>\r\n    </div>\r\n  </div>\r\n</ng-container>\r\n\r\n<!-- Load definitions from OpenAPI 2.0 -->\r\n<ng-container *ngIf="definitions_swagger.length !== 0">\r\n  <mat-accordion id="profile-detail-info" multi="false" displayMode="flat">\r\n    <mat-expansion-panel>\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title>Allgemein</mat-panel-title>\r\n      </mat-expansion-panel-header>\r\n      <ng-container *ngFor="let property of getProperties(profile)">\r\n        <ng-container *ngIf="property.type !== PropertyTypes.Group">\r\n          <ng-container\r\n            *ngTemplateOutlet="\r\n              propertyTemplate_swagger;\r\n              context: { profile_obj: profile, property: property }\r\n            "\r\n          ></ng-container>\r\n        </ng-container>\r\n      </ng-container>\r\n    </mat-expansion-panel>\r\n    <ng-container *ngFor="let property of getProperties(profile)">\r\n      <mat-expansion-panel\r\n        *ngIf="\r\n          property.type === PropertyTypes.Group &&\r\n          (property.required || profile[property.key])\r\n        "\r\n      >\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title>{{\r\n            property.title ? property.title : property.key\r\n          }}</mat-panel-title>\r\n        </mat-expansion-panel-header>\r\n        <ng-container *ngFor="let childProperty of property.properties">\r\n          <ng-container\r\n            *ngTemplateOutlet="\r\n              propertyTemplate_swagger;\r\n              context: {\r\n                profile_obj: profile[property.key],\r\n                property: childProperty\r\n              }\r\n            "\r\n          ></ng-container>\r\n        </ng-container>\r\n      </mat-expansion-panel>\r\n    </ng-container>\r\n  </mat-accordion>\r\n</ng-container>\r\n<ng-template\r\n  #propertyTemplate_swagger\r\n  let-profile_obj="profile_obj"\r\n  let-property="property"\r\n>\r\n  <ng-container\r\n    *ngIf="shouldDisplayProperty(property, profile_obj)"\r\n    [ngSwitch]="property.type"\r\n  >\r\n    <p class="heading">{{ property.title ? property.title : property.key }}</p>\r\n    <ng-container *ngSwitchCase="PropertyTypes.String">\r\n      <p\r\n        *ngIf="\r\n          !(profile_obj[property.key].indexOf(\'http\') === 0);\r\n          else httpString\r\n        "\r\n      >\r\n        {{ profile_obj[property.key] }}\r\n      </p>\r\n      <ng-template #httpString>\r\n        <p>\r\n          <a [href]="profile_obj[property.key]" target="_blank">\r\n            {{ profile_obj[property.key] }}\r\n          </a>\r\n        </p>\r\n      </ng-template>\r\n    </ng-container>\r\n    <p *ngSwitchCase="PropertyTypes.Integer">\r\n      {{ profile_obj[property.key] }}\r\n    </p>\r\n    <p *ngSwitchCase="PropertyTypes.Boolean">\r\n      {{ profile_obj[property.key] }}\r\n    </p>\r\n    <p\r\n      *ngSwitchCase="PropertyTypes.Mdstring"\r\n      markdown\r\n      [data]="profile_obj[property.key]"\r\n    ></p>\r\n    <ng-container *ngSwitchCase="PropertyTypes.Colstring">\r\n      <p\r\n        *ngIf="profile_obj[property.key].indexOf(\'#\') === 0; else notColString"\r\n        id="normal_color"\r\n        [style.background-color]="profile_obj[property.key]"\r\n      ></p>\r\n      <ng-template #notColString>\r\n        <p>{{ profile_obj[property.key] }}</p>\r\n      </ng-template>\r\n    </ng-container>\r\n    <ng-container *ngSwitchCase="PropertyTypes.List">\r\n      <p *ngFor="let val of profile_obj[property.key]">{{ val }}</p>\r\n    </ng-container>\r\n  </ng-container>\r\n</ng-template>\r\n\r\n<!-- Load definitions from OpenAPI 3.0 -->\r\n<ng-container *ngIf="definitions.length !== 0">\r\n  <mat-accordion id="profile-detail-info" multi="false" displayMode="flat">\r\n    <ng-container *ngFor="let property of getProperties(profile)">\r\n      <mat-expansion-panel\r\n        *ngIf="\r\n          property.type === PropertyTypes.Group &&\r\n          (property.required || profile[property.key])\r\n        "\r\n        [expanded]="shouldExpand(property.title)"\r\n        #expansionPanel\r\n      >\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title>{{\r\n            property.title ? property.title : property.key\r\n          }}</mat-panel-title>\r\n        </mat-expansion-panel-header>\r\n        <ng-container *ngFor="let childProperty of property.properties">\r\n          <ng-container\r\n            *ngTemplateOutlet="\r\n              propertyTemplate;\r\n              context: {\r\n                profile_obj: profile[property.key],\r\n                property: childProperty,\r\n                level: 1\r\n              }\r\n            "\r\n          ></ng-container>\r\n        </ng-container>\r\n      </mat-expansion-panel>\r\n    </ng-container>\r\n  </mat-accordion>\r\n</ng-container>\r\n<ng-template\r\n  #propertyTemplate\r\n  let-profile_obj="profile_obj"\r\n  let-property="property"\r\n  let-level="level"\r\n>\r\n  <ng-container\r\n    *ngIf="shouldDisplayProperty(property, profile_obj)"\r\n    [ngSwitch]="property.type"\r\n  >\r\n    <p class="heading" [ngClass]="getClass(level, \'heading\')">\r\n      {{ property.title ? property.title : property.key }}\r\n    </p>\r\n    <ng-container *ngSwitchCase="PropertyTypes.String">\r\n      <p\r\n        *ngIf="\r\n          !(profile_obj[property.key]?.indexOf(\'http\') === 0);\r\n          else httpString\r\n        "\r\n        [ngClass]="getClass(level, \'content\')"\r\n      >\r\n        {{ profile_obj[property.key] }}\r\n      </p>\r\n      <ng-template #httpString>\r\n        <p [ngClass]="getClass(level, \'content\')">\r\n          <a [href]="profile_obj[property.key]" target="_blank">\r\n            {{ profile_obj[property.key] }}\r\n          </a>\r\n        </p>\r\n      </ng-template>\r\n    </ng-container>\r\n    <p\r\n      *ngSwitchCase="PropertyTypes.Integer"\r\n      [ngClass]="getClass(level, \'content\')"\r\n    >\r\n      {{ profile_obj[property.key] }}\r\n    </p>\r\n    <p\r\n      *ngSwitchCase="PropertyTypes.Boolean"\r\n      [ngClass]="getClass(level, \'content\')"\r\n    >\r\n      {{ profile_obj[property.key] }}\r\n    </p>\r\n    <p\r\n      *ngSwitchCase="PropertyTypes.Mdstring"\r\n      [ngClass]="getClass(level, \'content\')"\r\n      markdown\r\n      [data]="profile_obj[property.key]"\r\n    ></p>\r\n    <ng-container\r\n      *ngSwitchCase="PropertyTypes.Colstring"\r\n      [ngClass]="getClass(level, \'content\')"\r\n    >\r\n      <p\r\n        *ngIf="profile_obj[property.key].indexOf(\'#\') === 0; else notColString"\r\n        id="normal_color"\r\n        [style.background-color]="profile_obj[property.key]"\r\n      ></p>\r\n      <ng-template #notColString>\r\n        <p [ngClass]="getClass(level, \'content\')">\r\n          {{ profile_obj[property.key] }}\r\n        </p>\r\n      </ng-template>\r\n    </ng-container>\r\n    <ng-container *ngSwitchCase="PropertyTypes.List">\r\n      <ng-container\r\n        *ngIf="property.key !== \'mineraltype_compounds\'; else compounds"\r\n      >\r\n        <p\r\n          [ngClass]="getClass(level, \'content\')"\r\n          *ngFor="let val of profile_obj[property.key]"\r\n        >\r\n          {{ val }}\r\n        </p>\r\n      </ng-container>\r\n      <ng-template #compounds>\r\n        <div *ngFor="let val of profile_obj[property.key]">\r\n          <div\r\n            (click)="\r\n              val.id\r\n                ? selectProfile.emit({ id: val.id, type: \'mineraltype\' })\r\n                : \'\'\r\n            "\r\n            class="profileLink"\r\n          >\r\n            {{ val.name }}\r\n            <span *ngIf="val.variety !== \'\'">({{ val.variety }})</span>\r\n            <img *ngIf="val.id" src="assets/icons/icon.svg" />\r\n          </div>\r\n        </div>\r\n      </ng-template>\r\n    </ng-container>\r\n    <ng-container *ngSwitchCase="PropertyTypes.Group">\r\n      <ng-container *ngFor="let childProperty of property.properties">\r\n        <ng-container *ngIf="profile_obj">\r\n          <ng-container\r\n            *ngTemplateOutlet="\r\n              propertyTemplate;\r\n              context: {\r\n                profile_obj: profile_obj[property.key],\r\n                property: childProperty,\r\n                level: level + 1\r\n              }\r\n            "\r\n          ></ng-container>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-container>\r\n</ng-template>\r\n',
    styles: [
      'p{padding:0 .7em;margin-bottom:0;font-weight:200;overflow:auto}p.heading{padding:.6em .7em;font-weight:500;margin:.5em 0}p.heading.property-heading-level-3{font-weight:400}p.heading:first-letter{text-transform:uppercase}solid-core-media{margin-top:2px;margin-bottom:2px;height:40vh}.no-img-container{text-align:center}.no-img-container .no-img{height:40vh;width:100%}mat-expansion-panel mat-expansion-panel-header mat-panel-title{display:block;font-weight:500}mat-expansion-panel mat-expansion-panel-header mat-panel-title:first-letter{text-transform:uppercase}mat-expansion-panel mat-expansion-panel-header.mat-expanded{background-color:#f5f5f5}.scroll-container-profile{max-width:100%;height:100px;overflow:auto}div.img-toolbar-profile{margin:10px 0;overflow-y:hidden;overflow-x:auto;display:flex}.scroll-container{width:100%;max-width:100%;overflow:auto}div.img-toolbar{margin:10px 0;overflow-y:hidden;overflow-x:auto;display:flex;flex-direction:row;align-items:center;justify-content:center;min-width:min-content;min-width:-webkit-min-content}div.img-toolbar img:first-child{margin-left:10px}div.img-toolbar img{height:4rem;width:4rem;transition-property:filter;transition-duration:.5s;margin:0 4px;object-fit:cover}div.img-toolbar img.not-selected{cursor:pointer;filter:saturate(0%)}div.img-toolbar img:last-child{margin-right:10px}.facts-title{height:48px;display:flex;flex-direction:row;align-items:center;font-weight:700}.facts-title div{padding-right:24px;padding-left:24px}.facts-body{padding-left:31px;padding-right:31px}#normal_color{width:18px;height:18px;margin-left:7px}mat-tooltip.custom-tooltip{color:pink;font-size:14px!important}div.profileLink{padding:0 .7em;margin-bottom:0;font-weight:200}div.profileLink img{position:relative;top:5px;height:18px;margin-left:2px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1.NgClass,
        selector: '[ngClass]',
        inputs: ['class', 'ngClass'],
      },
      {
        kind: 'directive',
        type: i1.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i1.NgTemplateOutlet,
        selector: '[ngTemplateOutlet]',
        inputs: [
          'ngTemplateOutletContext',
          'ngTemplateOutlet',
          'ngTemplateOutletInjector',
        ],
      },
      {
        kind: 'directive',
        type: i1.NgSwitch,
        selector: '[ngSwitch]',
        inputs: ['ngSwitch'],
      },
      {
        kind: 'directive',
        type: i1.NgSwitchCase,
        selector: '[ngSwitchCase]',
        inputs: ['ngSwitchCase'],
      },
      {
        kind: 'component',
        type: i2.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: i2.MediaComponent,
        selector: 'solid-core-media',
        inputs: [
          'image',
          'mediaObject',
          'hasDialog',
          'hasAttributions',
          'name',
          'view',
          'hasAudio',
          'hasControlPanel',
          'hasDescription',
          'hasDescriptionToggle',
          'slideshowPageChanged',
          'hasNavigationInDialog',
        ],
        outputs: ['NextDialogEmitter', 'PrevDialogEmitter'],
      },
      {
        kind: 'directive',
        type: i3.MatAccordion,
        selector: 'mat-accordion',
        inputs: ['multi', 'hideToggle', 'displayMode', 'togglePosition'],
        exportAs: ['matAccordion'],
      },
      {
        kind: 'component',
        type: i3.MatExpansionPanel,
        selector: 'mat-expansion-panel',
        inputs: ['disabled', 'expanded', 'hideToggle', 'togglePosition'],
        outputs: [
          'opened',
          'closed',
          'expandedChange',
          'afterExpand',
          'afterCollapse',
        ],
        exportAs: ['matExpansionPanel'],
      },
      {
        kind: 'component',
        type: i3.MatExpansionPanelHeader,
        selector: 'mat-expansion-panel-header',
        inputs: ['tabIndex', 'expandedHeight', 'collapsedHeight'],
      },
      {
        kind: 'directive',
        type: i3.MatExpansionPanelTitle,
        selector: 'mat-panel-title',
      },
    ],
  });
}
__decorate(
  [
    Select(ProfileState.selectDefinition),
    __metadata('design:type', Observable),
  ],
  DetailComponent.prototype,
  '$ProfileDefinitions',
  void 0
);
__decorate(
  [
    Select(ProfileState.selectDefinition_swagger),
    __metadata('design:type', Observable),
  ],
  DetailComponent.prototype,
  '$ProfileDefinition_Swagger',
  void 0
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: DetailComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-profile-detail',
          template:
            '<ng-container>\r\n  <div id="profile-short-description" *ngIf="profile.short_description">\r\n    <div class="facts-title">\r\n      <div>Kurzbeschreibung</div>\r\n    </div>\r\n    <p class="facts-body" markdown [data]="profile.short_description"></p>\r\n  </div>\r\n  <solid-core-media\r\n    *ngIf="profile.mediaObjects.length > 0; else noImage"\r\n    id="profile-media-container"\r\n    (swipeleft)="swipe(ImageSelected, $event.type)"\r\n    (swiperight)="swipe(ImageSelected, $event.type)"\r\n    [mediaObject]="profile.mediaObjects[ImageSelected]"\r\n    [name]="profile.name"\r\n    [hasDialog]="hasDialog"\r\n    [hasDescription]="hasDescription"\r\n    [hasDescriptionToggle]="hasDescriptionToggle"\r\n    (NextDialogEmitter)="handleNextDialogEvent()"\r\n    (PrevDialogEmitter)="handlePrevDialogEvent()"\r\n    [hasNavigationInDialog]="MediaObjectsOnlyImages.length > 1"\r\n  ></solid-core-media>\r\n  <ng-template #noImage>\r\n    <div class="no-img-container" id="profile-media-container">\r\n      <img class="no-img" src="assets/profile/no_image.svg" />\r\n    </div>\r\n  </ng-template>\r\n  <div class="scroll-container">\r\n    <div\r\n      *ngIf="profile.mediaObjects.length > 1"\r\n      class="img-toolbar"\r\n      #thumbnails\r\n    >\r\n      <ng-container\r\n        *ngFor="let mediaObject of profile.mediaObjects; let i = index"\r\n      >\r\n        <img\r\n          *ngIf="mediaObject.mediaType === \'image\'"\r\n          (click)="onImageSelect(i)"\r\n          [class.not-selected]="ImageSelected !== i"\r\n          [src]="mediaObject.getRawImage(\'thumbnail\')"\r\n          [alt]="mediaObject.alt"\r\n        />\r\n        <img\r\n          *ngIf="mediaObject.mediaType === \'video\'"\r\n          (click)="onImageSelect(i)"\r\n          [class.not-selected]="ImageSelected !== i"\r\n          [src]="\'assets/profile/video.svg\'"\r\n          [alt]="mediaObject.alt"\r\n        />\r\n        <img\r\n          *ngIf="mediaObject.mediaType === \'audio\'"\r\n          (click)="onImageSelect(i)"\r\n          [class.not-selected]="ImageSelected !== i"\r\n          [src]="\'assets/profile/audio.svg\'"\r\n          [alt]="mediaObject.alt"\r\n        />\r\n      </ng-container>\r\n    </div>\r\n  </div>\r\n</ng-container>\r\n\r\n<!-- Load definitions from OpenAPI 2.0 -->\r\n<ng-container *ngIf="definitions_swagger.length !== 0">\r\n  <mat-accordion id="profile-detail-info" multi="false" displayMode="flat">\r\n    <mat-expansion-panel>\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title>Allgemein</mat-panel-title>\r\n      </mat-expansion-panel-header>\r\n      <ng-container *ngFor="let property of getProperties(profile)">\r\n        <ng-container *ngIf="property.type !== PropertyTypes.Group">\r\n          <ng-container\r\n            *ngTemplateOutlet="\r\n              propertyTemplate_swagger;\r\n              context: { profile_obj: profile, property: property }\r\n            "\r\n          ></ng-container>\r\n        </ng-container>\r\n      </ng-container>\r\n    </mat-expansion-panel>\r\n    <ng-container *ngFor="let property of getProperties(profile)">\r\n      <mat-expansion-panel\r\n        *ngIf="\r\n          property.type === PropertyTypes.Group &&\r\n          (property.required || profile[property.key])\r\n        "\r\n      >\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title>{{\r\n            property.title ? property.title : property.key\r\n          }}</mat-panel-title>\r\n        </mat-expansion-panel-header>\r\n        <ng-container *ngFor="let childProperty of property.properties">\r\n          <ng-container\r\n            *ngTemplateOutlet="\r\n              propertyTemplate_swagger;\r\n              context: {\r\n                profile_obj: profile[property.key],\r\n                property: childProperty\r\n              }\r\n            "\r\n          ></ng-container>\r\n        </ng-container>\r\n      </mat-expansion-panel>\r\n    </ng-container>\r\n  </mat-accordion>\r\n</ng-container>\r\n<ng-template\r\n  #propertyTemplate_swagger\r\n  let-profile_obj="profile_obj"\r\n  let-property="property"\r\n>\r\n  <ng-container\r\n    *ngIf="shouldDisplayProperty(property, profile_obj)"\r\n    [ngSwitch]="property.type"\r\n  >\r\n    <p class="heading">{{ property.title ? property.title : property.key }}</p>\r\n    <ng-container *ngSwitchCase="PropertyTypes.String">\r\n      <p\r\n        *ngIf="\r\n          !(profile_obj[property.key].indexOf(\'http\') === 0);\r\n          else httpString\r\n        "\r\n      >\r\n        {{ profile_obj[property.key] }}\r\n      </p>\r\n      <ng-template #httpString>\r\n        <p>\r\n          <a [href]="profile_obj[property.key]" target="_blank">\r\n            {{ profile_obj[property.key] }}\r\n          </a>\r\n        </p>\r\n      </ng-template>\r\n    </ng-container>\r\n    <p *ngSwitchCase="PropertyTypes.Integer">\r\n      {{ profile_obj[property.key] }}\r\n    </p>\r\n    <p *ngSwitchCase="PropertyTypes.Boolean">\r\n      {{ profile_obj[property.key] }}\r\n    </p>\r\n    <p\r\n      *ngSwitchCase="PropertyTypes.Mdstring"\r\n      markdown\r\n      [data]="profile_obj[property.key]"\r\n    ></p>\r\n    <ng-container *ngSwitchCase="PropertyTypes.Colstring">\r\n      <p\r\n        *ngIf="profile_obj[property.key].indexOf(\'#\') === 0; else notColString"\r\n        id="normal_color"\r\n        [style.background-color]="profile_obj[property.key]"\r\n      ></p>\r\n      <ng-template #notColString>\r\n        <p>{{ profile_obj[property.key] }}</p>\r\n      </ng-template>\r\n    </ng-container>\r\n    <ng-container *ngSwitchCase="PropertyTypes.List">\r\n      <p *ngFor="let val of profile_obj[property.key]">{{ val }}</p>\r\n    </ng-container>\r\n  </ng-container>\r\n</ng-template>\r\n\r\n<!-- Load definitions from OpenAPI 3.0 -->\r\n<ng-container *ngIf="definitions.length !== 0">\r\n  <mat-accordion id="profile-detail-info" multi="false" displayMode="flat">\r\n    <ng-container *ngFor="let property of getProperties(profile)">\r\n      <mat-expansion-panel\r\n        *ngIf="\r\n          property.type === PropertyTypes.Group &&\r\n          (property.required || profile[property.key])\r\n        "\r\n        [expanded]="shouldExpand(property.title)"\r\n        #expansionPanel\r\n      >\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title>{{\r\n            property.title ? property.title : property.key\r\n          }}</mat-panel-title>\r\n        </mat-expansion-panel-header>\r\n        <ng-container *ngFor="let childProperty of property.properties">\r\n          <ng-container\r\n            *ngTemplateOutlet="\r\n              propertyTemplate;\r\n              context: {\r\n                profile_obj: profile[property.key],\r\n                property: childProperty,\r\n                level: 1\r\n              }\r\n            "\r\n          ></ng-container>\r\n        </ng-container>\r\n      </mat-expansion-panel>\r\n    </ng-container>\r\n  </mat-accordion>\r\n</ng-container>\r\n<ng-template\r\n  #propertyTemplate\r\n  let-profile_obj="profile_obj"\r\n  let-property="property"\r\n  let-level="level"\r\n>\r\n  <ng-container\r\n    *ngIf="shouldDisplayProperty(property, profile_obj)"\r\n    [ngSwitch]="property.type"\r\n  >\r\n    <p class="heading" [ngClass]="getClass(level, \'heading\')">\r\n      {{ property.title ? property.title : property.key }}\r\n    </p>\r\n    <ng-container *ngSwitchCase="PropertyTypes.String">\r\n      <p\r\n        *ngIf="\r\n          !(profile_obj[property.key]?.indexOf(\'http\') === 0);\r\n          else httpString\r\n        "\r\n        [ngClass]="getClass(level, \'content\')"\r\n      >\r\n        {{ profile_obj[property.key] }}\r\n      </p>\r\n      <ng-template #httpString>\r\n        <p [ngClass]="getClass(level, \'content\')">\r\n          <a [href]="profile_obj[property.key]" target="_blank">\r\n            {{ profile_obj[property.key] }}\r\n          </a>\r\n        </p>\r\n      </ng-template>\r\n    </ng-container>\r\n    <p\r\n      *ngSwitchCase="PropertyTypes.Integer"\r\n      [ngClass]="getClass(level, \'content\')"\r\n    >\r\n      {{ profile_obj[property.key] }}\r\n    </p>\r\n    <p\r\n      *ngSwitchCase="PropertyTypes.Boolean"\r\n      [ngClass]="getClass(level, \'content\')"\r\n    >\r\n      {{ profile_obj[property.key] }}\r\n    </p>\r\n    <p\r\n      *ngSwitchCase="PropertyTypes.Mdstring"\r\n      [ngClass]="getClass(level, \'content\')"\r\n      markdown\r\n      [data]="profile_obj[property.key]"\r\n    ></p>\r\n    <ng-container\r\n      *ngSwitchCase="PropertyTypes.Colstring"\r\n      [ngClass]="getClass(level, \'content\')"\r\n    >\r\n      <p\r\n        *ngIf="profile_obj[property.key].indexOf(\'#\') === 0; else notColString"\r\n        id="normal_color"\r\n        [style.background-color]="profile_obj[property.key]"\r\n      ></p>\r\n      <ng-template #notColString>\r\n        <p [ngClass]="getClass(level, \'content\')">\r\n          {{ profile_obj[property.key] }}\r\n        </p>\r\n      </ng-template>\r\n    </ng-container>\r\n    <ng-container *ngSwitchCase="PropertyTypes.List">\r\n      <ng-container\r\n        *ngIf="property.key !== \'mineraltype_compounds\'; else compounds"\r\n      >\r\n        <p\r\n          [ngClass]="getClass(level, \'content\')"\r\n          *ngFor="let val of profile_obj[property.key]"\r\n        >\r\n          {{ val }}\r\n        </p>\r\n      </ng-container>\r\n      <ng-template #compounds>\r\n        <div *ngFor="let val of profile_obj[property.key]">\r\n          <div\r\n            (click)="\r\n              val.id\r\n                ? selectProfile.emit({ id: val.id, type: \'mineraltype\' })\r\n                : \'\'\r\n            "\r\n            class="profileLink"\r\n          >\r\n            {{ val.name }}\r\n            <span *ngIf="val.variety !== \'\'">({{ val.variety }})</span>\r\n            <img *ngIf="val.id" src="assets/icons/icon.svg" />\r\n          </div>\r\n        </div>\r\n      </ng-template>\r\n    </ng-container>\r\n    <ng-container *ngSwitchCase="PropertyTypes.Group">\r\n      <ng-container *ngFor="let childProperty of property.properties">\r\n        <ng-container *ngIf="profile_obj">\r\n          <ng-container\r\n            *ngTemplateOutlet="\r\n              propertyTemplate;\r\n              context: {\r\n                profile_obj: profile_obj[property.key],\r\n                property: childProperty,\r\n                level: level + 1\r\n              }\r\n            "\r\n          ></ng-container>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n  </ng-container>\r\n</ng-template>\r\n',
          styles: [
            'p{padding:0 .7em;margin-bottom:0;font-weight:200;overflow:auto}p.heading{padding:.6em .7em;font-weight:500;margin:.5em 0}p.heading.property-heading-level-3{font-weight:400}p.heading:first-letter{text-transform:uppercase}solid-core-media{margin-top:2px;margin-bottom:2px;height:40vh}.no-img-container{text-align:center}.no-img-container .no-img{height:40vh;width:100%}mat-expansion-panel mat-expansion-panel-header mat-panel-title{display:block;font-weight:500}mat-expansion-panel mat-expansion-panel-header mat-panel-title:first-letter{text-transform:uppercase}mat-expansion-panel mat-expansion-panel-header.mat-expanded{background-color:#f5f5f5}.scroll-container-profile{max-width:100%;height:100px;overflow:auto}div.img-toolbar-profile{margin:10px 0;overflow-y:hidden;overflow-x:auto;display:flex}.scroll-container{width:100%;max-width:100%;overflow:auto}div.img-toolbar{margin:10px 0;overflow-y:hidden;overflow-x:auto;display:flex;flex-direction:row;align-items:center;justify-content:center;min-width:min-content;min-width:-webkit-min-content}div.img-toolbar img:first-child{margin-left:10px}div.img-toolbar img{height:4rem;width:4rem;transition-property:filter;transition-duration:.5s;margin:0 4px;object-fit:cover}div.img-toolbar img.not-selected{cursor:pointer;filter:saturate(0%)}div.img-toolbar img:last-child{margin-right:10px}.facts-title{height:48px;display:flex;flex-direction:row;align-items:center;font-weight:700}.facts-title div{padding-right:24px;padding-left:24px}.facts-body{padding-left:31px;padding-right:31px}#normal_color{width:18px;height:18px;margin-left:7px}mat-tooltip.custom-tooltip{color:pink;font-size:14px!important}div.profileLink{padding:0 .7em;margin-bottom:0;font-weight:200}div.profileLink img{position:relative;top:5px;height:18px;margin-left:2px}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
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
  propDecorators: {
    expansionPanel: [
      {
        type: ViewChild,
        args: ['expansionPanel', { static: false, read: MatExpansionPanel }],
      },
    ],
    thumbnails: [
      {
        type: ViewChild,
        args: ['thumbnails'],
      },
    ],
    $ProfileDefinitions: [],
    $ProfileDefinition_Swagger: [],
    node: [
      {
        type: Input,
      },
    ],
    selectProfile: [
      {
        type: Output,
      },
    ],
    profile: [
      {
        type: Input,
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvcHJvZmlsZS9zcmMvbGliL2NvbXBvbmVudHMvZGV0YWlsL2RldGFpbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3Byb2ZpbGUvc3JjL2xpYi9jb21wb25lbnRzL2RldGFpbC9kZXRhaWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFHWixNQUFNLEVBQ04sTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3JDLE9BQU8sRUFHTCxtQkFBbUIsR0FDcEIsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBRUwsaUJBQWlCLEdBRWxCLE1BQU0seUJBQXlCLENBQUM7Ozs7O0FBT2pDLE1BQU0sT0FBTyxlQUFlO0lBMERvQjtJQXhEOUMsY0FBYyxDQUFxQjtJQUNWLFVBQVUsQ0FBeUI7SUFDckQsYUFBYSxHQUFHLG1CQUFtQixDQUFDO0lBQzNDLG1DQUFtQztJQUVuQyxtQkFBbUIsQ0FBK0I7SUFDbEQsbUNBQW1DO0lBRW5DLDBCQUEwQixDQUErQjtJQUN6QyxJQUFJLENBQVk7SUFDdEIsYUFBYSxHQUFHLElBQUksWUFBWSxFQUV2QyxDQUFDO0lBQ0csV0FBVyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEIsYUFBYSxHQUFH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S0FBSztnQkFDSSxhQUFhO3NCQUF0QixNQUFNO2dCQWtDSSxPQUFPO3NCQURqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3V0cHV0LFxyXG4gIEluamVjdCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUHJvZmlsZSwgVHJlZU5vZGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9wcm9maWxlLm1vZGVsJztcclxuaW1wb3J0IHsgUHJvZmlsZVN0YXRlIH0gZnJvbSAnLi4vLi4vc3RhdGUvcHJvZmlsZS5zdGF0ZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTZWxlY3QgfSBmcm9tICdAbmd4cy9zdG9yZSc7XHJcbmltcG9ydCB7XHJcbiAgTXVsdGlQcm9maWxlcyxcclxuICBQcm9maWxlUHJvcGVydHksXHJcbiAgUHJvZmlsZVByb3BlcnR5VHlwZSxcclxufSBmcm9tICcuLi8uLi9zdGF0ZS9wcm9maWxlLWRlZmluaXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBNYXRFeHBhbnNpb25QYW5lbCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2V4cGFuc2lvbic7XHJcbmltcG9ydCB7XHJcbiAgTWVkaWFNb2RlbCxcclxuICBTT0xJRF9DT1JFX0NPTkZJRyxcclxuICBTb2xpZENvcmVDb25maWcsXHJcbn0gZnJvbSAnQHplbnRydW1uYXdpL3NvbGlkLWNvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzb2xpZC1wcm9maWxlLWRldGFpbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2RldGFpbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZGV0YWlsLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQFZpZXdDaGlsZCgnZXhwYW5zaW9uUGFuZWwnLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IE1hdEV4cGFuc2lvblBhbmVsIH0pXHJcbiAgZXhwYW5zaW9uUGFuZWw/OiBNYXRFeHBhbnNpb25QYW5lbDtcclxuICBAVmlld0NoaWxkKCd0aHVtYm5haWxzJykgdGh1bWJuYWlsczogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcclxuICBwdWJsaWMgUHJvcGVydHlUeXBlcyA9IFByb2ZpbGVQcm9wZXJ0eVR5cGU7XHJcbiAgLy9Mb2FkIGRlZmluaXRpb25zIGZyb20gT3BlbkFQSSAzLjBcclxuICBAU2VsZWN0KFByb2ZpbGVTdGF0ZS5zZWxlY3REZWZpbml0aW9uKVxyXG4gICRQcm9maWxlRGVmaW5pdGlvbnMhOiBPYnNlcnZhYmxlPE11bHRpUHJvZmlsZXNbXT47XHJcbiAgLy9Mb2FkIGRlZmluaXRpb25zIGZyb20gT3BlbkFQSSAyLjBcclxuICBAU2VsZWN0KFByb2ZpbGVTdGF0ZS5zZWxlY3REZWZpbml0aW9uX3N3YWdnZXIpXHJcbiAgJFByb2ZpbGVEZWZpbml0aW9uX1N3YWdnZXIhOiBPYnNlcnZhYmxlPE11bHRpUHJvZmlsZXNbXT47XHJcbiAgQElucHV0KCkgcHVibGljIG5vZGUhOiBUcmVlTm9kZTtcclxuICBAT3V0cHV0KCkgc2VsZWN0UHJvZmlsZSA9IG5ldyBFdmVudEVtaXR0ZXI8XHJcbiAgICBudW1iZXIgfCB7IGlkOiBudW1iZXI7IHR5cGU6IHN0cmluZyB9XHJcbiAgPigpO1xyXG4gIHB1YmxpYyBJbWFnZUxvYWRlZCA9IFtmYWxzZV07XHJcbiAgcHVibGljIEltYWdlU2VsZWN0ZWQgPSAwO1xyXG4gIHB1YmxpYyBJbWFnZUluZGV4ID0gMDtcclxuICBwdWJsaWMgSW1hZ2VFbmRJbmRleCA9IDA7XHJcbiAgU1dJUEVfQUNUSU9OID0geyBMRUZUOiAnc3dpcGVsZWZ0JywgUklHSFQ6ICdzd2lwZXJpZ2h0JyB9O1xyXG4gIHB1YmxpYyBoYXNEaWFsb2chOiBib29sZWFuO1xyXG4gIHByaXZhdGUgX3Byb2ZpbGUhOiBQcm9maWxlO1xyXG4gIHB1YmxpYyBoYXNEZXNjcmlwdGlvbiE6IGJvb2xlYW47XHJcbiAgcHVibGljIGhhc0Rlc2NyaXB0aW9uVG9nZ2xlID0gZmFsc2U7XHJcbiAgcHVibGljIE1lZGlhT2JqZWN0c09ubHlJbWFnZXMhOiBNZWRpYU1vZGVsW107XHJcblxyXG4gIHB1YmxpYyBkZWZpbml0aW9uczogTXVsdGlQcm9maWxlc1tdID0gW107XHJcbiAgcHVibGljIGRlZmluaXRpb25zX3N3YWdnZXI6IE11bHRpUHJvZmlsZXNbXSA9IFtdO1xyXG5cclxuICBwdWJsaWMgcHJvZmlsZURlZmluaXRpb25TdWIhOiBTdWJzY3JpcHRpb247XHJcbiAgcHVibGljIHByb2ZpbGVEZWZpbml0aW9uU3dhZ2dlclN1YiE6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLy9wdWJsaWMgc2hvdWxkRXhwYW5kQWxsZ2VtZWluID0gdGhpcy5jb25maWcuZXhwYW5kQWxsZ2VtZWluO1xyXG4gIHB1YmxpYyBzaG91bGRFeHBhbmRBbGxnZW1laW4hOiBib29sZWFuO1xyXG5cclxuICBwdWJsaWMgc2hvdWxkRXhwYW5kQ2F0ZWdvcmllcyA9IFtcclxuICAgICdhbGxnZW1laW4nLFxyXG4gICAgJ2luZm9ybWF0aXZlcycsXHJcbiAgICAnZ2VuZXJhbCBpbmZvcm1hdGlvbicsXHJcbiAgXTtcclxuXHJcbiAgcHVibGljIGdldCBwcm9maWxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Byb2ZpbGU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBzZXQgcHJvZmlsZShwcm9maWxlOiBQcm9maWxlKSB7XHJcbiAgICB0aGlzLl9wcm9maWxlID0gcHJvZmlsZTtcclxuICAgIHRoaXMuSW1hZ2VMb2FkZWQgPSBwcm9maWxlLm1lZGlhT2JqZWN0cy5tYXAoKF8pID0+IGZhbHNlKTtcclxuICAgIGlmICh0aGlzLnNob3VsZEV4cGFuZEFsbGdlbWVpbikge1xyXG4gICAgICB0aGlzLmV4cGFuc2lvblBhbmVsPy5vcGVuKCk7IC8vIGV4cGFuZCB0aGUgY2F0ZWdvcnktcGFuZWwgZXZlbiBpZiBpdCB3YXMgY2xvc2VkIGluIG90aGVyIHByb2ZpbGVcclxuICAgIH1cclxuICAgIHRoaXMuTWVkaWFPYmplY3RzT25seUltYWdlcyA9IHRoaXMucHJvZmlsZS5tZWRpYU9iamVjdHMuZmlsdGVyKFxyXG4gICAgICAoeCkgPT4geC5tZWRpYVR5cGUgPT09ICdpbWFnZSdcclxuICAgICk7XHJcbiAgICB0aGlzLm9uSW1hZ2VTZWxlY3QoMCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFNPTElEX0NPUkVfQ09ORklHKSBwdWJsaWMgY29uZmlnOiBTb2xpZENvcmVDb25maWcpIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zaG91bGRFeHBhbmRBbGxnZW1laW4gPSB0aGlzLmNvbmZpZy5leHBhbmRBbGxnZW1laW47XHJcbiAgICB0aGlzLnByb2ZpbGVEZWZpbml0aW9uU3dhZ2dlclN1YiA9XHJcbiAgICAgIHRoaXMuJFByb2ZpbGVEZWZpbml0aW9uX1N3YWdnZXIuc3Vic2NyaWJlKChkZWZzKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kZWZpbml0aW9uc19zd2FnZ2VyID0gZGVmcztcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5wcm9maWxlRGVmaW5pdGlvblN1YiA9IHRoaXMuJFByb2ZpbGVEZWZpbml0aW9ucy5zdWJzY3JpYmUoKGRlZnMpID0+IHtcclxuICAgICAgdGhpcy5kZWZpbml0aW9ucyA9IGRlZnM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5wcm9maWxlRGVmaW5pdGlvblN3YWdnZXJTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMucHJvZmlsZURlZmluaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQcm9wZXJ0aWVzKHByb2ZpbGU6IFByb2ZpbGUpIHtcclxuICAgIGNvbnN0IGdlbmVyYWxJbmZvS2V5ID0gJ2dlbmVyYWxfaW5mb3JtYXRpb24nO1xyXG5cclxuICAgIGNvbnN0IGRlZl9wcm9wZXJ0eSA9IHRoaXMuZGVmaW5pdGlvbnMuZmlsdGVyKFxyXG4gICAgICAoZGVmKSA9PiBkZWYubmFtZSA9PT0gcHJvZmlsZS5kZWZfdHlwZVxyXG4gICAgKVswXS5wcm9wZXJ0aWVzO1xyXG5cclxuICAgIGNvbnN0IGdlbmVyYWxJbmZvID0gZGVmX3Byb3BlcnR5LmZpbmQoXHJcbiAgICAgIChwcm9wKSA9PiBwcm9wLmtleSA9PT0gZ2VuZXJhbEluZm9LZXlcclxuICAgICk7XHJcblxyXG4gICAgaWYgKGdlbmVyYWxJbmZvKSB7XHJcbiAgICAgIGNvbnN0IGZpbHRlcl9kZWYgPSBkZWZfcHJvcGVydHkuZmlsdGVyKFxyXG4gICAgICAgIChwcm9wKSA9PiBwcm9wLmtleSAhPT0gZ2VuZXJhbEluZm9LZXlcclxuICAgICAgKTtcclxuICAgICAgZmlsdGVyX2RlZi51bnNoaWZ0KGdlbmVyYWxJbmZvKTtcclxuICAgICAgcmV0dXJuIGZpbHRlcl9kZWY7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZGVmX3Byb3BlcnR5O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uSW1hZ2VMb2FkZWQoaW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5JbWFnZUxvYWRlZFtpbmRleF0gPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uSW1hZ2VTZWxlY3QoaW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5JbWFnZVNlbGVjdGVkID0gaW5kZXg7XHJcbiAgICB0aGlzLkltYWdlSW5kZXggPSB0aGlzLk1lZGlhT2JqZWN0c09ubHlJbWFnZXMuZmluZEluZGV4KFxyXG4gICAgICAobWVkaWEpID0+IG1lZGlhLmdldFByb2ZpbGVQb3NpdGlvbiAtIDEgPT09IGluZGV4XHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMucHJvZmlsZS5tZWRpYU9iamVjdHMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIGlmICh0aGlzLnByb2ZpbGUubWVkaWFPYmplY3RzW2luZGV4XS5tZWRpYVR5cGUgPT09ICdhdWRpbycpIHtcclxuICAgICAgICB0aGlzLmhhc0RpYWxvZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaGFzRGVzY3JpcHRpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhhc0Rlc2NyaXB0aW9uVG9nZ2xlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb2ZpbGUubWVkaWFPYmplY3RzW2luZGV4XS5tZWRpYVR5cGUgPT09ICd2aWRlbycpIHtcclxuICAgICAgICB0aGlzLmhhc0RpYWxvZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaGFzRGVzY3JpcHRpb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaGFzRGVzY3JpcHRpb25Ub2dnbGUgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmhhc0RpYWxvZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5oYXNEZXNjcmlwdGlvblRvZ2dsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaGFzRGVzY3JpcHRpb24gPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3VsZERpc3BsYXlQcm9wZXJ0eShwcm9wZXJ0eTogUHJvZmlsZVByb3BlcnR5LCBwcm9maWxlX29iajogYW55KSB7XHJcbiAgICBpZiAocHJvcGVydHkucmVxdWlyZWQpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2YWwgPVxyXG4gICAgICBwcm9maWxlX29iaiAhPT0gbnVsbCAmJlxyXG4gICAgICBwcm9maWxlX29iaiAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIHByb3BlcnR5LmtleSBpbiBwcm9maWxlX29ialxyXG4gICAgICAgID8gcHJvZmlsZV9vYmpbcHJvcGVydHkua2V5XVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgc3dpdGNoIChwcm9wZXJ0eS50eXBlKSB7XHJcbiAgICAgIGNhc2UgUHJvZmlsZVByb3BlcnR5VHlwZS5MaXN0OlxyXG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgJiYgdmFsLmxlbmd0aCA+IDA7XHJcbiAgICAgIGNhc2UgUHJvZmlsZVByb3BlcnR5VHlwZS5Hcm91cDpcclxuICAgICAgY2FzZSBQcm9maWxlUHJvcGVydHlUeXBlLlN0cmluZzpcclxuICAgICAgY2FzZSBQcm9maWxlUHJvcGVydHlUeXBlLkludGVnZXI6XHJcbiAgICAgIGNhc2UgUHJvZmlsZVByb3BlcnR5VHlwZS5Cb29sZWFuOlxyXG4gICAgICBjYXNlIFByb2ZpbGVQcm9wZXJ0eVR5cGUuTWRzdHJpbmc6XHJcbiAgICAgIGNhc2UgUHJvZmlsZVByb3BlcnR5VHlwZS5Db2xzdHJpbmc6XHJcbiAgICAgICAgcmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkICYmIHZhbCAhPT0gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3dpcGUoY3VycmVudEluZGV4OiBudW1iZXIsIGFjdGlvbjogc3RyaW5nID0gdGhpcy5TV0lQRV9BQ1RJT04uUklHSFQpIHtcclxuICAgIGlmIChjdXJyZW50SW5kZXggPiB0aGlzLnByb2ZpbGUubWVkaWFPYmplY3RzLmxlbmd0aCB8fCBjdXJyZW50SW5kZXggPCAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChhY3Rpb24gPT09IHRoaXMuU1dJUEVfQUNUSU9OLkxFRlQpIHtcclxuICAgICAgY29uc3QgaXNMYXN0ID0gY3VycmVudEluZGV4ID09PSB0aGlzLnByb2ZpbGUubWVkaWFPYmplY3RzLmxlbmd0aCAtIDE7XHJcbiAgICAgIHRoaXMuSW1hZ2VTZWxlY3RlZCA9IGlzTGFzdCA/IDAgOiBjdXJyZW50SW5kZXggKyAxO1xyXG4gICAgfVxyXG4gICAgaWYgKGFjdGlvbiA9PT0gdGhpcy5TV0lQRV9BQ1RJT04uUklHSFQpIHtcclxuICAgICAgY29uc3QgaXNGaXJzdCA9IGN1cnJlbnRJbmRleCA9PT0gMDtcclxuICAgICAgdGhpcy5JbWFnZVNlbGVjdGVkID0gaXNGaXJzdFxyXG4gICAgICAgID8gdGhpcy5wcm9maWxlLm1lZGlhT2JqZWN0cy5sZW5ndGggLSAxXHJcbiAgICAgICAgOiBjdXJyZW50SW5kZXggLSAxO1xyXG4gICAgfVxyXG4gICAgdGhpcy50aHVtYm5haWxzPy5uYXRpdmVFbGVtZW50LmNoaWxkcmVuW3RoaXMuSW1hZ2VTZWxlY3RlZF0uc2Nyb2xsSW50b1ZpZXcoe1xyXG4gICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXHJcbiAgICAgIGJsb2NrOiAnbmVhcmVzdCcsXHJcbiAgICB9KTtcclxuICB9XHJcbiAgaGFuZGxlTmV4dERpYWxvZ0V2ZW50KCkge1xyXG4gICAgaWYgKHRoaXMuSW1hZ2VJbmRleCA8IHRoaXMuTWVkaWFPYmplY3RzT25seUltYWdlcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMuSW1hZ2VJbmRleCsrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5JbWFnZUluZGV4ID0gMDtcclxuICAgIH1cclxuICAgIHRoaXMuSW1hZ2VTZWxlY3RlZCA9XHJcbiAgICAgIHRoaXMuTWVkaWFPYmplY3RzT25seUltYWdlc1t0aGlzLkltYWdlSW5kZXhdLmdldFByb2ZpbGVQb3NpdGlvbiAtIDE7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVQcmV2RGlhbG9nRXZlbnQoKSB7XHJcbiAgICBpZiAodGhpcy5JbWFnZUluZGV4ID4gMCkge1xyXG4gICAgICB0aGlzLkltYWdlSW5kZXgtLTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuSW1hZ2VJbmRleCA9IHRoaXMuTWVkaWFPYmplY3RzT25seUltYWdlcy5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG4gICAgdGhpcy5JbWFnZVNlbGVjdGVkID1cclxuICAgICAgdGhpcy5NZWRpYU9iamVjdHNPbmx5SW1hZ2VzW3RoaXMuSW1hZ2VJbmRleF0uZ2V0UHJvZmlsZVBvc2l0aW9uIC0gMTtcclxuICB9XHJcblxyXG4gIGdldENsYXNzKGxldmVsOiBudW1iZXIsIHR5cGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYHByb3BlcnR5LSR7dHlwZX0tbGV2ZWwtJHtsZXZlbH1gO1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkRXhwYW5kKHRpdGxlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMuc2hvdWxkRXhwYW5kQWxsZ2VtZWluICYmXHJcbiAgICAgIHRoaXMuc2hvdWxkRXhwYW5kQ2F0ZWdvcmllcy5pbmNsdWRlcyh0aXRsZS50b0xvY2FsZUxvd2VyQ2FzZSgpKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiPG5nLWNvbnRhaW5lcj5cclxuICA8ZGl2IGlkPVwicHJvZmlsZS1zaG9ydC1kZXNjcmlwdGlvblwiICpuZ0lmPVwicHJvZmlsZS5zaG9ydF9kZXNjcmlwdGlvblwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImZhY3RzLXRpdGxlXCI+XHJcbiAgICAgIDxkaXY+S3VyemJlc2NocmVpYnVuZzwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8cCBjbGFzcz1cImZhY3RzLWJvZHlcIiBtYXJrZG93biBbZGF0YV09XCJwcm9maWxlLnNob3J0X2Rlc2NyaXB0aW9uXCI+PC9wPlxyXG4gIDwvZGl2PlxyXG4gIDxzb2xpZC1jb3JlLW1lZGlhXHJcbiAgICAqbmdJZj1cInByb2ZpbGUubWVkaWFPYmplY3RzLmxlbmd0aCA+IDA7IGVsc2Ugbm9JbWFnZVwiXHJcbiAgICBpZD1cInByb2ZpbGUtbWVkaWEtY29udGFpbmVyXCJcclxuICAgIChzd2lwZWxlZnQpPVwic3dpcGUoSW1hZ2VTZWxlY3RlZCwgJGV2ZW50LnR5cGUpXCJcclxuICAgIChzd2lwZXJpZ2h0KT1cInN3aXBlKEltYWdlU2VsZWN0ZWQsICRldmVudC50eXBlKVwiXHJcbiAgICBbbWVkaWFPYmplY3RdPVwicHJvZmlsZS5tZWRpYU9iamVjdHNbSW1hZ2VTZWxlY3RlZF1cIlxyXG4gICAgW25hbWVdPVwicHJvZmlsZS5uYW1lXCJcclxuICAgIFtoYXNEaWFsb2ddPVwiaGFzRGlhbG9nXCJcclxuICAgIFtoYXNEZXNjcmlwdGlvbl09XCJoYXNEZXNjcmlwdGlvblwiXHJcbiAgICBbaGFzRGVzY3JpcHRpb25Ub2dnbGVdPVwiaGFzRGVzY3JpcHRpb25Ub2dnbGVcIlxyXG4gICAgKE5leHREaWFsb2dFbWl0dGVyKT1cImhhbmRsZU5leHREaWFsb2dFdmVudCgpXCJcclxuICAgIChQcmV2RGlhbG9nRW1pdHRlcik9XCJoYW5kbGVQcmV2RGlhbG9nRXZlbnQoKVwiXHJcbiAgICBbaGFzTmF2aWdhdGlvbkluRGlhbG9nXT1cIk1lZGlhT2JqZWN0c09ubHlJbWFnZXMubGVuZ3RoID4gMVwiXHJcbiAgPjwvc29saWQtY29yZS1tZWRpYT5cclxuICA8bmctdGVtcGxhdGUgI25vSW1hZ2U+XHJcbiAgICA8ZGl2IGNsYXNzPVwibm8taW1nLWNvbnRhaW5lclwiIGlkPVwicHJvZmlsZS1tZWRpYS1jb250YWluZXJcIj5cclxuICAgICAgPGltZyBjbGFzcz1cIm5vLWltZ1wiIHNyYz1cImFzc2V0cy9wcm9maWxlL25vX2ltYWdlLnN2Z1wiIC8+XHJcbiAgICA8L2Rpdj5cclxuICA8L25nLXRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJzY3JvbGwtY29udGFpbmVyXCI+XHJcbiAgICA8ZGl2XHJcbiAgICAgICpuZ0lmPVwicHJvZmlsZS5tZWRpYU9iamVjdHMubGVuZ3RoID4gMVwiXHJcbiAgICAgIGNsYXNzPVwiaW1nLXRvb2xiYXJcIlxyXG4gICAgICAjdGh1bWJuYWlsc1xyXG4gICAgPlxyXG4gICAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICAgKm5nRm9yPVwibGV0IG1lZGlhT2JqZWN0IG9mIHByb2ZpbGUubWVkaWFPYmplY3RzOyBsZXQgaSA9IGluZGV4XCJcclxuICAgICAgPlxyXG4gICAgICAgIDxpbWdcclxuICAgICAgICAgICpuZ0lmPVwibWVkaWFPYmplY3QubWVkaWFUeXBlID09PSAnaW1hZ2UnXCJcclxuICAgICAgICAgIChjbGljayk9XCJvbkltYWdlU2VsZWN0KGkpXCJcclxuICAgICAgICAgIFtjbGFzcy5ub3Qtc2VsZWN0ZWRdPVwiSW1hZ2VTZWxlY3RlZCAhPT0gaVwiXHJcbiAgICAgICAgICBbc3JjXT1cIm1lZGlhT2JqZWN0LmdldFJhd0ltYWdlKCd0aHVtYm5haWwnKVwiXHJcbiAgICAgICAgICBbYWx0XT1cIm1lZGlhT2JqZWN0LmFsdFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8aW1nXHJcbiAgICAgICAgICAqbmdJZj1cIm1lZGlhT2JqZWN0Lm1lZGlhVHlwZSA9PT0gJ3ZpZGVvJ1wiXHJcbiAgICAgICAgICAoY2xpY2spPVwib25JbWFnZVNlbGVjdChpKVwiXHJcbiAgICAgICAgICBbY2xhc3Mubm90LXNlbGVjdGVkXT1cIkltYWdlU2VsZWN0ZWQgIT09IGlcIlxyXG4gICAgICAgICAgW3NyY109XCInYXNzZXRzL3Byb2ZpbGUvdmlkZW8uc3ZnJ1wiXHJcbiAgICAgICAgICBbYWx0XT1cIm1lZGlhT2JqZWN0LmFsdFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgICA8aW1nXHJcbiAgICAgICAgICAqbmdJZj1cIm1lZGlhT2JqZWN0Lm1lZGlhVHlwZSA9PT0gJ2F1ZGlvJ1wiXHJcbiAgICAgICAgICAoY2xpY2spPVwib25JbWFnZVNlbGVjdChpKVwiXHJcbiAgICAgICAgICBbY2xhc3Mubm90LXNlbGVjdGVkXT1cIkltYWdlU2VsZWN0ZWQgIT09IGlcIlxyXG4gICAgICAgICAgW3NyY109XCInYXNzZXRzL3Byb2ZpbGUvYXVkaW8uc3ZnJ1wiXHJcbiAgICAgICAgICBbYWx0XT1cIm1lZGlhT2JqZWN0LmFsdFwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9uZy1jb250YWluZXI+XHJcblxyXG48IS0tIExvYWQgZGVmaW5pdGlvbnMgZnJvbSBPcGVuQVBJIDIuMCAtLT5cclxuPG5nLWNvbnRhaW5lciAqbmdJZj1cImRlZmluaXRpb25zX3N3YWdnZXIubGVuZ3RoICE9PSAwXCI+XHJcbiAgPG1hdC1hY2NvcmRpb24gaWQ9XCJwcm9maWxlLWRldGFpbC1pbmZvXCIgbXVsdGk9XCJmYWxzZVwiIGRpc3BsYXlNb2RlPVwiZmxhdFwiPlxyXG4gICAgPG1hdC1leHBhbnNpb24tcGFuZWw+XHJcbiAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cclxuICAgICAgICA8bWF0LXBhbmVsLXRpdGxlPkFsbGdlbWVpbjwvbWF0LXBhbmVsLXRpdGxlPlxyXG4gICAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBwcm9wZXJ0eSBvZiBnZXRQcm9wZXJ0aWVzKHByb2ZpbGUpXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInByb3BlcnR5LnR5cGUgIT09IFByb3BlcnR5VHlwZXMuR3JvdXBcIj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcclxuICAgICAgICAgICAgICBwcm9wZXJ0eVRlbXBsYXRlX3N3YWdnZXI7XHJcbiAgICAgICAgICAgICAgY29udGV4dDogeyBwcm9maWxlX29iajogcHJvZmlsZSwgcHJvcGVydHk6IHByb3BlcnR5IH1cclxuICAgICAgICAgICAgXCJcclxuICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L21hdC1leHBhbnNpb24tcGFuZWw+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBwcm9wZXJ0eSBvZiBnZXRQcm9wZXJ0aWVzKHByb2ZpbGUpXCI+XHJcbiAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsXHJcbiAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgIHByb3BlcnR5LnR5cGUgPT09IFByb3BlcnR5VHlwZXMuR3JvdXAgJiZcclxuICAgICAgICAgIChwcm9wZXJ0eS5yZXF1aXJlZCB8fCBwcm9maWxlW3Byb3BlcnR5LmtleV0pXHJcbiAgICAgICAgXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cclxuICAgICAgICAgIDxtYXQtcGFuZWwtdGl0bGU+e3tcclxuICAgICAgICAgICAgcHJvcGVydHkudGl0bGUgPyBwcm9wZXJ0eS50aXRsZSA6IHByb3BlcnR5LmtleVxyXG4gICAgICAgICAgfX08L21hdC1wYW5lbC10aXRsZT5cclxuICAgICAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkUHJvcGVydHkgb2YgcHJvcGVydHkucHJvcGVydGllc1wiPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxyXG4gICAgICAgICAgICAgIHByb3BlcnR5VGVtcGxhdGVfc3dhZ2dlcjtcclxuICAgICAgICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlX29iajogcHJvZmlsZVtwcm9wZXJ0eS5rZXldLFxyXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6IGNoaWxkUHJvcGVydHlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbD5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvbWF0LWFjY29yZGlvbj5cclxuPC9uZy1jb250YWluZXI+XHJcbjxuZy10ZW1wbGF0ZVxyXG4gICNwcm9wZXJ0eVRlbXBsYXRlX3N3YWdnZXJcclxuICBsZXQtcHJvZmlsZV9vYmo9XCJwcm9maWxlX29ialwiXHJcbiAgbGV0LXByb3BlcnR5PVwicHJvcGVydHlcIlxyXG4+XHJcbiAgPG5nLWNvbnRhaW5lclxyXG4gICAgKm5nSWY9XCJzaG91bGREaXNwbGF5UHJvcGVydHkocHJvcGVydHksIHByb2ZpbGVfb2JqKVwiXHJcbiAgICBbbmdTd2l0Y2hdPVwicHJvcGVydHkudHlwZVwiXHJcbiAgPlxyXG4gICAgPHAgY2xhc3M9XCJoZWFkaW5nXCI+e3sgcHJvcGVydHkudGl0bGUgPyBwcm9wZXJ0eS50aXRsZSA6IHByb3BlcnR5LmtleSB9fTwvcD5cclxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIlByb3BlcnR5VHlwZXMuU3RyaW5nXCI+XHJcbiAgICAgIDxwXHJcbiAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgICEocHJvZmlsZV9vYmpbcHJvcGVydHkua2V5XS5pbmRleE9mKCdodHRwJykgPT09IDApO1xyXG4gICAgICAgICAgZWxzZSBodHRwU3RyaW5nXHJcbiAgICAgICAgXCJcclxuICAgICAgPlxyXG4gICAgICAgIHt7IHByb2ZpbGVfb2JqW3Byb3BlcnR5LmtleV0gfX1cclxuICAgICAgPC9wPlxyXG4gICAgICA8bmctdGVtcGxhdGUgI2h0dHBTdHJpbmc+XHJcbiAgICAgICAgPHA+XHJcbiAgICAgICAgICA8YSBbaHJlZl09XCJwcm9maWxlX29ialtwcm9wZXJ0eS5rZXldXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XHJcbiAgICAgICAgICAgIHt7IHByb2ZpbGVfb2JqW3Byb3BlcnR5LmtleV0gfX1cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICA8L3A+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxwICpuZ1N3aXRjaENhc2U9XCJQcm9wZXJ0eVR5cGVzLkludGVnZXJcIj5cclxuICAgICAge3sgcHJvZmlsZV9vYmpbcHJvcGVydHkua2V5XSB9fVxyXG4gICAgPC9wPlxyXG4gICAgPHAgKm5nU3dpdGNoQ2FzZT1cIlByb3BlcnR5VHlwZXMuQm9vbGVhblwiPlxyXG4gICAgICB7eyBwcm9maWxlX29ialtwcm9wZXJ0eS5rZXldIH19XHJcbiAgICA8L3A+XHJcbiAgICA8cFxyXG4gICAgICAqbmdTd2l0Y2hDYXNlPVwiUHJvcGVydHlUeXBlcy5NZHN0cmluZ1wiXHJcbiAgICAgIG1hcmtkb3duXHJcbiAgICAgIFtkYXRhXT1cInByb2ZpbGVfb2JqW3Byb3BlcnR5LmtleV1cIlxyXG4gICAgPjwvcD5cclxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIlByb3BlcnR5VHlwZXMuQ29sc3RyaW5nXCI+XHJcbiAgICAgIDxwXHJcbiAgICAgICAgKm5nSWY9XCJwcm9maWxlX29ialtwcm9wZXJ0eS5rZXldLmluZGV4T2YoJyMnKSA9PT0gMDsgZWxzZSBub3RDb2xTdHJpbmdcIlxyXG4gICAgICAgIGlkPVwibm9ybWFsX2NvbG9yXCJcclxuICAgICAgICBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJwcm9maWxlX29ialtwcm9wZXJ0eS5rZXldXCJcclxuICAgICAgPjwvcD5cclxuICAgICAgPG5nLXRlbXBsYXRlICNub3RDb2xTdHJpbmc+XHJcbiAgICAgICAgPHA+e3sgcHJvZmlsZV9vYmpbcHJvcGVydHkua2V5XSB9fTwvcD5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiUHJvcGVydHlUeXBlcy5MaXN0XCI+XHJcbiAgICAgIDxwICpuZ0Zvcj1cImxldCB2YWwgb2YgcHJvZmlsZV9vYmpbcHJvcGVydHkua2V5XVwiPnt7IHZhbCB9fTwvcD5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG48L25nLXRlbXBsYXRlPlxyXG5cclxuPCEtLSBMb2FkIGRlZmluaXRpb25zIGZyb20gT3BlbkFQSSAzLjAgLS0+XHJcbjxuZy1jb250YWluZXIgKm5nSWY9XCJkZWZpbml0aW9ucy5sZW5ndGggIT09IDBcIj5cclxuICA8bWF0LWFjY29yZGlvbiBpZD1cInByb2ZpbGUtZGV0YWlsLWluZm9cIiBtdWx0aT1cImZhbHNlXCIgZGlzcGxheU1vZGU9XCJmbGF0XCI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBwcm9wZXJ0eSBvZiBnZXRQcm9wZXJ0aWVzKHByb2ZpbGUpXCI+XHJcbiAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsXHJcbiAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgIHByb3BlcnR5LnR5cGUgPT09IFByb3BlcnR5VHlwZXMuR3JvdXAgJiZcclxuICAgICAgICAgIChwcm9wZXJ0eS5yZXF1aXJlZCB8fCBwcm9maWxlW3Byb3BlcnR5LmtleV0pXHJcbiAgICAgICAgXCJcclxuICAgICAgICBbZXhwYW5kZWRdPVwic2hvdWxkRXhwYW5kKHByb3BlcnR5LnRpdGxlKVwiXHJcbiAgICAgICAgI2V4cGFuc2lvblBhbmVsXHJcbiAgICAgID5cclxuICAgICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XHJcbiAgICAgICAgICA8bWF0LXBhbmVsLXRpdGxlPnt7XHJcbiAgICAgICAgICAgIHByb3BlcnR5LnRpdGxlID8gcHJvcGVydHkudGl0bGUgOiBwcm9wZXJ0eS5rZXlcclxuICAgICAgICAgIH19PC9tYXQtcGFuZWwtdGl0bGU+XHJcbiAgICAgICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaGlsZFByb3BlcnR5IG9mIHByb3BlcnR5LnByb3BlcnRpZXNcIj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcclxuICAgICAgICAgICAgICBwcm9wZXJ0eVRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVfb2JqOiBwcm9maWxlW3Byb3BlcnR5LmtleV0sXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogY2hpbGRQcm9wZXJ0eSxcclxuICAgICAgICAgICAgICAgIGxldmVsOiAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcIlxyXG4gICAgICAgICAgPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L21hdC1leHBhbnNpb24tcGFuZWw+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICA8L21hdC1hY2NvcmRpb24+XHJcbjwvbmctY29udGFpbmVyPlxyXG48bmctdGVtcGxhdGVcclxuICAjcHJvcGVydHlUZW1wbGF0ZVxyXG4gIGxldC1wcm9maWxlX29iaj1cInByb2ZpbGVfb2JqXCJcclxuICBsZXQtcHJvcGVydHk9XCJwcm9wZXJ0eVwiXHJcbiAgbGV0LWxldmVsPVwibGV2ZWxcIlxyXG4+XHJcbiAgPG5nLWNvbnRhaW5lclxyXG4gICAgKm5nSWY9XCJzaG91bGREaXNwbGF5UHJvcGVydHkocHJvcGVydHksIHByb2ZpbGVfb2JqKVwiXHJcbiAgICBbbmdTd2l0Y2hdPVwicHJvcGVydHkudHlwZVwiXHJcbiAgPlxyXG4gICAgPHAgY2xhc3M9XCJoZWFkaW5nXCIgW25nQ2xhc3NdPVwiZ2V0Q2xhc3MobGV2ZWwsICdoZWFkaW5nJylcIj5cclxuICAgICAge3sgcHJvcGVydHkudGl0bGUgPyBwcm9wZXJ0eS50aXRsZSA6IHByb3BlcnR5LmtleSB9fVxyXG4gICAgPC9wPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiUHJvcGVydHlUeXBlcy5TdHJpbmdcIj5cclxuICAgICAgPHBcclxuICAgICAgICAqbmdJZj1cIlxyXG4gICAgICAgICAgIShwcm9maWxlX29ialtwcm9wZXJ0eS5rZXldPy5pbmRleE9mKCdodHRwJykgPT09IDApO1xyXG4gICAgICAgICAgZWxzZSBodHRwU3RyaW5nXHJcbiAgICAgICAgXCJcclxuICAgICAgICBbbmdDbGFzc109XCJnZXRDbGFzcyhsZXZlbCwgJ2NvbnRlbnQnKVwiXHJcbiAgICAgID5cclxuICAgICAgICB7eyBwcm9maWxlX29ialtwcm9wZXJ0eS5rZXldIH19XHJcbiAgICAgIDwvcD5cclxuICAgICAgPG5nLXRlbXBsYXRlICNodHRwU3RyaW5nPlxyXG4gICAgICAgIDxwIFtuZ0NsYXNzXT1cImdldENsYXNzKGxldmVsLCAnY29udGVudCcpXCI+XHJcbiAgICAgICAgICA8YSBbaHJlZl09XCJwcm9maWxlX29ialtwcm9wZXJ0eS5rZXldXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XHJcbiAgICAgICAgICAgIHt7IHByb2ZpbGVfb2JqW3Byb3BlcnR5LmtleV0gfX1cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICA8L3A+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxwXHJcbiAgICAgICpuZ1N3aXRjaENhc2U9XCJQcm9wZXJ0eVR5cGVzLkludGVnZXJcIlxyXG4gICAgICBbbmdDbGFzc109XCJnZXRDbGFzcyhsZXZlbCwgJ2NvbnRlbnQnKVwiXHJcbiAgICA+XHJcbiAgICAgIHt7IHByb2ZpbGVfb2JqW3Byb3BlcnR5LmtleV0gfX1cclxuICAgIDwvcD5cclxuICAgIDxwXHJcbiAgICAgICpuZ1N3aXRjaENhc2U9XCJQcm9wZXJ0eVR5cGVzLkJvb2xlYW5cIlxyXG4gICAgICBbbmdDbGFzc109XCJnZXRDbGFzcyhsZXZlbCwgJ2NvbnRlbnQnKVwiXHJcbiAgICA+XHJcbiAgICAgIHt7IHByb2ZpbGVfb2JqW3Byb3BlcnR5LmtleV0gfX1cclxuICAgIDwvcD5cclxuICAgIDxwXHJcbiAgICAgICpuZ1N3aXRjaENhc2U9XCJQcm9wZXJ0eVR5cGVzLk1kc3RyaW5nXCJcclxuICAgICAgW25nQ2xhc3NdPVwiZ2V0Q2xhc3MobGV2ZWwsICdjb250ZW50JylcIlxyXG4gICAgICBtYXJrZG93blxyXG4gICAgICBbZGF0YV09XCJwcm9maWxlX29ialtwcm9wZXJ0eS5rZXldXCJcclxuICAgID48L3A+XHJcbiAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICpuZ1N3aXRjaENhc2U9XCJQcm9wZXJ0eVR5cGVzLkNvbHN0cmluZ1wiXHJcbiAgICAgIFtuZ0NsYXNzXT1cImdldENsYXNzKGxldmVsLCAnY29udGVudCcpXCJcclxuICAgID5cclxuICAgICAgPHBcclxuICAgICAgICAqbmdJZj1cInByb2ZpbGVfb2JqW3Byb3BlcnR5LmtleV0uaW5kZXhPZignIycpID09PSAwOyBlbHNlIG5vdENvbFN0cmluZ1wiXHJcbiAgICAgICAgaWQ9XCJub3JtYWxfY29sb3JcIlxyXG4gICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cInByb2ZpbGVfb2JqW3Byb3BlcnR5LmtleV1cIlxyXG4gICAgICA+PC9wPlxyXG4gICAgICA8bmctdGVtcGxhdGUgI25vdENvbFN0cmluZz5cclxuICAgICAgICA8cCBbbmdDbGFzc109XCJnZXRDbGFzcyhsZXZlbCwgJ2NvbnRlbnQnKVwiPlxyXG4gICAgICAgICAge3sgcHJvZmlsZV9vYmpbcHJvcGVydHkua2V5XSB9fVxyXG4gICAgICAgIDwvcD5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiUHJvcGVydHlUeXBlcy5MaXN0XCI+XHJcbiAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAqbmdJZj1cInByb3BlcnR5LmtleSAhPT0gJ21pbmVyYWx0eXBlX2NvbXBvdW5kcyc7IGVsc2UgY29tcG91bmRzXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxwXHJcbiAgICAgICAgICBbbmdDbGFzc109XCJnZXRDbGFzcyhsZXZlbCwgJ2NvbnRlbnQnKVwiXHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgdmFsIG9mIHByb2ZpbGVfb2JqW3Byb3BlcnR5LmtleV1cIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIHt7IHZhbCB9fVxyXG4gICAgICAgIDwvcD5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDxuZy10ZW1wbGF0ZSAjY29tcG91bmRzPlxyXG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHZhbCBvZiBwcm9maWxlX29ialtwcm9wZXJ0eS5rZXldXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIChjbGljayk9XCJcclxuICAgICAgICAgICAgICB2YWwuaWRcclxuICAgICAgICAgICAgICAgID8gc2VsZWN0UHJvZmlsZS5lbWl0KHsgaWQ6IHZhbC5pZCwgdHlwZTogJ21pbmVyYWx0eXBlJyB9KVxyXG4gICAgICAgICAgICAgICAgOiAnJ1xyXG4gICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICBjbGFzcz1cInByb2ZpbGVMaW5rXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3sgdmFsLm5hbWUgfX1cclxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ2YWwudmFyaWV0eSAhPT0gJydcIj4oe3sgdmFsLnZhcmlldHkgfX0pPC9zcGFuPlxyXG4gICAgICAgICAgICA8aW1nICpuZ0lmPVwidmFsLmlkXCIgc3JjPVwiYXNzZXRzL2ljb25zL2ljb24uc3ZnXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCJQcm9wZXJ0eVR5cGVzLkdyb3VwXCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkUHJvcGVydHkgb2YgcHJvcGVydHkucHJvcGVydGllc1wiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJwcm9maWxlX29ialwiPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxyXG4gICAgICAgICAgICAgIHByb3BlcnR5VGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgY29udGV4dDoge1xyXG4gICAgICAgICAgICAgICAgcHJvZmlsZV9vYmo6IHByb2ZpbGVfb2JqW3Byb3BlcnR5LmtleV0sXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogY2hpbGRQcm9wZXJ0eSxcclxuICAgICAgICAgICAgICAgIGxldmVsOiBsZXZlbCArIDFcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==
