import * as i0 from '@angular/core';
import {
  Directive,
  EventEmitter,
  ElementRef,
  Component,
  Inject,
  ViewChildren,
  Input,
  Output,
  ViewChild,
  Injectable,
  InjectionToken,
  HostListener,
  NgModule,
} from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import * as i7 from '@angular/material/tree';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
  MatTreeModule,
} from '@angular/material/tree';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import * as i1 from '@ngxs/store';
import { Action, Selector, State, Select, NgxsModule } from '@ngxs/store';
import * as i3 from '@angular/router';
import { UrlSegment, RouterModule } from '@angular/router';
import * as i2 from '@zentrumnawi/solid-core';
import {
  SOLID_CORE_CONFIG,
  MediaModel,
  SolidCoreModule,
} from '@zentrumnawi/solid-core';
import * as i1$1 from '@angular/common';
import * as i5 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i1$2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i3$1 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import * as i1$3 from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import * as i3$2 from '@angular/material/expansion';
import {
  MatExpansionPanel,
  MatExpansionModule,
} from '@angular/material/expansion';
import * as i5$1 from '@angular/forms';
import { UntypedFormControl } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import introJs from 'intro.js';
import * as i7$1 from '@angular/cdk/scrolling';
import * as i9 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i11 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i12 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i13 from '@angular/material/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import * as i14 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import * as i2$1 from '@angular/platform-browser';

class SelectedDirective {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SelectedDirective,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive,
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: SelectedDirective,
    selector: '[solidProfileSelected]',
    ngImport: i0,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SelectedDirective,
  decorators: [
    {
      type: Directive,
      args: [{ selector: '[solidProfileSelected]' }],
    },
  ],
});

