import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { Observable, of as observableOf } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { Image, Profile } from '../../state/profile.model';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';

export type FlatTreeNode = MineralNode | CategoryNode;

export interface MineralNode {
  title: string;
  type: 'mineral';
  level: number;
  images: Image[];
  expandable: false;
  id: number;
}

export interface CategoryNode {
  type: 'category';
  title: string;
  info: string | null;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'solid-profile-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  @Input() selectedProfileId?: number;
  @Input() profiles!: Observable<Profile[]>;
  @Output() select = new EventEmitter<number>();

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  public DataSource: MatTreeFlatDataSource<Profile, FlatTreeNode>;
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  public readonly TreeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  private readonly _treeFlattener: MatTreeFlattener<Profile, FlatTreeNode>;

  private _selectedNode: CategoryNode | MineralNode | null = null;

  constructor(
    private _service: ProfileService,
    private _store: Store,
    private _route: ActivatedRoute
  ) {
    this._treeFlattener = new MatTreeFlattener(
      TreeComponent.transformer,
      TreeComponent.getLevel,
      TreeComponent.isExpandable,
      node => TreeComponent.getChildren(node)
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
  static transformer(node: Profile, level: number): FlatTreeNode {
    if (node.type === 'category') {
      return {
        title: node.title,
        type: 'category',
        info: node.description,
        level: level,
        expandable: true
      };
    } else {
      return {
        title: node.variety ? node.variety : node.mineralName,
        id: node.id,
        type: 'mineral',
        level: level,
        expandable: false,
        images: node.images
      };
    }
  }

  /** Get the level of the node */
  static getLevel(node: FlatTreeNode) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  static isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get the children for the node. */
  static getChildren(node: Profile) {
    if (node.type === 'category') {
      return observableOf(node.children);
    } else {
      return null;
    }
  }

  public ngOnInit(): void {
    this.profiles.subscribe(profiles => {
      console.log(profiles);
      this.DataSource.data = profiles;
    });
  }

  /** Get whether the node has children or not. */
  public hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  public hasNoChild(index: number, node: FlatTreeNode) {
    return !node.expandable;
  }

  onNodeClick(node: MineralNode | CategoryNode) {
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
          for (let dataNode of this.TreeControl.dataNodes) {
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
}
