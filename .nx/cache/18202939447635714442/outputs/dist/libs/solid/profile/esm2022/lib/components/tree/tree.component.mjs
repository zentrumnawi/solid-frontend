import { FlatTreeControl } from '@angular/cdk/tree';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { SelectedDirective } from '../selected.directive';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
import * as i1 from '@ngxs/store';
import * as i2 from '@angular/router';
import * as i3 from '@angular/common';
import * as i4 from '@zentrumnawi/solid-core';
import * as i5 from '@angular/material/button';
import * as i6 from '@angular/material/icon';
import * as i7 from '@angular/material/tree';
import * as i8 from '../selected.directive';
export class TreeComponent {
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
      { token: i2.ActivatedRoute },
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
        type: i3.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i4.MarkdownComponent,
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
        type: i6.MatIcon,
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
        type: i8.SelectedDirective,
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
      { type: i2.ActivatedRoute },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3Byb2ZpbGUvc3JjL2xpYi9jb21wb25lbnRzL3RyZWUvdHJlZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3Byb2ZpbGUvc3JjL2xpYi9jb21wb25lbnRzL3RyZWUvdHJlZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFFVCxTQUFTLEVBQ1QsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsZ0JBQWdCLEdBQ2pCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBR0wsaUJBQWlCLEdBQ2xCLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7Ozs7QUE0QmpDLE1BQU0sT0FBTyxhQUFhO0lBNEJkO0lBQ0E7SUFDMkI7SUE1QjlCLGdCQUFnQixDQUF5QjtJQUN2QyxpQkFBaUIsQ0FBVTtJQUMzQixtQkFBbUIsQ0FBVTtJQUM3QixRQUFRLENBQTBCO0lBQ2pDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFFdkMsQ0FBQztJQUNNLGtCQUFrQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFDakQsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNsQixZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQ0osV0FBVyxDQUFNO0lBRTNDLG9GQUFvRjtJQUM3RSxVQUFVLENBQTBEO0lBQzNFLHlFQUF5RTtJQUN6RCxXQUFXLENBQWdDO0lBRTNELDJGQUEyRjtJQUMxRSxjQUFjLENBRzdCO0lBRU0sYUFBYSxHQUFvQyxJQUFJLENBQUM7SUFFOUQsWUFDVSxNQUFhLEVBQ2IsTUFBc0IsRUFDSyxVQUEyQjtRQUZ0RCxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQ2IsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDSyxlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQUU5RCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksZ0JBQWdCLENBQ3hDLGFBQWEsQ0FBQyxXQUFXLEVBQ3pCLGFBQWEsQ0FBQyxRQUFRLEVBQ3RCLGFBQWEsQ0FBQyxZQUFZLEVBQzFCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUMxQyxDQUFDO1FBRUYsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FDcEMsYUFBYSxDQUFDLFFBQVEsRUFDdEIsYUFBYSxDQUFDLFlBQVksQ0FDM0IsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxxQkFBcUIsQ0FDekMsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFRCx5REFBeUQ7SUFDekQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUF3QixFQUFFLEtBQWE7UUFDeEQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtZQUM1QixPQUFPO2dCQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDaEIsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixLQUFLLEVBQUUsS0FBSztnQkFDWixVQUFVLEVBQUUsSUFBSTthQUNqQixDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDWCxJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsS0FBSztnQkFDWixVQUFVLEVBQUUsS0FBSztnQkFDakIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2dCQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDeEIsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELGdDQUFnQztJQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQWtCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsK0NBQStDO0lBQy9DLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBa0I7UUFDcEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxxQ0FBcUM7SUFDckMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUF3QjtRQUN6QyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0M7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBYSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7Z0JBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxlQUFlO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sV0FBVyxDQUFDLE9BQXNCO1FBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLFlBQVk7WUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRCxnREFBZ0Q7SUFDekMsUUFBUSxDQUFDLEtBQWEsRUFBRSxJQUFrQjtRQUMvQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVNLFVBQVUsQ0FBQyxLQUFhLEVBQUUsSUFBa0I7UUFDakQsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDMUIsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUE4QjtRQUN4QyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzNCO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDckUsSUFDRSxDQUFDLFFBQVE7b0JBQ1QsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNyRDtvQkFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzlDLEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7d0JBQ2pELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNwRCxJQUNFLENBQUM7NEJBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQ2hCLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzs0QkFDOUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUNqQjs0QkFDQSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzt5QkFDckM7cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUztpQkFDdkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQztpQkFDakMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sV0FBVyxHQUFHLElBQWlCLENBQUM7Z0JBQ3RDLElBQ0UsV0FBVyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsaUJBQWlCO29CQUN6QyxXQUFXLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxtQkFBbUIsRUFDakQ7b0JBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDMUI7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQztJQUVPLGFBQWEsQ0FBQyxJQUFrQjtRQUN0QyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLE9BQU87U0FDUjtRQUNELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEUsS0FBSyxJQUFJLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUIsTUFBTTthQUNQO1NBQ0Y7SUFDSCxDQUFDO0lBRU0sUUFBUTtRQUNiLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztZQUNqRCxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNULE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDO2dCQUNoQyxRQUFRLEVBQUUsUUFBUTtnQkFDbEIsS0FBSyxFQUFFLFNBQVM7YUFDakIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sWUFBWSxDQUFDLEtBQW9CO1FBQ3RDLE9BQU8sa0JBQWtCLEtBQUssRUFBRSxDQUFDO0lBQ25DLENBQUM7dUdBbE1VLGFBQWEscUVBOEJkLGlCQUFpQjsyRkE5QmhCLGFBQWEsK2JBQ1YsaUJBQWlCLDJCQUFVLFVBQVUsa0RDMURyRCw0dUZBeUZBOzsyRkRoQ2EsYUFBYTtrQkFMekIsU0FBUzsrQkFDRSxvQkFBb0I7OzBCQWtDM0IsTUFBTTsyQkFBQyxpQkFBaUI7NENBNUJwQixnQkFBZ0I7c0JBRHRCLFlBQVk7dUJBQUMsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQUU1QyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csbUJBQW1CO3NCQUEzQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0ksYUFBYTtzQkFBdEIsTUFBTTtnQkFHRyxrQkFBa0I7c0JBQTNCLE1BQU07Z0JBQ0UsU0FBUztzQkFBakIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNvQixXQUFXO3NCQUFwQyxTQUFTO3VCQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGbGF0VHJlZUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9jZGsvdHJlZSc7XHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3Q2hpbGRyZW4sXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgTWF0VHJlZUZsYXREYXRhU291cmNlLFxyXG4gIE1hdFRyZWVGbGF0dGVuZXIsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdHJlZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgUHJvZmlsZSwgVHJlZU5vZGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9wcm9maWxlLm1vZGVsJztcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU2VsZWN0ZWREaXJlY3RpdmUgfSBmcm9tICcuLi9zZWxlY3RlZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQge1xyXG4gIE1lZGlhTW9kZWwsXHJcbiAgU29saWRDb3JlQ29uZmlnLFxyXG4gIFNPTElEX0NPUkVfQ09ORklHLFxyXG59IGZyb20gJ0B6ZW50cnVtbmF3aS9zb2xpZC1jb3JlJztcclxuXHJcbmV4cG9ydCB0eXBlIEZsYXRUcmVlTm9kZSA9IEVudHJ5Tm9kZSB8IENhdGVnb3J5Tm9kZTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRW50cnlOb2RlIHtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIHN1YnRpdGxlOiBzdHJpbmc7XHJcbiAgdHlwZTogJ2VudHJ5JztcclxuICBsZXZlbDogbnVtYmVyO1xyXG4gIG1lZGlhT2JqZWN0czogTWVkaWFNb2RlbFtdO1xyXG4gIGV4cGFuZGFibGU6IGZhbHNlO1xyXG4gIGlkOiBudW1iZXI7XHJcbiAgZGVmX3R5cGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDYXRlZ29yeU5vZGUge1xyXG4gIHR5cGU6ICdjYXRlZ29yeSc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBpbmZvOiBzdHJpbmcgfCBudWxsO1xyXG4gIGxldmVsOiBudW1iZXI7XHJcbiAgZXhwYW5kYWJsZTogYm9vbGVhbjtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzb2xpZC1wcm9maWxlLXRyZWUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90cmVlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90cmVlLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xyXG4gIEBWaWV3Q2hpbGRyZW4oU2VsZWN0ZWREaXJlY3RpdmUsIHsgcmVhZDogRWxlbWVudFJlZiB9KVxyXG4gIHB1YmxpYyBzZWxlY3RlZEVsZW1lbnRzITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkUHJvZmlsZUlkPzogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkUHJvZmlsZVR5cGU/OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHJvZmlsZXMhOiBPYnNlcnZhYmxlPFRyZWVOb2RlW10+O1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RQcm9maWxlID0gbmV3IEV2ZW50RW1pdHRlcjxcclxuICAgIG51bWJlciB8IHsgaWQ6IG51bWJlcjsgdHlwZTogc3RyaW5nIH1cclxuICA+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdFByb2ZpbGVUaXRsZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gIEBJbnB1dCgpIGlzRGl2ZUFwcCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGNvbGxhcHNlVHJlZSA9IGZhbHNlO1xyXG4gIEBWaWV3Q2hpbGQoJ3Byb2ZpbGVUcmVlJykgcHJvZmlsZVRyZWU6IGFueTtcclxuXHJcbiAgLyoqIFRoZSBNYXRUcmVlRmxhdERhdGFTb3VyY2UgY29ubmVjdHMgdGhlIGNvbnRyb2wgYW5kIGZsYXR0ZW5lciB0byBwcm92aWRlIGRhdGEuICovXHJcbiAgcHVibGljIERhdGFTb3VyY2U6IE1hdFRyZWVGbGF0RGF0YVNvdXJjZTxUcmVlTm9kZSB8IFByb2ZpbGUsIEZsYXRUcmVlTm9kZT47XHJcbiAgLyoqIFRoZSBUcmVlQ29udHJvbCBjb250cm9scyB0aGUgZXhwYW5kL2NvbGxhcHNlIHN0YXRlIG9mIHRyZWUgbm9kZXMuICAqL1xyXG4gIHB1YmxpYyByZWFkb25seSBUcmVlQ29udHJvbDogRmxhdFRyZWVDb250cm9sPEZsYXRUcmVlTm9kZT47XHJcblxyXG4gIC8qKiBUaGUgVHJlZUZsYXR0ZW5lciBpcyB1c2VkIHRvIGdlbmVyYXRlIHRoZSBmbGF0IGxpc3Qgb2YgaXRlbXMgZnJvbSBoaWVyYXJjaGljYWwgZGF0YS4gKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IF90cmVlRmxhdHRlbmVyOiBNYXRUcmVlRmxhdHRlbmVyPFxyXG4gICAgVHJlZU5vZGUgfCBQcm9maWxlLFxyXG4gICAgRmxhdFRyZWVOb2RlXHJcbiAgPjtcclxuXHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWROb2RlOiBDYXRlZ29yeU5vZGUgfCBFbnRyeU5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9zdG9yZTogU3RvcmUsXHJcbiAgICBwcml2YXRlIF9yb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBASW5qZWN0KFNPTElEX0NPUkVfQ09ORklHKSBwcml2YXRlIGNvcmVDb25maWc6IFNvbGlkQ29yZUNvbmZpZ1xyXG4gICkge1xyXG4gICAgdGhpcy5fdHJlZUZsYXR0ZW5lciA9IG5ldyBNYXRUcmVlRmxhdHRlbmVyKFxyXG4gICAgICBUcmVlQ29tcG9uZW50LnRyYW5zZm9ybWVyLFxyXG4gICAgICBUcmVlQ29tcG9uZW50LmdldExldmVsLFxyXG4gICAgICBUcmVlQ29tcG9uZW50LmlzRXhwYW5kYWJsZSxcclxuICAgICAgKG5vZGUpID0+IFRyZWVDb21wb25lbnQuZ2V0Q2hpbGRyZW4obm9kZSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5UcmVlQ29udHJvbCA9IG5ldyBGbGF0VHJlZUNvbnRyb2woXHJcbiAgICAgIFRyZWVDb21wb25lbnQuZ2V0TGV2ZWwsXHJcbiAgICAgIFRyZWVDb21wb25lbnQuaXNFeHBhbmRhYmxlXHJcbiAgICApO1xyXG4gICAgdGhpcy5EYXRhU291cmNlID0gbmV3IE1hdFRyZWVGbGF0RGF0YVNvdXJjZShcclxuICAgICAgdGhpcy5UcmVlQ29udHJvbCxcclxuICAgICAgdGhpcy5fdHJlZUZsYXR0ZW5lclxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKiBUcmFuc2Zvcm0gdGhlIGRhdGEgdG8gc29tZXRoaW5nIHRoZSB0cmVlIGNhbiByZWFkLiAqL1xyXG4gIHN0YXRpYyB0cmFuc2Zvcm1lcihub2RlOiBUcmVlTm9kZSB8IFByb2ZpbGUsIGxldmVsOiBudW1iZXIpOiBGbGF0VHJlZU5vZGUge1xyXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ2NhdGVnb3J5Jykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRpdGxlOiBub2RlLm5hbWUsXHJcbiAgICAgICAgdHlwZTogJ2NhdGVnb3J5JyxcclxuICAgICAgICBpbmZvOiBub2RlLmluZm8sXHJcbiAgICAgICAgbGV2ZWw6IGxldmVsLFxyXG4gICAgICAgIGV4cGFuZGFibGU6IHRydWUsXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRpdGxlOiBub2RlLm5hbWUsXHJcbiAgICAgICAgc3VidGl0bGU6IG5vZGUuc3ViX25hbWUsXHJcbiAgICAgICAgaWQ6IG5vZGUuaWQsXHJcbiAgICAgICAgdHlwZTogJ2VudHJ5JyxcclxuICAgICAgICBsZXZlbDogbGV2ZWwsXHJcbiAgICAgICAgZXhwYW5kYWJsZTogZmFsc2UsXHJcbiAgICAgICAgbWVkaWFPYmplY3RzOiBub2RlLm1lZGlhT2JqZWN0cyxcclxuICAgICAgICBkZWZfdHlwZTogbm9kZS5kZWZfdHlwZSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIGxldmVsIG9mIHRoZSBub2RlICovXHJcbiAgc3RhdGljIGdldExldmVsKG5vZGU6IEZsYXRUcmVlTm9kZSkge1xyXG4gICAgcmV0dXJuIG5vZGUubGV2ZWw7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHdoZXRoZXIgdGhlIG5vZGUgaXMgZXhwYW5kZWQgb3Igbm90LiAqL1xyXG4gIHN0YXRpYyBpc0V4cGFuZGFibGUobm9kZTogRmxhdFRyZWVOb2RlKSB7XHJcbiAgICByZXR1cm4gbm9kZS5leHBhbmRhYmxlO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgY2hpbGRyZW4gZm9yIHRoZSBub2RlLiAqL1xyXG4gIHN0YXRpYyBnZXRDaGlsZHJlbihub2RlOiBUcmVlTm9kZSB8IFByb2ZpbGUpIHtcclxuICAgIGlmIChub2RlLnR5cGUgPT09ICdjYXRlZ29yeScpIHtcclxuICAgICAgcmV0dXJuIFsuLi5ub2RlLmNoaWxkcmVuLCAuLi5ub2RlLnByb2ZpbGVzXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5wcm9maWxlcy5zdWJzY3JpYmUoKHByb2ZpbGVzOiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5EYXRhU291cmNlLmRhdGEgPSBwcm9maWxlcztcclxuICAgICAgdGhpcy5leHBhbmRTZWxlY3RlZE5vZGUoKTtcclxuICAgICAgaWYgKHRoaXMuY29yZUNvbmZpZy5leHBhbmRQcm9maWxlVHJlZSkgdGhpcy5UcmVlQ29udHJvbC5leHBhbmRBbGwoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRFbGVtZW50cy5jaGFuZ2VzLnN1YnNjcmliZSgoXykgPT4gdGhpcy5zY3JvbGxUbygpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICB0aGlzLmV4cGFuZFNlbGVjdGVkTm9kZSgpO1xyXG4gICAgaWYgKHRoaXMuY29sbGFwc2VUcmVlKSB0aGlzLlRyZWVDb250cm9sLmNvbGxhcHNlQWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHdoZXRoZXIgdGhlIG5vZGUgaGFzIGNoaWxkcmVuIG9yIG5vdC4gKi9cclxuICBwdWJsaWMgaGFzQ2hpbGQoaW5kZXg6IG51bWJlciwgbm9kZTogRmxhdFRyZWVOb2RlKSB7XHJcbiAgICByZXR1cm4gbm9kZS5leHBhbmRhYmxlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhc05vQ2hpbGQoaW5kZXg6IG51bWJlciwgbm9kZTogRmxhdFRyZWVOb2RlKSB7XHJcbiAgICByZXR1cm4gIW5vZGUuZXhwYW5kYWJsZTtcclxuICB9XHJcblxyXG4gIG9uTm9kZUNsaWNrKG5vZGU6IEVudHJ5Tm9kZSB8IENhdGVnb3J5Tm9kZSkge1xyXG4gICAgaWYgKHRoaXMuVHJlZUNvbnRyb2wuaXNFeHBhbmRlZChub2RlKSkge1xyXG4gICAgICB0aGlzLlRyZWVDb250cm9sLmNvbGxhcHNlKG5vZGUpO1xyXG4gICAgICB0aGlzLl9zZWxlY3RlZE5vZGUgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5UcmVlQ29udHJvbC5nZXREZXNjZW5kYW50cyh0aGlzLl9zZWxlY3RlZE5vZGUpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICFjaGlsZHJlbiB8fFxyXG4gICAgICAgICAgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pICYmICFjaGlsZHJlbi5pbmNsdWRlcyhub2RlKSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMuVHJlZUNvbnRyb2wuY29sbGFwc2UodGhpcy5fc2VsZWN0ZWROb2RlKTtcclxuICAgICAgICAgIGZvciAoY29uc3QgZGF0YU5vZGUgb2YgdGhpcy5UcmVlQ29udHJvbC5kYXRhTm9kZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgYyA9IHRoaXMuVHJlZUNvbnRyb2wuZ2V0RGVzY2VuZGFudHMoZGF0YU5vZGUpO1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgYyAmJlxyXG4gICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoYykgJiZcclxuICAgICAgICAgICAgICBjLmluY2x1ZGVzKHRoaXMuX3NlbGVjdGVkTm9kZSkgJiZcclxuICAgICAgICAgICAgICAhYy5pbmNsdWRlcyhub2RlKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICB0aGlzLlRyZWVDb250cm9sLmNvbGxhcHNlKGRhdGFOb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLlRyZWVDb250cm9sLmV4cGFuZChub2RlKTtcclxuICAgICAgdGhpcy5fc2VsZWN0ZWROb2RlID0gbm9kZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXhwYW5kU2VsZWN0ZWROb2RlKCkge1xyXG4gICAgaWYgKHRoaXMuVHJlZUNvbnRyb2wuZGF0YU5vZGVzKSB7XHJcbiAgICAgIHRoaXMuVHJlZUNvbnRyb2wuZGF0YU5vZGVzXHJcbiAgICAgICAgLmZpbHRlcigobikgPT4gbi50eXBlID09PSAnZW50cnknKVxyXG4gICAgICAgIC5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBwcm9maWxlTm9kZSA9IG5vZGUgYXMgRW50cnlOb2RlO1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBwcm9maWxlTm9kZS5pZCA9PT0gdGhpcy5zZWxlY3RlZFByb2ZpbGVJZCAmJlxyXG4gICAgICAgICAgICBwcm9maWxlTm9kZS5kZWZfdHlwZSA9PT0gdGhpcy5zZWxlY3RlZFByb2ZpbGVUeXBlXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5leHBhbmRQYXJlbnRzKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHBhbmRQYXJlbnRzKG5vZGU6IEZsYXRUcmVlTm9kZSk6IHZvaWQge1xyXG4gICAgaWYgKG5vZGUubGV2ZWwgPT09IDApIHtcclxuICAgICAgdGhpcy5UcmVlQ29udHJvbC5leHBhbmQobm9kZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLlRyZWVDb250cm9sLmRhdGFOb2Rlcy5pbmRleE9mKG5vZGUpIC0gMTtcclxuICAgIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpID49IDA7IGktLSkge1xyXG4gICAgICBpZiAodGhpcy5UcmVlQ29udHJvbC5kYXRhTm9kZXNbaV0ubGV2ZWwgPT09IG5vZGUubGV2ZWwgLSAxKSB7XHJcbiAgICAgICAgdGhpcy5leHBhbmRQYXJlbnRzKHRoaXMuVHJlZUNvbnRyb2wuZGF0YU5vZGVzW2ldKTtcclxuICAgICAgICB0aGlzLlRyZWVDb250cm9sLmV4cGFuZChub2RlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNjcm9sbFRvKCkge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNhcmQgPSB0aGlzLnNlbGVjdGVkRWxlbWVudHMuZmlyc3QgfHwgbnVsbDtcclxuICAgICAgaWYgKCFjYXJkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNhcmQubmF0aXZlRWxlbWVudC5zY3JvbGxJbnRvVmlldyh7XHJcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxyXG4gICAgICAgIGJsb2NrOiAnbmVhcmVzdCcsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q2xhc3NOYW1lKGxldmVsOiBzdHJpbmcgfCBudWxsKSB7XHJcbiAgICByZXR1cm4gYGNhdGVnb3J5IGxldmVsLSR7bGV2ZWx9YDtcclxuICB9XHJcbn1cclxuIiwiPCEtLXN1cHByZXNzIEFuZ3VsYXJJbnZhbGlkRXhwcmVzc2lvblJlc3VsdFR5cGUgLS0+XHJcbjxtYXQtdHJlZSBbZGF0YVNvdXJjZV09XCJEYXRhU291cmNlXCIgW3RyZWVDb250cm9sXT1cIlRyZWVDb250cm9sXCI+XHJcbiAgPG1hdC10cmVlLW5vZGVcclxuICAgIChjbGljayk9XCJcclxuICAgICAgc2VsZWN0UHJvZmlsZS5lbWl0KHsgaWQ6IG5vZGUuaWQsIHR5cGU6IG5vZGUuZGVmX3R5cGUgfSk7XHJcbiAgICAgIHNlbGVjdFByb2ZpbGVUaXRsZS5lbWl0KG5vZGUudGl0bGUpXHJcbiAgICBcIlxyXG4gICAgKm1hdFRyZWVOb2RlRGVmPVwibGV0IG5vZGU7IHdoZW46IGhhc05vQ2hpbGRcIlxyXG4gICAgY2xhc3M9XCJwcm9maWxlLWxpbmtcIlxyXG4gICAgbWF0VHJlZU5vZGVQYWRkaW5nXHJcbiAgICBtYXRUcmVlTm9kZVRvZ2dsZVxyXG4gICAgW21hdFRyZWVOb2RlUGFkZGluZ0luZGVudF09XCIzMFwiXHJcbiAgPlxyXG4gICAgPGltZ1xyXG4gICAgICBbYWx0XT1cIm5vZGUudGl0bGVcIlxyXG4gICAgICBbc3JjXT1cIlxyXG4gICAgICAgIG5vZGUubWVkaWFPYmplY3RzLmxlbmd0aCA+IDBcclxuICAgICAgICAgID8gbm9kZS5tZWRpYU9iamVjdHNbMF0uZ2V0UmF3SW1hZ2UoJ3RodW1ibmFpbCcpXHJcbiAgICAgICAgICA6ICdhc3NldHMvcHJvZmlsZS9ub190aHVtYm5haWwuc3ZnJ1xyXG4gICAgICBcIlxyXG4gICAgICBjbGFzcz1cInRodW1ibmFpbFwiXHJcbiAgICAvPlxyXG4gICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtdGl0bGVcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICpuZ0lmPVwiXHJcbiAgICAgICAgICBzZWxlY3RlZFByb2ZpbGVJZCA9PT0gbm9kZS5pZCAmJiBzZWxlY3RlZFByb2ZpbGVUeXBlID09PSBub2RlLmRlZl90eXBlXHJcbiAgICAgICAgXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAqbmdJZj1cImlzRGl2ZUFwcFwiXHJcbiAgICAgICAgICBzb2xpZFByb2ZpbGVTZWxlY3RlZFxyXG4gICAgICAgICAgY2xhc3M9XCJzZWxlY3RlZFwiXHJcbiAgICAgICAgICBbZGF0YV09XCJub2RlLnRpdGxlXCJcclxuICAgICAgICAgIG1hcmtkb3duXHJcbiAgICAgICAgPjwvc3Bhbj5cclxuICAgICAgICA8c3BhblxyXG4gICAgICAgICAgKm5nSWY9XCIhaXNEaXZlQXBwXCJcclxuICAgICAgICAgIHNvbGlkUHJvZmlsZVNlbGVjdGVkXHJcbiAgICAgICAgICBjbGFzcz1cInNlbGVjdGVkXCJcclxuICAgICAgICAgIFtpbm5lckhUTUxdPVwibm9kZS50aXRsZVwiXHJcbiAgICAgICAgPjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdGVkXCI+e3sgbm9kZS5zdWJ0aXRsZSB9fTwvc3Bhbj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAqbmdJZj1cIlxyXG4gICAgICAgICAgc2VsZWN0ZWRQcm9maWxlSWQgIT09IG5vZGUuaWQgfHxcclxuICAgICAgICAgIChzZWxlY3RlZFByb2ZpbGVJZCA9PT0gbm9kZS5pZCAmJlxyXG4gICAgICAgICAgICBzZWxlY3RlZFByb2ZpbGVUeXBlICE9PSBub2RlLmRlZl90eXBlKVxyXG4gICAgICAgIFwiXHJcbiAgICAgID5cclxuICAgICAgICA8c3BhblxyXG4gICAgICAgICAgKm5nSWY9XCJpc0RpdmVBcHBcIlxyXG4gICAgICAgICAgY2xhc3M9XCJ0aXRsZS1ub3Qtc2VsZWN0ZWRcIlxyXG4gICAgICAgICAgW2RhdGFdPVwibm9kZS50aXRsZVwiXHJcbiAgICAgICAgICBtYXJrZG93blxyXG4gICAgICAgID48L3NwYW4+XHJcbiAgICAgICAgPHNwYW5cclxuICAgICAgICAgICpuZ0lmPVwiIWlzRGl2ZUFwcFwiXHJcbiAgICAgICAgICBjbGFzcz1cInRpdGxlLW5vdC1zZWxlY3RlZFwiXHJcbiAgICAgICAgICBbaW5uZXJIVE1MXT1cIm5vZGUudGl0bGVcIlxyXG4gICAgICAgID48L3NwYW4+XHJcbiAgICAgICAgPHNwYW4+e3sgbm9kZS5zdWJ0aXRsZSB9fTwvc3Bhbj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2Rpdj5cclxuICA8L21hdC10cmVlLW5vZGU+XHJcblxyXG4gIDxtYXQtdHJlZS1ub2RlXHJcbiAgICAoY2xpY2spPVwib25Ob2RlQ2xpY2sobm9kZSlcIlxyXG4gICAgKm1hdFRyZWVOb2RlRGVmPVwibGV0IG5vZGU7IHdoZW46IGhhc0NoaWxkXCJcclxuICAgIG1hdFRyZWVOb2RlUGFkZGluZ1xyXG4gICAgW21hdFRyZWVOb2RlUGFkZGluZ0luZGVudF09XCIzMFwiXHJcbiAgICAjaGFzQ2hpbGRUcmVlTm9kZVxyXG4gID5cclxuICAgIDxidXR0b24gW2F0dHIuYXJpYS1sYWJlbF09XCIndG9nZ2xlICcgKyBub2RlLnRpdGxlXCIgbWF0LWljb24tYnV0dG9uPlxyXG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJtYXQtaWNvbi1ydGwtbWlycm9yXCI+XHJcbiAgICAgICAge3sgVHJlZUNvbnRyb2wuaXNFeHBhbmRlZChub2RlKSA/ICdleHBhbmRfbW9yZScgOiAnY2hldnJvbl9yaWdodCcgfX1cclxuICAgICAgPC9tYXQtaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gICAgPGRpdj5cclxuICAgICAgPHNwYW4gW2NsYXNzXT1cImdldENsYXNzTmFtZShoYXNDaGlsZFRyZWVOb2RlLmFyaWFMZXZlbClcIj57e1xyXG4gICAgICAgIG5vZGUudGl0bGVcclxuICAgICAgfX08L3NwYW5cclxuICAgICAgPjxiciAvPlxyXG4gICAgICA8c3BhbiAqbmdJZj1cIlRyZWVDb250cm9sLmlzRXhwYW5kZWQobm9kZSkgJiYgbm9kZS5pbmZvXCIgY2xhc3M9XCJpbmZvXCI+e3tcclxuICAgICAgICBub2RlLmluZm9cclxuICAgICAgfX08L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICA8L21hdC10cmVlLW5vZGU+XHJcbjwvbWF0LXRyZWU+XHJcbiJdfQ==
