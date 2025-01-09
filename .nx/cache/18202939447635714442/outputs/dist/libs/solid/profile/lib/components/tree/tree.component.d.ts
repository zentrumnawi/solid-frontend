import { FlatTreeControl } from '@angular/cdk/tree';
import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { MatTreeFlatDataSource } from '@angular/material/tree';
import { Observable } from 'rxjs';
import { Profile, TreeNode } from '../../state/profile.model';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { MediaModel, SolidCoreConfig } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
export type FlatTreeNode = EntryNode | CategoryNode;
export interface EntryNode {
  title: string;
  subtitle: string;
  type: 'entry';
  level: number;
  mediaObjects: MediaModel[];
  expandable: false;
  id: number;
  def_type: string;
}
export interface CategoryNode {
  type: 'category';
  title: string;
  info: string | null;
  level: number;
  expandable: boolean;
}
export declare class TreeComponent implements OnInit, OnChanges, AfterViewInit {
  private _store;
  private _route;
  private coreConfig;
  selectedElements: QueryList<ElementRef>;
  selectedProfileId?: number;
  selectedProfileType?: string;
  profiles: Observable<TreeNode[]>;
  selectProfile: EventEmitter<
    | number
    | {
        id: number;
        type: string;
      }
  >;
  selectProfileTitle: EventEmitter<string>;
  isDiveApp: boolean;
  collapseTree: boolean;
  profileTree: any;
  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  DataSource: MatTreeFlatDataSource<TreeNode | Profile, FlatTreeNode>;
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  readonly TreeControl: FlatTreeControl<FlatTreeNode>;
  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  private readonly _treeFlattener;
  private _selectedNode;
  constructor(
    _store: Store,
    _route: ActivatedRoute,
    coreConfig: SolidCoreConfig
  );
  /** Transform the data to something the tree can read. */
  static transformer(node: TreeNode | Profile, level: number): FlatTreeNode;
  /** Get the level of the node */
  static getLevel(node: FlatTreeNode): number;
  /** Get whether the node is expanded or not. */
  static isExpandable(node: FlatTreeNode): boolean;
  /** Get the children for the node. */
  static getChildren(node: TreeNode | Profile): (TreeNode | Profile)[] | null;
  ngOnInit(): void;
  ngAfterViewInit(): void;
  ngOnChanges(changes: SimpleChanges): void;
  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode): boolean;
  hasNoChild(index: number, node: FlatTreeNode): boolean;
  onNodeClick(node: EntryNode | CategoryNode): void;
  private expandSelectedNode;
  private expandParents;
  scrollTo(): void;
  getClassName(level: string | null): string;
  static ɵfac: i0.ɵɵFactoryDeclaration<TreeComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    TreeComponent,
    'solid-profile-tree',
    never,
    {
      selectedProfileId: { alias: 'selectedProfileId'; required: false };
      selectedProfileType: { alias: 'selectedProfileType'; required: false };
      profiles: { alias: 'profiles'; required: false };
      isDiveApp: { alias: 'isDiveApp'; required: false };
      collapseTree: { alias: 'collapseTree'; required: false };
    },
    {
      selectProfile: 'selectProfile';
      selectProfileTitle: 'selectProfileTitle';
    },
    never,
    never,
    false,
    never
  >;
}
