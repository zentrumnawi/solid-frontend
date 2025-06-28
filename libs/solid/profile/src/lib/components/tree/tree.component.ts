import { FlatTreeControl } from '@angular/cdk/tree';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Observable, BehaviorSubject, of, take, map, filter } from 'rxjs';
import { LazyTreeNode, Profile, TreeNode } from '../../state/profile.model';
import { GetChildren, GetRootNodes } from '../../state/profile.actions';
import { Store } from '@ngxs/store';
import { Select } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { SelectedDirective } from '../selected.directive';
import {
  MediaModel,
  SolidCoreConfig,
  SOLID_CORE_CONFIG,
} from '@zentrumnawi/solid-core';
import { ProfileState } from '../../state/profile.state';

export type FlatTreeNode = EntryNode | CategoryNode;

export interface EntryNode {
  title: string;
  subtitle: string;
  type: 'entry';
  level: number;
  mediaObjects: MediaModel[];
  expandable: boolean;
  id: number;
  def_type: string;
  loaded?: boolean;
  loading?: boolean;
}

export interface CategoryNode {
  type: 'category';
  id: number;
  title: string;
  info: string | null;
  level: number;
  expandable: boolean;
  loaded?: boolean;
  loading?: boolean;
  children?: (CategoryNode | EntryNode)[];
}