class TreeComponent {
  _store;
  _route;
  coreConfig;
  selectedElements;
  selectedProfileId;
  selectedProfileType;
  profiles;
  selectProfile = new EventEmitter();
  selectProfileTitle = new EventEmitter();
  isDiveApp = false;
  collapseTree = false;
  profileTree;
  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  DataSource;
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  TreeControl;
  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  _treeFlattener;
  _selectedNode = null;
  constructor(_store, _route, coreConfig) {
    this._store = _store;
    this._route = _route;
    this.coreConfig = coreConfig;
    this._treeFlattener = new MatTreeFlattener(
      TreeComponent.transformer,
      TreeComponent.getLevel,
      TreeComponent.isExpandable,
      (node) => TreeComponent.getChildren(node)
    );
    this.TreeControl = new FlatTreeControl(
      TreeComponent.getLevel,
      TreeComponent.isExpandable
    );
    this.DataSource = new MatTreeFlatDataSource(
      this.TreeControl,
      this._treeFlattener
    );
  }
  /** Transform the data to something the tree can read. */
  static transformer(node, level) {
    if (node.type === 'category') {
      return {
        title: node.name,
        type: 'category',
        info: node.info,
        level: level,
        expandable: true,
      };
    } else {
      return {
        title: node.name,
        subtitle: node.sub_name,
        id: node.id,
        type: 'entry',
        level: level,
        expandable: false,
        mediaObjects: node.mediaObjects,
        def_type: node.def_type,
      };
    }
  }
  /** Get the level of the node */
  static getLevel(node) {
    return node.level;
  }
  /** Get whether the node is expanded or not. */
  static isExpandable(node) {
    return node.expandable;
  }
  /** Get the children for the node. */
  static getChildren(node) {
    if (node.type === 'category') {
      return [...node.children, ...node.profiles];
    } else {
      return null;
    }
  }
  ngOnInit() {
    this.profiles.subscribe((profiles) => {
      this.DataSource.data = profiles;
      this.expandSelectedNode();
      if (this.coreConfig.expandProfileTree) this.TreeControl.expandAll();
    });
  }
  ngAfterViewInit() {
    this.selectedElements.changes.subscribe((_) => this.scrollTo());
  }
  ngOnChanges(changes) {
    this.expandSelectedNode();
    if (this.collapseTree) this.TreeControl.collapseAll();
  }
  /** Get whether the node has children or not. */
  hasChild(index, node) {
    return node.expandable;
  }
  hasNoChild(index, node) {
    return !node.expandable;
  }
  onNodeClick(node) {
    if (this.TreeControl.isExpanded(node)) {
      this.TreeControl.collapse(node);
      this._selectedNode = null;
    } else {
      if (this._selectedNode) {
        const children = this.TreeControl.getDescendants(this._selectedNode);
        if (
          !children ||
          (Array.isArray(children) && !children.includes(node))
        ) {
          this.TreeControl.collapse(this._selectedNode);
          for (const dataNode of this.TreeControl.dataNodes) {
            const c = this.TreeControl.getDescendants(dataNode);
            if (
              c &&
              Array.isArray(c) &&
              c.includes(this._selectedNode) &&
              !c.includes(node)
            ) {
              this.TreeControl.collapse(dataNode);
            }
          }
        }
      }
      this.TreeControl.expand(node);
      this._selectedNode = node;
    }
  }
  expandSelectedNode() {
    if (this.TreeControl.dataNodes) {
      this.TreeControl.dataNodes
        .filter((n) => n.type === 'entry')
        .forEach((node) => {
          const profileNode = node;
          if (
            profileNode.id === this.selectedProfileId &&
            profileNode.def_type === this.selectedProfileType
          ) {
            this.expandParents(node);
          }
        });
    }
  }
  expandParents(node) {
    if (node.level === 0) {
      this.TreeControl.expand(node);
      return;
    }
    const startIndex = this.TreeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      if (this.TreeControl.dataNodes[i].level === node.level - 1) {
        this.expandParents(this.TreeControl.dataNodes[i]);
        this.TreeControl.expand(node);
        break;
      }
    }
  }
  scrollTo() {
    setTimeout(() => {
      const card = this.selectedElements.first || null;
      if (!card) {
        return;
      }
      card.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    });
  }
  getClassName(level) {
    return `category level-${level}`;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: TreeComponent,
    deps: [
      { token: i1.Store },
      { token: i3.ActivatedRoute },
      { token: SOLID_CORE_CONFIG },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: TreeComponent,
    selector: 'solid-profile-tree',
    inputs: {
      selectedProfileId: 'selectedProfileId',
      selectedProfileType: 'selectedProfileType',
      profiles: 'profiles',
      isDiveApp: 'isDiveApp',
      collapseTree: 'collapseTree',
    },
    outputs: {
      selectProfile: 'selectProfile',
      selectProfileTitle: 'selectProfileTitle',
    },
    viewQueries: [
      {
        propertyName: 'profileTree',
        first: true,
        predicate: ['profileTree'],
        descendants: true,
      },
      {
        propertyName: 'selectedElements',
        predicate: SelectedDirective,
        descendants: true,
        read: ElementRef,
      },
    ],
    usesOnChanges: true,
    ngImport: i0,
    template:
      '<!--suppress AngularInvalidExpressionResultType -->\r\n<mat-tree [dataSource]="DataSource" [treeControl]="TreeControl">\r\n  <mat-tree-node\r\n    (click)="\r\n      selectProfile.emit({ id: node.id, type: node.def_type });\r\n      selectProfileTitle.emit(node.title)\r\n    "\r\n    *matTreeNodeDef="let node; when: hasNoChild"\r\n    class="profile-link"\r\n    matTreeNodePadding\r\n    matTreeNodeToggle\r\n    [matTreeNodePaddingIndent]="30"\r\n  >\r\n    <img\r\n      [alt]="node.title"\r\n      [src]="\r\n        node.mediaObjects.length > 0\r\n          ? node.mediaObjects[0].getRawImage(\'thumbnail\')\r\n          : \'assets/profile/no_thumbnail.svg\'\r\n      "\r\n      class="thumbnail"\r\n    />\r\n    <div class="profile-title">\r\n      <ng-container\r\n        *ngIf="\r\n          selectedProfileId === node.id && selectedProfileType === node.def_type\r\n        "\r\n      >\r\n        <span\r\n          *ngIf="isDiveApp"\r\n          solidProfileSelected\r\n          class="selected"\r\n          [data]="node.title"\r\n          markdown\r\n        ></span>\r\n        <span\r\n          *ngIf="!isDiveApp"\r\n          solidProfileSelected\r\n          class="selected"\r\n          [innerHTML]="node.title"\r\n        ></span>\r\n        <span class="selected">{{ node.subtitle }}</span>\r\n      </ng-container>\r\n      <ng-container\r\n        *ngIf="\r\n          selectedProfileId !== node.id ||\r\n          (selectedProfileId === node.id &&\r\n            selectedProfileType !== node.def_type)\r\n        "\r\n      >\r\n        <span\r\n          *ngIf="isDiveApp"\r\n          class="title-not-selected"\r\n          [data]="node.title"\r\n          markdown\r\n        ></span>\r\n        <span\r\n          *ngIf="!isDiveApp"\r\n          class="title-not-selected"\r\n          [innerHTML]="node.title"\r\n        ></span>\r\n        <span>{{ node.subtitle }}</span>\r\n      </ng-container>\r\n    </div>\r\n  </mat-tree-node>\r\n\r\n  <mat-tree-node\r\n    (click)="onNodeClick(node)"\r\n    *matTreeNodeDef="let node; when: hasChild"\r\n    matTreeNodePadding\r\n    [matTreeNodePaddingIndent]="30"\r\n    #hasChildTreeNode\r\n  >\r\n    <button [attr.aria-label]="\'toggle \' + node.title" mat-icon-button>\r\n      <mat-icon class="mat-icon-rtl-mirror">\r\n        {{ TreeControl.isExpanded(node) ? \'expand_more\' : \'chevron_right\' }}\r\n      </mat-icon>\r\n    </button>\r\n    <div>\r\n      <span [class]="getClassName(hasChildTreeNode.ariaLevel)">{{\r\n        node.title\r\n      }}</span\r\n      ><br />\r\n      <span *ngIf="TreeControl.isExpanded(node) && node.info" class="info">{{\r\n        node.info\r\n      }}</span>\r\n    </div>\r\n  </mat-tree-node>\r\n</mat-tree>\r\n',
    styles: [
      '.type-icon{color:#757575;margin-right:5px}.thumbnail{height:2em;width:2em;border-radius:50%;margin-right:.7em;margin-left:12px}mat-tree.mat-tree{background-color:unset}mat-tree-node{cursor:pointer;padding-right:30px}.profile-tree{grid-area:tree;display:flex;flex-direction:column;height:calc(100vh - 64px);overflow:hidden}.profile-tree mat-tree{flex-grow:1;overflow:auto}.content-container{display:grid;grid-template-areas:"tree profile";grid-template-columns:50% 50%;grid-template-rows:calc(100% - 64px)}.content-container.fullWidth{display:grid;grid-template-areas:"tree" "profile";grid-template-columns:100%}.profile-detail{grid-area:profile;display:flex;flex-direction:column;height:calc(100vh - 64px)}.profile-detail app-profile-detail{flex-grow:1;overflow:auto}div.profile-title{display:flex;flex-direction:column;font-style:italic;font-size:13px}.selected{font-weight:700;font-size:14px}.selected ::ng-deep p{margin-bottom:0}.title-not-selected ::ng-deep p{margin-bottom:0}span.hidden{margin-left:2.5em}.category.level-1{font-size:14px;font-weight:500}.category.level-2{font-size:14px;font-weight:400}.category.level-3{font-size:13px;font-weight:300}.category.level-4{font-size:13px;font-weight:200}.info{font-size:12px;font-style:italic}:host{display:block}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$1.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i2.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: i5.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i1$2.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'directive',
        type: i7.MatTreeNodeDef,
        selector: '[matTreeNodeDef]',
        inputs: ['matTreeNodeDefWhen', 'matTreeNode'],
      },
      {
        kind: 'directive',
        type: i7.MatTreeNodePadding,
        selector: '[matTreeNodePadding]',
        inputs: ['matTreeNodePadding', 'matTreeNodePaddingIndent'],
      },
      {
        kind: 'directive',
        type: i7.MatTreeNodeToggle,
        selector: '[matTreeNodeToggle]',
        inputs: ['matTreeNodeToggleRecursive'],
      },
      {
        kind: 'component',
        type: i7.MatTree,
        selector: 'mat-tree',
        exportAs: ['matTree'],
      },
      {
        kind: 'directive',
        type: i7.MatTreeNode,
        selector: 'mat-tree-node',
        inputs: ['role', 'disabled', 'tabIndex'],
        exportAs: ['matTreeNode'],
      },
      {
        kind: 'directive',
        type: SelectedDirective,
        selector: '[solidProfileSelected]',
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: TreeComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-profile-tree',
          template:
            '<!--suppress AngularInvalidExpressionResultType -->\r\n<mat-tree [dataSource]="DataSource" [treeControl]="TreeControl">\r\n  <mat-tree-node\r\n    (click)="\r\n      selectProfile.emit({ id: node.id, type: node.def_type });\r\n      selectProfileTitle.emit(node.title)\r\n    "\r\n    *matTreeNodeDef="let node; when: hasNoChild"\r\n    class="profile-link"\r\n    matTreeNodePadding\r\n    matTreeNodeToggle\r\n    [matTreeNodePaddingIndent]="30"\r\n  >\r\n    <img\r\n      [alt]="node.title"\r\n      [src]="\r\n        node.mediaObjects.length > 0\r\n          ? node.mediaObjects[0].getRawImage(\'thumbnail\')\r\n          : \'assets/profile/no_thumbnail.svg\'\r\n      "\r\n      class="thumbnail"\r\n    />\r\n    <div class="profile-title">\r\n      <ng-container\r\n        *ngIf="\r\n          selectedProfileId === node.id && selectedProfileType === node.def_type\r\n        "\r\n      >\r\n        <span\r\n          *ngIf="isDiveApp"\r\n          solidProfileSelected\r\n          class="selected"\r\n          [data]="node.title"\r\n          markdown\r\n        ></span>\r\n        <span\r\n          *ngIf="!isDiveApp"\r\n          solidProfileSelected\r\n          class="selected"\r\n          [innerHTML]="node.title"\r\n        ></span>\r\n        <span class="selected">{{ node.subtitle }}</span>\r\n      </ng-container>\r\n      <ng-container\r\n        *ngIf="\r\n          selectedProfileId !== node.id ||\r\n          (selectedProfileId === node.id &&\r\n            selectedProfileType !== node.def_type)\r\n        "\r\n      >\r\n        <span\r\n          *ngIf="isDiveApp"\r\n          class="title-not-selected"\r\n          [data]="node.title"\r\n          markdown\r\n        ></span>\r\n        <span\r\n          *ngIf="!isDiveApp"\r\n          class="title-not-selected"\r\n          [innerHTML]="node.title"\r\n        ></span>\r\n        <span>{{ node.subtitle }}</span>\r\n      </ng-container>\r\n    </div>\r\n  </mat-tree-node>\r\n\r\n  <mat-tree-node\r\n    (click)="onNodeClick(node)"\r\n    *matTreeNodeDef="let node; when: hasChild"\r\n    matTreeNodePadding\r\n    [matTreeNodePaddingIndent]="30"\r\n    #hasChildTreeNode\r\n  >\r\n    <button [attr.aria-label]="\'toggle \' + node.title" mat-icon-button>\r\n      <mat-icon class="mat-icon-rtl-mirror">\r\n        {{ TreeControl.isExpanded(node) ? \'expand_more\' : \'chevron_right\' }}\r\n      </mat-icon>\r\n    </button>\r\n    <div>\r\n      <span [class]="getClassName(hasChildTreeNode.ariaLevel)">{{\r\n        node.title\r\n      }}</span\r\n      ><br />\r\n      <span *ngIf="TreeControl.isExpanded(node) && node.info" class="info">{{\r\n        node.info\r\n      }}</span>\r\n    </div>\r\n  </mat-tree-node>\r\n</mat-tree>\r\n',
          styles: [
            '.type-icon{color:#757575;margin-right:5px}.thumbnail{height:2em;width:2em;border-radius:50%;margin-right:.7em;margin-left:12px}mat-tree.mat-tree{background-color:unset}mat-tree-node{cursor:pointer;padding-right:30px}.profile-tree{grid-area:tree;display:flex;flex-direction:column;height:calc(100vh - 64px);overflow:hidden}.profile-tree mat-tree{flex-grow:1;overflow:auto}.content-container{display:grid;grid-template-areas:"tree profile";grid-template-columns:50% 50%;grid-template-rows:calc(100% - 64px)}.content-container.fullWidth{display:grid;grid-template-areas:"tree" "profile";grid-template-columns:100%}.profile-detail{grid-area:profile;display:flex;flex-direction:column;height:calc(100vh - 64px)}.profile-detail app-profile-detail{flex-grow:1;overflow:auto}div.profile-title{display:flex;flex-direction:column;font-style:italic;font-size:13px}.selected{font-weight:700;font-size:14px}.selected ::ng-deep p{margin-bottom:0}.title-not-selected ::ng-deep p{margin-bottom:0}span.hidden{margin-left:2.5em}.category.level-1{font-size:14px;font-weight:500}.category.level-2{font-size:14px;font-weight:400}.category.level-3{font-size:13px;font-weight:300}.category.level-4{font-size:13px;font-weight:200}.info{font-size:12px;font-style:italic}:host{display:block}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1.Store },
      { type: i3.ActivatedRoute },
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
    selectedElements: [
      {
        type: ViewChildren,
        args: [SelectedDirective, { read: ElementRef }],
      },
    ],
    selectedProfileId: [
      {
        type: Input,
      },
    ],
    selectedProfileType: [
      {
        type: Input,
      },
    ],
    profiles: [
      {
        type: Input,
      },
    ],
    selectProfile: [
      {
        type: Output,
      },
    ],
    selectProfileTitle: [
      {
        type: Output,
      },
    ],
    isDiveApp: [
      {
        type: Input,
      },
    ],
    collapseTree: [
      {
        type: Input,
      },
    ],
    profileTree: [
      {
        type: ViewChild,
        args: ['profileTree'],
      },
    ],
  },
});

class ListComponent {
  profiles;
  selectProfile = new EventEmitter();
  selectProfileTitle = new EventEmitter();
  selectedProfileId;
  selectedProfileType;
  isDiveApp = false;
  trackByFn(index, profile) {
    return profile.id;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: ListComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: ListComponent,
    selector: 'solid-profile-list',
    inputs: {
      profiles: 'profiles',
      selectedProfileId: 'selectedProfileId',
      selectedProfileType: 'selectedProfileType',
      isDiveApp: 'isDiveApp',
    },
    outputs: {
      selectProfile: 'selectProfile',
      selectProfileTitle: 'selectProfileTitle',
    },
    ngImport: i0,
    template:
      '<mat-list role="list">\r\n  <ng-container *ngIf="profiles | async as profilesArr">\r\n    <mat-list-item\r\n      (click)="\r\n        selectProfile.emit({ id: profile.id, type: profile.def_type });\r\n        selectProfileTitle.emit(profile.name)\r\n      "\r\n      *ngFor="let profile of profilesArr; trackBy: trackByFn"\r\n    >\r\n      <div\r\n        class="profile-title"\r\n        [class.selected]="\r\n          selectedProfileId === profile.id &&\r\n          selectedProfileType === profile.def_type\r\n        "\r\n      >\r\n        <span\r\n          *ngIf="isDiveApp"\r\n          class="name"\r\n          [data]="profile.name"\r\n          markdown\r\n        ></span>\r\n        <span *ngIf="!isDiveApp" class="name" [innerHTML]="profile.name"></span>\r\n        <span>{{ profile.sub_name }}</span>\r\n      </div>\r\n    </mat-list-item>\r\n    <mat-list-item *ngIf="profilesArr.length === 0"\r\n      >Keine Suchergebnisse vorhanden\r\n    </mat-list-item>\r\n  </ng-container>\r\n</mat-list>\r\n',
    styles: [
      'mat-list-item{margin-bottom:.5em;cursor:pointer}div.profile-title{display:flex;flex-direction:column}div.profile-title span.name ::ng-deep p{margin-bottom:0}.selected{font-weight:700}.thumbnail{height:2em;width:2em;border-radius:50%;margin-right:.5em}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$1.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1$1.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i2.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: i3$1.MatList,
        selector: 'mat-list',
        exportAs: ['matList'],
      },
      {
        kind: 'component',
        type: i3$1.MatListItem,
        selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
        inputs: ['activated'],
        exportAs: ['matListItem'],
      },
      { kind: 'pipe', type: i1$1.AsyncPipe, name: 'async' },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: ListComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-profile-list',
          template:
            '<mat-list role="list">\r\n  <ng-container *ngIf="profiles | async as profilesArr">\r\n    <mat-list-item\r\n      (click)="\r\n        selectProfile.emit({ id: profile.id, type: profile.def_type });\r\n        selectProfileTitle.emit(profile.name)\r\n      "\r\n      *ngFor="let profile of profilesArr; trackBy: trackByFn"\r\n    >\r\n      <div\r\n        class="profile-title"\r\n        [class.selected]="\r\n          selectedProfileId === profile.id &&\r\n          selectedProfileType === profile.def_type\r\n        "\r\n      >\r\n        <span\r\n          *ngIf="isDiveApp"\r\n          class="name"\r\n          [data]="profile.name"\r\n          markdown\r\n        ></span>\r\n        <span *ngIf="!isDiveApp" class="name" [innerHTML]="profile.name"></span>\r\n        <span>{{ profile.sub_name }}</span>\r\n      </div>\r\n    </mat-list-item>\r\n    <mat-list-item *ngIf="profilesArr.length === 0"\r\n      >Keine Suchergebnisse vorhanden\r\n    </mat-list-item>\r\n  </ng-container>\r\n</mat-list>\r\n',
          styles: [
            'mat-list-item{margin-bottom:.5em;cursor:pointer}div.profile-title{display:flex;flex-direction:column}div.profile-title span.name ::ng-deep p{margin-bottom:0}.selected{font-weight:700}.thumbnail{height:2em;width:2em;border-radius:50%;margin-right:.5em}\n',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    profiles: [
      {
        type: Input,
      },
    ],
    selectProfile: [
      {
        type: Output,
      },
    ],
    selectProfileTitle: [
      {
        type: Output,
      },
    ],
    selectedProfileId: [
      {
        type: Input,
      },
    ],
    selectedProfileType: [
      {
        type: Input,
      },
    ],
    isDiveApp: [
      {
        type: Input,
      },
    ],
  },
});

class LoadProfiles {
  static type = '[Profile] LoadProfiles';
}
class LoadDefinition {
  static type = '[Profile] LoadDefinition';
}
class LoadDefinitionSwagger {
  static type = '[Profile] LoadDefinitionSwagger';
}

var ProfilePropertyType;
(function (ProfilePropertyType) {
  ProfilePropertyType[(ProfilePropertyType['String'] = 0)] = 'String';
  ProfilePropertyType[(ProfilePropertyType['Integer'] = 1)] = 'Integer';
  ProfilePropertyType[(ProfilePropertyType['Boolean'] = 2)] = 'Boolean';
  ProfilePropertyType[(ProfilePropertyType['List'] = 3)] = 'List';
  ProfilePropertyType[(ProfilePropertyType['Mdstring'] = 4)] = 'Mdstring';
  ProfilePropertyType[(ProfilePropertyType['Colstring'] = 5)] = 'Colstring';
  ProfilePropertyType[(ProfilePropertyType['Group'] = 6)] = 'Group';
})(ProfilePropertyType || (ProfilePropertyType = {}));

const ignoredProperties = [
  'id',
  'name',
  'sub_name',
  'short_description',
  'tree_node',
  'photographs',
  'media_objects',
];
class ProfileDefinitionService {
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
    deps: [{ token: i1$3.HttpClient }, { token: SOLID_CORE_CONFIG }],
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
      { type: i1$3.HttpClient },
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

var __decorate$3 =
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
var __metadata$3 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var ProfileState_1;
let ProfileState = class ProfileState {
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
      { token: i1$3.HttpClient },
      { token: SOLID_CORE_CONFIG },
      { token: ProfileDefinitionService },
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
__decorate$3(
  [
    Action(LoadProfiles),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', void 0),
  ],
  ProfileState.prototype,
  'set',
  null
);
__decorate$3(
  [
    Action(LoadDefinition),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', void 0),
  ],
  ProfileState.prototype,
  'loadDefinition',
  null
);
__decorate$3(
  [
    Action(LoadDefinitionSwagger),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', void 0),
  ],
  ProfileState.prototype,
  'loadDefinitionSwagger',
  null
);
__decorate$3(
  [
    Selector(),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', Function),
  ],
  ProfileState,
  'selectProfileAndNode',
  null
);
__decorate$3(
  [
    Selector(),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', void 0),
  ],
  ProfileState,
  'selectProfile',
  null
);
__decorate$3(
  [
    Selector(),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', Array),
  ],
  ProfileState,
  'selectDefinition',
  null
);
__decorate$3(
  [
    Selector(),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', Array),
  ],
  ProfileState,
  'selectDefinition_swagger',
  null
);
__decorate$3(
  [
    Selector(),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', Array),
  ],
  ProfileState,
  'selectTree',
  null
);
__decorate$3(
  [
    Selector(),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', Array),
  ],
  ProfileState,
  'selectFlat',
  null
);
ProfileState = ProfileState_1 = __decorate$3(
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
    __metadata$3('design:paramtypes', [
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
      { type: i1$3.HttpClient },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
      { type: ProfileDefinitionService },
    ];
  },
  propDecorators: { set: [], loadDefinition: [], loadDefinitionSwagger: [] },
});

var __decorate$2 =
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
var __metadata$2 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
class DetailComponent {
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
        type: i1$1.NgClass,
        selector: '[ngClass]',
        inputs: ['class', 'ngClass'],
      },
      {
        kind: 'directive',
        type: i1$1.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1$1.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i1$1.NgTemplateOutlet,
        selector: '[ngTemplateOutlet]',
        inputs: [
          'ngTemplateOutletContext',
          'ngTemplateOutlet',
          'ngTemplateOutletInjector',
        ],
      },
      {
        kind: 'directive',
        type: i1$1.NgSwitch,
        selector: '[ngSwitch]',
        inputs: ['ngSwitch'],
      },
      {
        kind: 'directive',
        type: i1$1.NgSwitchCase,
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
        type: i3$2.MatAccordion,
        selector: 'mat-accordion',
        inputs: ['multi', 'hideToggle', 'displayMode', 'togglePosition'],
        exportAs: ['matAccordion'],
      },
      {
        kind: 'component',
        type: i3$2.MatExpansionPanel,
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
        type: i3$2.MatExpansionPanelHeader,
        selector: 'mat-expansion-panel-header',
        inputs: ['tabIndex', 'expandedHeight', 'collapsedHeight'],
      },
      {
        kind: 'directive',
        type: i3$2.MatExpansionPanelTitle,
        selector: 'mat-panel-title',
      },
    ],
  });
}
__decorate$2(
  [
    Select(ProfileState.selectDefinition),
    __metadata$2('design:type', Observable),
  ],
  DetailComponent.prototype,
  '$ProfileDefinitions',
  void 0
);
__decorate$2(
  [
    Select(ProfileState.selectDefinition_swagger),
    __metadata$2('design:type', Observable),
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

const SOLID_PROFILE_BASE_URL = new InjectionToken('solid-profile-base-url');

var __decorate$1 =
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
var __metadata$1 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
class IntroService {
  config;
  introProfile;
  location;
  constructor(config) {
    this.config = config;
    this.location = config.profileTour.location.profileTree;
  }
  static async navigateTo(url) {
    return new Navigate([url]);
  }
  profileTour(callback) {
    this.introProfile = introJs();
    this.introProfile
      .setOptions({
        tooltipClass: 'customTooltip',
        steps: this.config.profileTour.steps,
        exitOnOverlayClick: false,
        hidePrev: true,
        hideNext: true,
      })
      .onbeforechange(callback)
      .start();
    localStorage.setItem('hide_profile_tour', 'true');
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: IntroService,
    deps: [{ token: SOLID_CORE_CONFIG }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: IntroService,
    providedIn: 'root',
  });
}
__decorate$1(
  [
    Dispatch(),
    __metadata$1('design:type', Function),
    __metadata$1('design:paramtypes', [String]),
    __metadata$1('design:returntype', Promise),
  ],
  IntroService,
  'navigateTo',
  null
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: IntroService,
  decorators: [
    {
      type: Injectable,
      args: [{ providedIn: 'root' }],
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
});

class GridComponent {
  selectedElements;
  profiles;
  selectedProfileId;
  selectedProfileType;
  selectProfile = new EventEmitter();
  isDiveApp = false;
  selectProfileTitle = new EventEmitter();
  hasControlPanel;
  trackByFn(index, profile) {
    return profile.id;
  }
  ngAfterViewInit() {
    this.selectedElements.changes.subscribe(() => {
      this.scrollTo();
    });
    this.scrollTo();
  }
  scrollTo() {
    setTimeout(() => {
      const card = this.selectedElements.first || null;
      if (!card) {
        return;
      }
      card.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: GridComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: GridComponent,
    selector: 'solid-profile-grid',
    inputs: {
      profiles: 'profiles',
      selectedProfileId: 'selectedProfileId',
      selectedProfileType: 'selectedProfileType',
      isDiveApp: 'isDiveApp',
    },
    outputs: {
      selectProfile: 'selectProfile',
      selectProfileTitle: 'selectProfileTitle',
    },
    viewQueries: [
      {
        propertyName: 'selectedElements',
        predicate: SelectedDirective,
        descendants: true,
        read: ElementRef,
      },
    ],
    ngImport: i0,
    template:
      '<ng-container\r\n  *ngFor="let profile of profiles | async; let i = index; trackBy: trackByFn"\r\n>\r\n  <div\r\n    *ngIf="\r\n      selectedProfileId === profile.id &&\r\n      selectedProfileType === profile.def_type\r\n    "\r\n    (click)="\r\n      selectProfile.emit({ id: profile.id, type: profile.def_type });\r\n      selectProfileTitle.emit(profile.name)\r\n    "\r\n    class="card mat-elevation-z2 selected"\r\n    solidProfileSelected\r\n  >\r\n    <ng-container\r\n      *ngTemplateOutlet="cardContent; context: { profile: profile }"\r\n    ></ng-container>\r\n  </div>\r\n  <div\r\n    *ngIf="selectedProfileId !== profile.id"\r\n    (click)="\r\n      selectProfile.emit({ id: profile.id, type: profile.def_type });\r\n      selectProfileTitle.emit(profile.name)\r\n    "\r\n    class="card mat-elevation-z2"\r\n  >\r\n    <ng-container\r\n      *ngTemplateOutlet="cardContent; context: { profile: profile }"\r\n    ></ng-container>\r\n  </div>\r\n</ng-container>\r\n\r\n<ng-template #cardContent let-profile="profile">\r\n  <div *ngIf="isDiveApp" class="title" [data]="profile.name" markdown></div>\r\n  <div *ngIf="!isDiveApp" class="title" [innerHTML]="profile.name"></div>\r\n  <div class="subtitle">{{ profile.sub_name }}</div>\r\n  <solid-core-media\r\n    *ngIf="profile.mediaObjects.length > 0; else noImage"\r\n    [mediaObject]="profile.mediaObjects[0]"\r\n    [hasAttributions]="false"\r\n    [hasDialog]="false"\r\n    [view]="\'grid\'"\r\n    [hasControlPanel]="false"\r\n  ></solid-core-media>\r\n  <ng-template #noImage>\r\n    <img class="noimage" src="assets/profile/no_thumbnail.svg" />\r\n  </ng-template>\r\n</ng-template>\r\n',
    styles: [
      ':host{display:flex;flex-flow:row wrap;justify-content:space-evenly;overflow-y:auto}div.card{cursor:pointer;margin:1em;max-width:200px;height:185px;width:200px;display:flex;border-radius:.25em;flex-direction:column}div.card div.subtitle,div.card div.title{padding:.5em .5em 0;font-weight:500;font-size:14px}div.card div.subtitle ::ng-deep p,div.card div.title ::ng-deep p{margin-bottom:0}div.card div.subtitle{padding-top:0;height:2em;font-weight:400}div.card solid-core-media{border-bottom-right-radius:.25em;border-bottom-left-radius:.25em;height:100px}div.card .noimage{height:100px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$1.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1$1.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i1$1.NgTemplateOutlet,
        selector: '[ngTemplateOutlet]',
        inputs: [
          'ngTemplateOutletContext',
          'ngTemplateOutlet',
          'ngTemplateOutletInjector',
        ],
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
        type: SelectedDirective,
        selector: '[solidProfileSelected]',
      },
      { kind: 'pipe', type: i1$1.AsyncPipe, name: 'async' },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: GridComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-profile-grid',
          template:
            '<ng-container\r\n  *ngFor="let profile of profiles | async; let i = index; trackBy: trackByFn"\r\n>\r\n  <div\r\n    *ngIf="\r\n      selectedProfileId === profile.id &&\r\n      selectedProfileType === profile.def_type\r\n    "\r\n    (click)="\r\n      selectProfile.emit({ id: profile.id, type: profile.def_type });\r\n      selectProfileTitle.emit(profile.name)\r\n    "\r\n    class="card mat-elevation-z2 selected"\r\n    solidProfileSelected\r\n  >\r\n    <ng-container\r\n      *ngTemplateOutlet="cardContent; context: { profile: profile }"\r\n    ></ng-container>\r\n  </div>\r\n  <div\r\n    *ngIf="selectedProfileId !== profile.id"\r\n    (click)="\r\n      selectProfile.emit({ id: profile.id, type: profile.def_type });\r\n      selectProfileTitle.emit(profile.name)\r\n    "\r\n    class="card mat-elevation-z2"\r\n  >\r\n    <ng-container\r\n      *ngTemplateOutlet="cardContent; context: { profile: profile }"\r\n    ></ng-container>\r\n  </div>\r\n</ng-container>\r\n\r\n<ng-template #cardContent let-profile="profile">\r\n  <div *ngIf="isDiveApp" class="title" [data]="profile.name" markdown></div>\r\n  <div *ngIf="!isDiveApp" class="title" [innerHTML]="profile.name"></div>\r\n  <div class="subtitle">{{ profile.sub_name }}</div>\r\n  <solid-core-media\r\n    *ngIf="profile.mediaObjects.length > 0; else noImage"\r\n    [mediaObject]="profile.mediaObjects[0]"\r\n    [hasAttributions]="false"\r\n    [hasDialog]="false"\r\n    [view]="\'grid\'"\r\n    [hasControlPanel]="false"\r\n  ></solid-core-media>\r\n  <ng-template #noImage>\r\n    <img class="noimage" src="assets/profile/no_thumbnail.svg" />\r\n  </ng-template>\r\n</ng-template>\r\n',
          styles: [
            ':host{display:flex;flex-flow:row wrap;justify-content:space-evenly;overflow-y:auto}div.card{cursor:pointer;margin:1em;max-width:200px;height:185px;width:200px;display:flex;border-radius:.25em;flex-direction:column}div.card div.subtitle,div.card div.title{padding:.5em .5em 0;font-weight:500;font-size:14px}div.card div.subtitle ::ng-deep p,div.card div.title ::ng-deep p{margin-bottom:0}div.card div.subtitle{padding-top:0;height:2em;font-weight:400}div.card solid-core-media{border-bottom-right-radius:.25em;border-bottom-left-radius:.25em;height:100px}div.card .noimage{height:100px}\n',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    selectedElements: [
      {
        type: ViewChildren,
        args: [SelectedDirective, { read: ElementRef }],
      },
    ],
    profiles: [
      {
        type: Input,
      },
    ],
    selectedProfileId: [
      {
        type: Input,
      },
    ],
    selectedProfileType: [
      {
        type: Input,
      },
    ],
    selectProfile: [
      {
        type: Output,
      },
    ],
    isDiveApp: [
      {
        type: Input,
      },
    ],
    selectProfileTitle: [
      {
        type: Output,
      },
    ],
  },
});

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
function __internal__selectRouterStateParams(s) {
  return s.router.state.params;
}
var APP;
(function (APP) {
  APP['DIVE'] = 'Div-e';
})(APP || (APP = {}));
class BaseComponent {
  _store;
  baseUrl;
  introService;
  coreConfig;
  _route;
  _activatedRoute;
  titleContainer;
  contentContainer;
  set spinnerContainer(element) {
    if (element) {
      const windowWidth = document.documentElement.clientWidth;
      const position =
        windowWidth >= 1000
          ? (windowWidth - 115 - 300) / 2
          : (windowWidth - 115) / 2;
      element.nativeElement.style.left = position + 'px';
    }
  }
  APP_NAME_DIVE = APP.DIVE;
  $profilesTree;
  $profilesFlat;
  $profileAndCategorySelector;
  $paramMap;
  $queryParams;
  ProfilesFlatFiltered = new BehaviorSubject([]);
  SplitLayout = false;
  Filter = new UntypedFormControl('');
  FilterValue = new BehaviorSubject('');
  SelectedProfile = null;
  SelectedProfileShort = { id: -1, type: undefined };
  SelectedNode = null;
  SwipeLeft = { id: -1 };
  SwipeRight = { id: -1 };
  View = 'tree';
  isSearchBarOpen = false;
  title_container_width = 0;
  title_width = 0;
  firstMovingAnimation = true;
  stopAnimation = true;
  timeOut_1;
  timeOut_2;
  collapseTree = false;
  profileTitle = new EventEmitter();
  profile$;
  isLoading = true;
  mainSubscription;
  filterSubscription;
  profileSubscription;
  constructor(
    _store,
    baseUrl,
    introService,
    coreConfig,
    _route,
    _activatedRoute
  ) {
    this._store = _store;
    this.baseUrl = baseUrl;
    this.introService = introService;
    this.coreConfig = coreConfig;
    this._route = _route;
    this._activatedRoute = _activatedRoute;
    this.$paramMap = this._activatedRoute.paramMap;
    this.$queryParams = this._activatedRoute.queryParams;
    this._store.dispatch([
      new LoadDefinition(),
      new LoadProfiles(),
      // Load definitions from OpenAPI 2.0
      new LoadDefinitionSwagger(),
    ]);
    this.profileSubscription = this.profile$?.subscribe((res) => {
      if (res.length != 0) this.isLoading = false;
    });
  }
  onResize() {
    this.calculateLayout();
    this.handleLongTitle();
  }
  ngOnInit() {
    this.mainSubscription = combineLatest([
      this.$paramMap,
      this.$queryParams,
      this.$profileAndCategorySelector,
      this.$profilesFlat,
      this.FilterValue,
    ])
      .pipe(
        map((v) => {
          const { params, queryParams, selector, flat, filterStr } = {
            params: v[0],
            queryParams: v[1],
            selector: v[2],
            flat: v[3],
            filterStr: v[4],
          };
          const id = params.get('id');
          const type = params.get('type');
          // temporary workaround for planty since the view is still in the URL
          const view =
            this.getProfileType(type) === 'wine' ? type : queryParams['view'];
          this.View = view ? view : 'tree';
          // select profile
          const profileId = id ? parseInt(id, 10) : undefined;
          const profileType = this.getProfileType(type);
          const profileAndNode = selector(profileId, profileType);
          // filter profiles
          const regExp = new RegExp(filterStr, 'i');
          const profilesFlatFiltered = flat.filter((p) => {
            if (p.name.match(regExp)) {
              return true;
            }
            if (p.sub_name) {
              return !!p.sub_name.match(regExp);
            }
          });
          // no profile selected
          if (!profileId || !profileAndNode) {
            return {
              selectedProfile: null,
              selectedNode: null,
              profilesFlatFiltered,
              swipeRight: { id: -1 },
              swipeLeft: { id: -1 },
            };
          }
          let swipeRight = {
            id: -1,
          };
          let swipeLeft = {
            id: -1,
          };
          if (this.View === 'grid' || filterStr !== '') {
            const flatIndex = profilesFlatFiltered.findIndex(
              (p) => p.id === profileId && p.def_type === profileType
            );
            if (flatIndex !== 0) {
              const profile = profilesFlatFiltered[flatIndex - 1];
              swipeLeft = this.getProfileShort(profile);
            }
            if (flatIndex !== profilesFlatFiltered.length - 1) {
              const profile = profilesFlatFiltered[flatIndex + 1];
              swipeRight = this.getProfileShort(profile);
            }
          } else {
            const index = profileAndNode.node.profiles.indexOf(
              profileAndNode.profile
            );
            if (!this.Filter.value) {
              const profileLeft = profileAndNode.node.profiles.find(
                (p, i) => i === index - 1
              );
              swipeLeft = this.getProfileShort(profileLeft);
              const profileRight = profileAndNode.node.profiles.find(
                (p, i) => i > index
              );
              swipeRight = this.getProfileShort(profileRight);
            }
          }
          this.handleLongTitle();
          return {
            selectedProfile: profileAndNode.profile,
            selectedNode: profileAndNode.node,
            profilesFlatFiltered,
            swipeRight,
            swipeLeft,
          };
        })
      )
      .subscribe((v) => {
        this.SelectedProfile = v.selectedProfile;
        this.SelectedNode = v.selectedNode;
        this.ProfilesFlatFiltered.next(v.profilesFlatFiltered);
        this.SwipeLeft = v.swipeLeft;
        this.SwipeRight = v.swipeRight;
      });
    this.filterSubscription = this.Filter.valueChanges.subscribe((_) =>
      this.FilterValue.next(this.Filter.value)
    );
  }
  ngAfterViewInit() {
    this.calculateLayout();
    this.profileSubscription = this.profile$.subscribe((res) => {
      if (res.length != 0) {
        if (
          localStorage.getItem('hide_profile_tour') == 'false' ||
          localStorage.getItem('hide_profile_tour') == null
        ) {
          setTimeout(() => {
            this.introService.profileTour((_targetElement) => {
              try {
                const id = _targetElement.id;
                const treeNodeLocation =
                  this.coreConfig.profileTour.location.treeNode;
                const treeLocation =
                  this.coreConfig.profileTour.location.profileTree;
                this.collapseTree = false;
                if (id != 'profile')
                  setTimeout(() => {
                    this.introService.introProfile.refresh(true);
                  }, 365);
                if (id == '') {
                  if (this._route.url == treeLocation)
                    this.navigateTo(treeNodeLocation);
                  if (this._route.url == treeNodeLocation) {
                    const steps = this.coreConfig.profileTour.steps;
                    const currentStep =
                      this.introService.introProfile._currentStep;
                    steps.splice(currentStep, 1);
                    setTimeout(() => {
                      this.introService.introProfile
                        .goToStep(currentStep)
                        .start();
                    }, 0.1);
                  }
                } else if (id == 'profile-view' || id == 'profile') {
                  if (this._route.url != treeLocation)
                    this.navigateTo(treeLocation);
                  this.collapseTree = true;
                }
                setTimeout(() => {
                  this.introService.introProfile.refresh(true);
                }, 0.1);
              } catch (error) {
                return;
              }
              return;
            });
          }, 800);
        }
      }
    });
  }
  ngOnDestroy() {
    this.mainSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }
  toggleGridTree() {
    this.View = this.View === 'tree' ? 'grid' : 'tree';
    if (this.SelectedProfile) {
      return new Navigate(
        [
          `${this.baseUrl}`,
          this.SelectedProfile.def_type !== 'wine'
            ? this.SelectedProfile.def_type
            : this.View,
          this.SelectedProfile.id,
        ],
        {
          view:
            this.SelectedProfile.def_type !== 'wine' ? this.View : undefined,
        }
      );
    }
    return new Navigate(
      [`${this.baseUrl}`],
      { view: this.View },
      { replaceUrl: true }
    );
  }
  selectProfile(profile) {
    if (!profile) {
      return new Navigate([`${this.baseUrl}`], {
        view: this.View ? this.View : undefined,
      });
    }
    if (typeof profile !== 'number' && profile.type) {
      this.SelectedProfileShort = profile;
      if (profile.type === 'wine') {
        // temporary workaround for PLANTY - type wine_related doesn't have a type in the URL
        return new Navigate([`${this.baseUrl}`, this.View, profile.id]);
      } else {
        const profileType = profile.type;
        return new Navigate([`${this.baseUrl}`, profileType, profile.id], {
          view: this.View,
        });
      }
    } else {
      return new Navigate([`${this.baseUrl}`, this.View, profile]);
    }
  }
  swipeLeft() {
    if (this.SwipeLeft.id > 0) {
      this.selectProfile(this.SwipeLeft);
    }
    setTimeout(() => {
      this.profileTitle.emit(this.SelectedProfile?.name);
    }, 10);
  }
  swipeRight() {
    if (this.SwipeRight.id > 0) {
      this.selectProfile(this.SwipeRight);
    }
    setTimeout(() => {
      this.profileTitle.emit(this.SelectedProfile?.name);
    }, 10);
  }
  onPanEnd($event) {
    if ($event.deltaX > 100 && this.SwipeLeft) {
      $event.preventDefault();
      this.swipeLeft();
    } else if ($event.deltaX < -100 && this.SwipeRight) {
      $event.preventDefault();
      this.swipeRight();
    }
  }
  calculateLayout() {
    const split = this.contentContainer.nativeElement.clientWidth >= 900;
    if (split !== this.SplitLayout) {
      setTimeout(() => {
        this.SplitLayout = split;
      }, 0);
    }
  }
  selectProfileTitle(title) {
    if (title) this.profileTitle.emit(title);
  }
  getProfileType(type) {
    if (!type) {
      return '';
    }
    if (type === 'tree' || type === 'grid') {
      return 'wine'; // temporary for PLANTY
    } else {
      return type;
    }
  }
  getProfileShort(profile) {
    const profileId = profile?.id || -1;
    const profileType = profile?.def_type;
    return { id: profileId, type: profileType };
  }
  async navigateTo(url) {
    return new Navigate([url]);
  }
  handleLongTitle() {
    this.stopAnimation = true;
    clearTimeout(this.timeOut_1);
    clearTimeout(this.timeOut_2);
    this.timeOut_1 = setTimeout(() => {
      this.stopAnimation = false;
      this.firstMovingAnimation = true;
      this.title_container_width =
        this.titleContainer?.nativeElement.offsetWidth;
      this.title_width =
        this.titleContainer?.nativeElement.firstElementChild.firstElementChild.offsetWidth;
      if (this.titleContainer?.nativeElement.firstElementChild) {
        this.timeOut_2 = setTimeout(() => {
          this.firstMovingAnimation = false;
        }, 10000);
      }
    }, 0);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: BaseComponent,
    deps: [
      { token: i1.Store },
      { token: SOLID_PROFILE_BASE_URL },
      { token: IntroService },
      { token: SOLID_CORE_CONFIG },
      { token: i3.Router },
      { token: i3.ActivatedRoute },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: BaseComponent,
    selector: 'solid-profile-base',
    outputs: { profileTitle: 'profileTitle' },
    host: { listeners: { 'window:resize': 'onResize($event)' } },
    viewQueries: [
      {
        propertyName: 'titleContainer',
        first: true,
        predicate: ['title_container'],
        descendants: true,
      },
      {
        propertyName: 'contentContainer',
        first: true,
        predicate: ['contentContainer'],
        descendants: true,
      },
      {
        propertyName: 'spinnerContainer',
        first: true,
        predicate: ['spinnerContainer'],
        descendants: true,
      },
    ],
    ngImport: i0,
    template:
      '<div\r\n  #contentContainer\r\n  [class.splitLayout]="SplitLayout"\r\n  class="content-container"\r\n  id="profile"\r\n>\r\n  <mat-toolbar\r\n    *ngIf="SplitLayout || !SelectedProfile"\r\n    [class.full-width]="!SelectedProfile"\r\n    class="main-toolbar"\r\n  >\r\n    <button mat-icon-button class="button-back" routerLink="">\r\n      <mat-icon>arrow_back</mat-icon>\r\n    </button>\r\n    <mat-form-field\r\n      appearance="fill"\r\n      floatLabel="auto"\r\n      [class.openSearchBar]="isSearchBarOpen"\r\n    >\r\n      <mat-label>Suche</mat-label>\r\n      <input\r\n        [formControl]="Filter"\r\n        matInput\r\n        type="text"\r\n        #search_input\r\n        (blur)="\r\n          Filter.value === \'\'\r\n            ? (isSearchBarOpen = false)\r\n            : (isSearchBarOpen = true)\r\n        "\r\n        (focus)="isSearchBarOpen = true"\r\n      />\r\n      <button mat-icon-button matSuffix (click)="Filter.setValue(\'\')">\r\n        <!--mat-icon *ngIf="Filter.value == \'\'" matSuffix>search</mat-icon-->\r\n        <mat-icon>\r\n          {{ Filter.value === \'\' ? \'search\' : \'close\' }}\r\n        </mat-icon>\r\n      </button>\r\n    </mat-form-field>\r\n    <div class="spacer"></div>\r\n    <button id="profile-view" (click)="toggleGridTree()" mat-icon-button>\r\n      <mat-icon>{{\r\n        View === \'tree\' ? \'view_module\' : \'account_tree\'\r\n      }}</mat-icon>\r\n    </button>\r\n  </mat-toolbar>\r\n  <mat-toolbar *ngIf="SelectedProfile" class="detail-toolbar" color="accent">\r\n    <div class="title-container" #title_container>\r\n      <div *ngIf="coreConfig.appName === APP_NAME_DIVE">\r\n        <div\r\n          class="title"\r\n          [data]="SelectedProfile!.name"\r\n          markdown\r\n          [class.long-title]="\r\n            title_width >= title_container_width &&\r\n            firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n          [class.long-title-1]="\r\n            title_width >= title_container_width &&\r\n            !firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n        ></div>\r\n      </div>\r\n      <div *ngIf="coreConfig.appName !== APP_NAME_DIVE">\r\n        <div\r\n          class="title"\r\n          [class.long-title]="\r\n            title_width >= title_container_width &&\r\n            firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n          [class.long-title-1]="\r\n            title_width >= title_container_width &&\r\n            !firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n        >\r\n          {{ SelectedProfile.name }}\r\n        </div>\r\n      </div>\r\n      <span *ngIf="SelectedProfile.sub_name">{{\r\n        SelectedProfile.sub_name\r\n      }}</span>\r\n    </div>\r\n    <div id="profile-detail-navigation">\r\n      <button\r\n        (click)="swipeLeft()"\r\n        [disabled]="SwipeLeft.id < 0"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon>navigate_before</mat-icon>\r\n      </button>\r\n      <button (click)="selectProfile(undefined)" mat-icon-button>\r\n        <mat-icon>{{ SplitLayout ? \'close\' : \'expand_less\' }}</mat-icon>\r\n      </button>\r\n      <button\r\n        (click)="swipeRight()"\r\n        [disabled]="SwipeRight.id < 0"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon>navigate_next</mat-icon>\r\n      </button>\r\n    </div>\r\n  </mat-toolbar>\r\n  <ng-container *ngIf="(SplitLayout || !SelectedProfile) && !isLoading">\r\n    <ng-container [ngSwitch]="(View === \'tree\' && Filter.value !== \'\') || View">\r\n      <solid-profile-grid\r\n        *ngSwitchCase="\'grid\'"\r\n        (selectProfile)="selectProfile($event)"\r\n        [class.full-width]="!SelectedProfile"\r\n        [profiles]="ProfilesFlatFiltered.asObservable()"\r\n        [selectedProfileId]="\r\n          SelectedProfile ? SelectedProfile.id : SelectedProfileShort.id\r\n        "\r\n        [selectedProfileType]="\r\n          SelectedProfile ? SelectedProfile.def_type : SelectedProfileShort.type\r\n        "\r\n        [isDiveApp]="coreConfig.appName === this.APP_NAME_DIVE"\r\n        (selectProfileTitle)="selectProfileTitle($event)"\r\n      ></solid-profile-grid>\r\n      <solid-profile-tree\r\n        *ngSwitchCase="\'tree\'"\r\n        (selectProfile)="selectProfile($event)"\r\n        (selectProfileTitle)="selectProfileTitle($event)"\r\n        [profiles]="$profilesTree"\r\n        [selectedProfileId]="\r\n          SelectedProfile ? SelectedProfile.id : SelectedProfileShort.id\r\n        "\r\n        [selectedProfileType]="\r\n          SelectedProfile ? SelectedProfile.def_type : SelectedProfileShort.type\r\n        "\r\n        [isDiveApp]="coreConfig.appName === this.APP_NAME_DIVE"\r\n        [collapseTree]="collapseTree"\r\n      ></solid-profile-tree>\r\n      <solid-profile-list\r\n        *ngSwitchDefault\r\n        (selectProfile)="selectProfile($event)"\r\n        (selectProfileTitle)="selectProfileTitle($event)"\r\n        [profiles]="ProfilesFlatFiltered.asObservable()"\r\n        [selectedProfileId]="\r\n          SelectedProfile ? SelectedProfile.id : SelectedProfileShort.id\r\n        "\r\n        [selectedProfileType]="\r\n          SelectedProfile ? SelectedProfile.def_type : SelectedProfileShort.type\r\n        "\r\n        [isDiveApp]="coreConfig.appName === this.APP_NAME_DIVE"\r\n      ></solid-profile-list>\r\n    </ng-container>\r\n  </ng-container>\r\n  <div *ngIf="isLoading">\r\n    <mat-card-content #spinnerContainer>\r\n      <mat-spinner color="primary" [diameter]="115"></mat-spinner>\r\n    </mat-card-content>\r\n  </div>\r\n  <solid-profile-detail\r\n    *ngIf="SelectedProfile && SelectedNode"\r\n    (selectProfile)="selectProfile($event)"\r\n    cdkScrollable\r\n    [node]="SelectedNode"\r\n    [profile]="SelectedProfile"\r\n  ></solid-profile-detail>\r\n</div>\r\n',
    styles: [
      ':host{display:block;height:100%}mat-form-field{width:0;transition:.5s ease-in-out}mat-form-field ::ng-deep div.mat-form-field-wrapper{padding:0}mat-form-field ::ng-deep div.mat-form-field-wrapper div.mat-form-field-flex{background-color:#0000;padding-bottom:2.5px;padding-left:0;margin-left:10px}mat-form-field ::ng-deep div.mat-form-field-wrapper div.mat-form-field-flex div.mat-form-field-suffix{margin-left:-.75em}mat-form-field ::ng-deep div.mat-form-field-underline{display:none}.openSearchBar{width:328px}mat-form-field flex{max-width:20em;padding-top:0}mat-form-field flex ::ng-deep div.mat-form-field-wrapper{padding:0}mat-form-field flex ::ng-deep div.mat-form-field-underline{display:none}mat-icon.clear-filter{cursor:pointer}div.content-container{display:grid;grid-template-columns:100%;grid-template-rows:56px 1fr;overflow:hidden;height:100%}div.content-container mat-toolbar.detail-toolbar{flex-flow:wrap}div.content-container mat-toolbar.detail-toolbar div.title-container{white-space:nowrap;display:flex;flex-direction:column;overflow:hidden;flex:1;margin-right:.5em}div.content-container mat-toolbar.detail-toolbar div.title-container span:nth-child(2){font-size:14px;line-height:27px;margin-top:-6px}div.content-container.splitLayout{grid-template-areas:"main-toolbar toolbar" "view profile";grid-template-columns:320px 1fr;max-height:100%}div.content-container.splitLayout mat-toolbar.detail-toolbar{grid-area:toolbar}div.content-container.splitLayout mat-toolbar.main-toolbar{grid-area:main-toolbar;width:101%;padding-right:25px}div.content-container.splitLayout mat-toolbar.full-width{grid-column:main-toolbar/toolbar}div.content-container.splitLayout solid-profile-detail{grid-area:profile;overflow-y:auto;margin-top:3px}div.content-container.splitLayout solid-profile-tree,div.content-container.splitLayout solid-profile-grid,div.content-container.splitLayout solid-profile-list{grid-area:view;overflow-y:auto}div.content-container.splitLayout solid-profile-tree.full-width,div.content-container.splitLayout solid-profile-grid.full-width,div.content-container.splitLayout solid-profile-list.full-width{grid-column:view/profile}div.content-container solid-profile-tree,div.content-container solid-profile-list{grid-row:2;overflow-y:auto}div.content-container mat-toolbar{grid-row:1}div.content-container solid-profile-detail{grid-row:2;overflow-y:auto;margin-top:3px}mat-toolbar{height:56px!important}.title{margin-right:-20em;display:inline-block}.title ::ng-deep p{margin-bottom:0}div.long-title{display:inline-block;animation:text-moving-1 12s linear infinite}div.long-title-1{display:inline-block;animation:text-moving-2 11s linear infinite}@keyframes text-moving-1{0%{transform:translate(0)}20%{transform:translate(0)}80%{transform:translate(-100%)}to{transform:translate(-150%)}}@keyframes text-moving-2{0%{transform:translate(100%)}to{transform:translate(-100%)}}mat-card-content{position:absolute;margin-top:100px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$1.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i1$1.NgSwitch,
        selector: '[ngSwitch]',
        inputs: ['ngSwitch'],
      },
      {
        kind: 'directive',
        type: i1$1.NgSwitchCase,
        selector: '[ngSwitchCase]',
        inputs: ['ngSwitchCase'],
      },
      {
        kind: 'directive',
        type: i1$1.NgSwitchDefault,
        selector: '[ngSwitchDefault]',
      },
      {
        kind: 'directive',
        type: i5$1.DefaultValueAccessor,
        selector:
          'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
      },
      {
        kind: 'directive',
        type: i5$1.NgControlStatus,
        selector: '[formControlName],[ngModel],[formControl]',
      },
      {
        kind: 'directive',
        type: i5$1.FormControlDirective,
        selector: '[formControl]',
        inputs: ['formControl', 'disabled', 'ngModel'],
        outputs: ['ngModelChange'],
        exportAs: ['ngForm'],
      },
      {
        kind: 'component',
        type: i2.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'directive',
        type: i7$1.CdkScrollable,
        selector: '[cdk-scrollable], [cdkScrollable]',
      },
      {
        kind: 'directive',
        type: i3.RouterLink,
        selector: '[routerLink]',
        inputs: [
          'target',
          'queryParams',
          'fragment',
          'queryParamsHandling',
          'state',
          'relativeTo',
          'preserveFragment',
          'skipLocationChange',
          'replaceUrl',
          'routerLink',
        ],
      },
      {
        kind: 'component',
        type: i5.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i9.MatFormField,
        selector: 'mat-form-field',
        inputs: [
          'hideRequiredMarker',
          'color',
          'floatLabel',
          'appearance',
          'subscriptSizing',
          'hintLabel',
        ],
        exportAs: ['matFormField'],
      },
      { kind: 'directive', type: i9.MatLabel, selector: 'mat-label' },
      {
        kind: 'directive',
        type: i9.MatSuffix,
        selector: '[matSuffix], [matIconSuffix], [matTextSuffix]',
        inputs: ['matTextSuffix'],
      },
      {
        kind: 'component',
        type: i1$2.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'directive',
        type: i11.MatInput,
        selector:
          'input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]',
        inputs: [
          'disabled',
          'id',
          'placeholder',
          'name',
          'required',
          'type',
          'errorStateMatcher',
          'aria-describedby',
          'value',
          'readonly',
        ],
        exportAs: ['matInput'],
      },
      {
        kind: 'component',
        type: i12.MatProgressSpinner,
        selector: 'mat-progress-spinner, mat-spinner',
        inputs: ['color', 'mode', 'value', 'diameter', 'strokeWidth'],
        exportAs: ['matProgressSpinner'],
      },
      {
        kind: 'component',
        type: i13.MatToolbar,
        selector: 'mat-toolbar',
        inputs: ['color'],
        exportAs: ['matToolbar'],
      },
      {
        kind: 'directive',
        type: i14.MatCardContent,
        selector: 'mat-card-content',
      },
      {
        kind: 'component',
        type: TreeComponent,
        selector: 'solid-profile-tree',
        inputs: [
          'selectedProfileId',
          'selectedProfileType',
          'profiles',
          'isDiveApp',
          'collapseTree',
        ],
        outputs: ['selectProfile', 'selectProfileTitle'],
      },
      {
        kind: 'component',
        type: ListComponent,
        selector: 'solid-profile-list',
        inputs: [
          'profiles',
          'selectedProfileId',
          'selectedProfileType',
          'isDiveApp',
        ],
        outputs: ['selectProfile', 'selectProfileTitle'],
      },
      {
        kind: 'component',
        type: DetailComponent,
        selector: 'solid-profile-detail',
        inputs: ['node', 'profile'],
        outputs: ['selectProfile'],
      },
      {
        kind: 'component',
        type: GridComponent,
        selector: 'solid-profile-grid',
        inputs: [
          'profiles',
          'selectedProfileId',
          'selectedProfileType',
          'isDiveApp',
        ],
        outputs: ['selectProfile', 'selectProfileTitle'],
      },
    ],
  });
}
__decorate(
  [Select(ProfileState.selectTree), __metadata('design:type', Observable)],
  BaseComponent.prototype,
  '$profilesTree',
  void 0
);
__decorate(
  [Select(ProfileState.selectFlat), __metadata('design:type', Observable)],
  BaseComponent.prototype,
  '$profilesFlat',
  void 0
);
__decorate(
  [
    Select(ProfileState.selectProfileAndNode),
    __metadata('design:type', Observable),
  ],
  BaseComponent.prototype,
  '$profileAndCategorySelector',
  void 0
);
__decorate(
  [Select(ProfileState.selectProfile), __metadata('design:type', Observable)],
  BaseComponent.prototype,
  'profile$',
  void 0
);
__decorate(
  [
    Dispatch(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', void 0),
  ],
  BaseComponent.prototype,
  'toggleGridTree',
  null
);
__decorate(
  [
    Dispatch(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  BaseComponent.prototype,
  'selectProfile',
  null
);
__decorate(
  [
    Dispatch(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  BaseComponent.prototype,
  'navigateTo',
  null
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: BaseComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-profile-base',
          template:
            '<div\r\n  #contentContainer\r\n  [class.splitLayout]="SplitLayout"\r\n  class="content-container"\r\n  id="profile"\r\n>\r\n  <mat-toolbar\r\n    *ngIf="SplitLayout || !SelectedProfile"\r\n    [class.full-width]="!SelectedProfile"\r\n    class="main-toolbar"\r\n  >\r\n    <button mat-icon-button class="button-back" routerLink="">\r\n      <mat-icon>arrow_back</mat-icon>\r\n    </button>\r\n    <mat-form-field\r\n      appearance="fill"\r\n      floatLabel="auto"\r\n      [class.openSearchBar]="isSearchBarOpen"\r\n    >\r\n      <mat-label>Suche</mat-label>\r\n      <input\r\n        [formControl]="Filter"\r\n        matInput\r\n        type="text"\r\n        #search_input\r\n        (blur)="\r\n          Filter.value === \'\'\r\n            ? (isSearchBarOpen = false)\r\n            : (isSearchBarOpen = true)\r\n        "\r\n        (focus)="isSearchBarOpen = true"\r\n      />\r\n      <button mat-icon-button matSuffix (click)="Filter.setValue(\'\')">\r\n        <!--mat-icon *ngIf="Filter.value == \'\'" matSuffix>search</mat-icon-->\r\n        <mat-icon>\r\n          {{ Filter.value === \'\' ? \'search\' : \'close\' }}\r\n        </mat-icon>\r\n      </button>\r\n    </mat-form-field>\r\n    <div class="spacer"></div>\r\n    <button id="profile-view" (click)="toggleGridTree()" mat-icon-button>\r\n      <mat-icon>{{\r\n        View === \'tree\' ? \'view_module\' : \'account_tree\'\r\n      }}</mat-icon>\r\n    </button>\r\n  </mat-toolbar>\r\n  <mat-toolbar *ngIf="SelectedProfile" class="detail-toolbar" color="accent">\r\n    <div class="title-container" #title_container>\r\n      <div *ngIf="coreConfig.appName === APP_NAME_DIVE">\r\n        <div\r\n          class="title"\r\n          [data]="SelectedProfile!.name"\r\n          markdown\r\n          [class.long-title]="\r\n            title_width >= title_container_width &&\r\n            firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n          [class.long-title-1]="\r\n            title_width >= title_container_width &&\r\n            !firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n        ></div>\r\n      </div>\r\n      <div *ngIf="coreConfig.appName !== APP_NAME_DIVE">\r\n        <div\r\n          class="title"\r\n          [class.long-title]="\r\n            title_width >= title_container_width &&\r\n            firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n          [class.long-title-1]="\r\n            title_width >= title_container_width &&\r\n            !firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n        >\r\n          {{ SelectedProfile.name }}\r\n        </div>\r\n      </div>\r\n      <span *ngIf="SelectedProfile.sub_name">{{\r\n        SelectedProfile.sub_name\r\n      }}</span>\r\n    </div>\r\n    <div id="profile-detail-navigation">\r\n      <button\r\n        (click)="swipeLeft()"\r\n        [disabled]="SwipeLeft.id < 0"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon>navigate_before</mat-icon>\r\n      </button>\r\n      <button (click)="selectProfile(undefined)" mat-icon-button>\r\n        <mat-icon>{{ SplitLayout ? \'close\' : \'expand_less\' }}</mat-icon>\r\n      </button>\r\n      <button\r\n        (click)="swipeRight()"\r\n        [disabled]="SwipeRight.id < 0"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon>navigate_next</mat-icon>\r\n      </button>\r\n    </div>\r\n  </mat-toolbar>\r\n  <ng-container *ngIf="(SplitLayout || !SelectedProfile) && !isLoading">\r\n    <ng-container [ngSwitch]="(View === \'tree\' && Filter.value !== \'\') || View">\r\n      <solid-profile-grid\r\n        *ngSwitchCase="\'grid\'"\r\n        (selectProfile)="selectProfile($event)"\r\n        [class.full-width]="!SelectedProfile"\r\n        [profiles]="ProfilesFlatFiltered.asObservable()"\r\n        [selectedProfileId]="\r\n          SelectedProfile ? SelectedProfile.id : SelectedProfileShort.id\r\n        "\r\n        [selectedProfileType]="\r\n          SelectedProfile ? SelectedProfile.def_type : SelectedProfileShort.type\r\n        "\r\n        [isDiveApp]="coreConfig.appName === this.APP_NAME_DIVE"\r\n        (selectProfileTitle)="selectProfileTitle($event)"\r\n      ></solid-profile-grid>\r\n      <solid-profile-tree\r\n        *ngSwitchCase="\'tree\'"\r\n        (selectProfile)="selectProfile($event)"\r\n        (selectProfileTitle)="selectProfileTitle($event)"\r\n        [profiles]="$profilesTree"\r\n        [selectedProfileId]="\r\n          SelectedProfile ? SelectedProfile.id : SelectedProfileShort.id\r\n        "\r\n        [selectedProfileType]="\r\n          SelectedProfile ? SelectedProfile.def_type : SelectedProfileShort.type\r\n        "\r\n        [isDiveApp]="coreConfig.appName === this.APP_NAME_DIVE"\r\n        [collapseTree]="collapseTree"\r\n      ></solid-profile-tree>\r\n      <solid-profile-list\r\n        *ngSwitchDefault\r\n        (selectProfile)="selectProfile($event)"\r\n        (selectProfileTitle)="selectProfileTitle($event)"\r\n        [profiles]="ProfilesFlatFiltered.asObservable()"\r\n        [selectedProfileId]="\r\n          SelectedProfile ? SelectedProfile.id : SelectedProfileShort.id\r\n        "\r\n        [selectedProfileType]="\r\n          SelectedProfile ? SelectedProfile.def_type : SelectedProfileShort.type\r\n        "\r\n        [isDiveApp]="coreConfig.appName === this.APP_NAME_DIVE"\r\n      ></solid-profile-list>\r\n    </ng-container>\r\n  </ng-container>\r\n  <div *ngIf="isLoading">\r\n    <mat-card-content #spinnerContainer>\r\n      <mat-spinner color="primary" [diameter]="115"></mat-spinner>\r\n    </mat-card-content>\r\n  </div>\r\n  <solid-profile-detail\r\n    *ngIf="SelectedProfile && SelectedNode"\r\n    (selectProfile)="selectProfile($event)"\r\n    cdkScrollable\r\n    [node]="SelectedNode"\r\n    [profile]="SelectedProfile"\r\n  ></solid-profile-detail>\r\n</div>\r\n',
          styles: [
            ':host{display:block;height:100%}mat-form-field{width:0;transition:.5s ease-in-out}mat-form-field ::ng-deep div.mat-form-field-wrapper{padding:0}mat-form-field ::ng-deep div.mat-form-field-wrapper div.mat-form-field-flex{background-color:#0000;padding-bottom:2.5px;padding-left:0;margin-left:10px}mat-form-field ::ng-deep div.mat-form-field-wrapper div.mat-form-field-flex div.mat-form-field-suffix{margin-left:-.75em}mat-form-field ::ng-deep div.mat-form-field-underline{display:none}.openSearchBar{width:328px}mat-form-field flex{max-width:20em;padding-top:0}mat-form-field flex ::ng-deep div.mat-form-field-wrapper{padding:0}mat-form-field flex ::ng-deep div.mat-form-field-underline{display:none}mat-icon.clear-filter{cursor:pointer}div.content-container{display:grid;grid-template-columns:100%;grid-template-rows:56px 1fr;overflow:hidden;height:100%}div.content-container mat-toolbar.detail-toolbar{flex-flow:wrap}div.content-container mat-toolbar.detail-toolbar div.title-container{white-space:nowrap;display:flex;flex-direction:column;overflow:hidden;flex:1;margin-right:.5em}div.content-container mat-toolbar.detail-toolbar div.title-container span:nth-child(2){font-size:14px;line-height:27px;margin-top:-6px}div.content-container.splitLayout{grid-template-areas:"main-toolbar toolbar" "view profile";grid-template-columns:320px 1fr;max-height:100%}div.content-container.splitLayout mat-toolbar.detail-toolbar{grid-area:toolbar}div.content-container.splitLayout mat-toolbar.main-toolbar{grid-area:main-toolbar;width:101%;padding-right:25px}div.content-container.splitLayout mat-toolbar.full-width{grid-column:main-toolbar/toolbar}div.content-container.splitLayout solid-profile-detail{grid-area:profile;overflow-y:auto;margin-top:3px}div.content-container.splitLayout solid-profile-tree,div.content-container.splitLayout solid-profile-grid,div.content-container.splitLayout solid-profile-list{grid-area:view;overflow-y:auto}div.content-container.splitLayout solid-profile-tree.full-width,div.content-container.splitLayout solid-profile-grid.full-width,div.content-container.splitLayout solid-profile-list.full-width{grid-column:view/profile}div.content-container solid-profile-tree,div.content-container solid-profile-list{grid-row:2;overflow-y:auto}div.content-container mat-toolbar{grid-row:1}div.content-container solid-profile-detail{grid-row:2;overflow-y:auto;margin-top:3px}mat-toolbar{height:56px!important}.title{margin-right:-20em;display:inline-block}.title ::ng-deep p{margin-bottom:0}div.long-title{display:inline-block;animation:text-moving-1 12s linear infinite}div.long-title-1{display:inline-block;animation:text-moving-2 11s linear infinite}@keyframes text-moving-1{0%{transform:translate(0)}20%{transform:translate(0)}80%{transform:translate(-100%)}to{transform:translate(-150%)}}@keyframes text-moving-2{0%{transform:translate(100%)}to{transform:translate(-100%)}}mat-card-content{position:absolute;margin-top:100px}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1.Store },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_PROFILE_BASE_URL],
          },
        ],
      },
      { type: IntroService },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
      { type: i3.Router },
      { type: i3.ActivatedRoute },
    ];
  },
  propDecorators: {
    titleContainer: [
      {
        type: ViewChild,
        args: ['title_container', { static: false }],
      },
    ],
    contentContainer: [
      {
        type: ViewChild,
        args: ['contentContainer', { static: false }],
      },
    ],
    spinnerContainer: [
      {
        type: ViewChild,
        args: ['spinnerContainer', { static: false }],
      },
    ],
    $profilesTree: [],
    $profilesFlat: [],
    $profileAndCategorySelector: [],
    profileTitle: [
      {
        type: Output,
      },
    ],
    profile$: [],
    onResize: [
      {
        type: HostListener,
        args: ['window:resize', ['$event']],
      },
    ],
    toggleGridTree: [],
    selectProfile: [],
    navigateTo: [],
  },
});

const baseUrlSegment = new UrlSegment('', {});
const routes = [
  {
    matcher: (url) => {
      if (url.length !== 2) {
        return { consumed: [baseUrlSegment] };
      }
      const firstUrlSegment = url[0]?.path;
      const secondUrlSegment = url[1]?.path;
      return {
        consumed: url,
        posParams: {
          type: new UrlSegment(firstUrlSegment, {}),
          id: new UrlSegment(secondUrlSegment, {}),
        },
      };
    },
    component: BaseComponent,
  },
];
const SolidProfileRoutingModule = RouterModule.forChild(routes);

// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
const ngxsFeatureModule = NgxsModule.forFeature([ProfileState]);
class SolidProfileModule {
  constructor(registry, url) {
    const addIcon = (name) =>
      registry.addSvgIcon(
        name,
        url.bypassSecurityTrustResourceUrl(`assets/svg/${name}.svg`)
      );
    addIcon('search');
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidProfileModule,
    deps: [{ token: i1$2.MatIconRegistry }, { token: i2$1.DomSanitizer }],
    target: i0.ɵɵFactoryTarget.NgModule,
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: '14.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidProfileModule,
    declarations: [
      TreeComponent,
      ListComponent,
      DetailComponent,
      BaseComponent,
      GridComponent,
      SelectedDirective,
    ],
    imports: [
      SolidCoreModule,
      SolidCoreModule,
      i3.RouterModule,
      MatTabsModule,
      i1.ɵNgxsFeatureModule,
      MatButtonModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatProgressSpinnerModule,
      MatToolbarModule,
      MatTreeModule,
      MatCardModule,
    ],
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidProfileModule,
    providers: [ProfileDefinitionService],
    imports: [
      SolidCoreModule,
      SolidCoreModule,
      SolidProfileRoutingModule,
      MatTabsModule,
      ngxsFeatureModule,
      MatButtonModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatProgressSpinnerModule,
      MatToolbarModule,
      MatTreeModule,
      MatCardModule,
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SolidProfileModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          declarations: [
            TreeComponent,
            ListComponent,
            DetailComponent,
            BaseComponent,
            GridComponent,
            SelectedDirective,
          ],
          imports: [
            SolidCoreModule,
            SolidCoreModule,
            SolidProfileRoutingModule,
            MatTabsModule,
            ngxsFeatureModule,
            MatButtonModule,
            MatExpansionModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatListModule,
            MatProgressSpinnerModule,
            MatToolbarModule,
            MatTreeModule,
            MatCardModule,
          ],
          providers: [ProfileDefinitionService],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i1$2.MatIconRegistry }, { type: i2$1.DomSanitizer }];
  },
});

/**
 * Generated bundle index. Do not edit.
 */

export {
  BaseComponent,
  SOLID_PROFILE_BASE_URL,
  SolidProfileModule,
  ngxsFeatureModule,
};
//# sourceMappingURL=zentrumnawi-solid-profile.mjs.map