@Component({
  selector: 'solid-profile-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChildren(SelectedDirective, { read: ElementRef })
  public selectedElements!: QueryList<ElementRef>;
  @Input() selectedProfileId?: number;
  @Input() selectedProfileType?: string;
  @Input() profiles!: Observable<TreeNode[]>;
  @Select(ProfileState.selectRootNodes) rootNodes!: Observable<(TreeNode | Profile)[]>;
  //@Select(ProfileState.selectChildren) children!: Observable<TreeNode[]>;
  @Select(ProfileState.selectChildrenById) childrenById$!: Observable<{ [id: number]: TreeNode[] }>;
  @Output() selectProfile = new EventEmitter<
    number | { id: number; type: string }
  >();
  @Output() selectProfileTitle = new EventEmitter<string>();
  @Input() isDiveApp = false;
  @Input() collapseTree = false;
  @ViewChild('profileTree') profileTree: any;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  public DataSource: MatTreeFlatDataSource<TreeNode | Profile, FlatTreeNode>;
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  public readonly TreeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  private readonly _treeFlattener: MatTreeFlattener<
    TreeNode | Profile,
    FlatTreeNode
  >;

  private _selectedNode: CategoryNode | EntryNode | null = null;

  dataChange = new BehaviorSubject<(TreeNode)[]>([]);

  get data(): (TreeNode)[] {
    return this.dataChange.value;
  }
  set data(value: (TreeNode)[]) {
    this.dataChange.next(value);
    this.DataSource.data = value;
  }

  constructor(
    private _store: Store,
    private _route: ActivatedRoute,
    @Inject(SOLID_CORE_CONFIG) private coreConfig: SolidCoreConfig,
  ) {
    this._treeFlattener = new MatTreeFlattener(
      TreeComponent.transformer,
      TreeComponent.getLevel,
      TreeComponent.isExpandable,
      (node) => TreeComponent.getChildren(node),
    );

    this.TreeControl = new FlatTreeControl(
      TreeComponent.getLevel,
      TreeComponent.isExpandable,
    );
    this.DataSource = new MatTreeFlatDataSource(
      this.TreeControl,
      this._treeFlattener,
    );

    this.dataChange.subscribe(tree => this.DataSource.data = tree);

    // this.rootNodes.subscribe(rootNodes => {
    //   this._store.dispatch(new GetRootNodes());
    // });
  }

  /** Transform the data to something the tree can read. */
  static transformer(node: TreeNode | Profile, level: number): FlatTreeNode {
    console.log("transforming node", node);
    if (node.type === 'category') {
      return {
        id: node.id,
        // loaded: node.loaded,
        // loading: node.loading,
        // children: node.children,
        title: node.name,
        type: 'category',
        info: node.info,
        level: level,
        expandable: true,
        loaded: node.loaded,
        loading: node.loading,
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
        loaded: node.loaded,
        loading: node.loading,
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
  static getChildren(node: TreeNode | Profile) {
    console.log("getting children of", node);
    if (node.type === 'category') {
      console.log("returning children", node.children);
      console.log("of node", node);
      return node.children ?? [];
    }
    return null;
  }

  public ngOnInit(): void {
    this._store.dispatch(new GetRootNodes()).pipe(take(1)).subscribe(() => {
      const roots = this._store.selectSnapshot(ProfileState.selectRootNodes);
      this.dataChange.next(roots);
      console.log(Array.isArray(roots));
      console.log(roots);
      //this.expandSelectedNode();
      if (this.coreConfig.expandProfileTree) this.TreeControl.expandAll();
    });
  }

  public ngAfterViewInit(): void {
    this.selectedElements.changes.subscribe((_) => this.scrollTo());
    // Use expansionModel.changed for lazy loading
    this.TreeControl.expansionModel.changed.subscribe(change => {
      if (change.added) {
        console.log("expansion model changed", change.added);
        change.added
          .filter(n => n.type === 'category' && !n.loaded)
          .forEach(node => {
            console.log("loading children of", node);
            this.loadChildren(node).then(() => {
              const newNode = this.TreeControl.dataNodes.find(n2 => n2.id === node.id);
              // if (newNode && !newNode.loaded) {
              //   this.TreeControl.expand(newNode);
              // }
              console.log("flat data (expansionModel)", this.TreeControl.dataNodes);
            });
            
          });
        //this._selectedNode = this.TreeControl.dataNodes.find(n => n.id === change.added[0].id)!;
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log("expanding selected node");
    //this.expandSelectedNode();
    console.log("collapsing tree", this.collapseTree);
    if (this.collapseTree) this.TreeControl.collapseAll();
  }

  /** Get whether the node has children or not. */
  public hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  public hasNoChild(index: number, node: FlatTreeNode) {
    return !node.expandable;
  }

  onNodeClick(node: EntryNode | CategoryNode) {
    // Only handle selection or custom actions here
    this._selectedNode = node;
    // const newNode = this.TreeControl.dataNodes.find(n => n.id === node.id);
    //     if (newNode && !this.TreeControl.isExpanded(newNode)) {
    //       this.expandParents(newNode);
    //       this.TreeControl.expand(newNode);
    //     }
    // If you want to emit selection events, do it here
  }

  private expandSelectedNode() {
    if (this.TreeControl.dataNodes) {
      this.TreeControl.dataNodes
        .filter((n) => n.type === 'entry')
        .forEach((node) => {
          const profileNode = node as EntryNode;
          if (
            profileNode.id === this.selectedProfileId &&
            profileNode.def_type === this.selectedProfileType
          ) {
            this.expandParents(node);
          }
        });
    }
  }

  private expandParents(node: FlatTreeNode): void {
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

  public scrollTo() {
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

  public getClassName(level: string | null) {
    return `category level-${level}`;
  }

  private loadChildren(node: FlatTreeNode): Promise<void> {
    if (node.loaded || !node.expandable) {
      return Promise.resolve();
    }
    console.log("startig loadChildren for", node);
    
    this.data = this.updateNodeChildren(this.data, node.id, undefined, { loading: true });

    return new Promise((resolve) => {
      this._store.dispatch(new GetChildren(node.id));
      this.childrenById$.pipe(
        map(childrenMap => childrenMap[node.id]),
        filter(children => !!children),
        take(1)
      ).subscribe(children => {
        // Ensure children are in correct format
        const formattedChildren = children.map(child => {
          if (child.type === 'category') {
            return { ...child, expandable: true };
          } else {
            return { ...child, expandable: false };
          }
        });
        // Update the data with the new children and set loaded = true, loading = false
        this.data = this.updateNodeChildren(this.data, node.id, formattedChildren, { loaded: true, loading: false });
        console.log("data (loadChildren) after update", this.data);
        // Optionally, re-expand the node if needed
        const newNode = this.TreeControl.dataNodes.find(n => n.id === node.id);
        if (newNode && !this.TreeControl.isExpanded(newNode)) {
          this.expandParents(newNode);
          this.TreeControl.expand(newNode);
        }
        resolve();
      });
    });
  }

  private updateNodeChildren(tree: (TreeNode)[], nodeId: number, children?: TreeNode[], flags: Partial<TreeNode> = {}): (TreeNode)[] {
    return tree.map(n => {
      if (n.id === nodeId) {
        return { ...n, ...(children !== undefined ? { children } : {}), ...flags };
      } else if ('children' in n && Array.isArray(n.children)) {
        return { ...n, children: this.updateNodeChildren(n.children, nodeId, children, flags) };
      } else {
        return n;
      }
    });
  }
}
