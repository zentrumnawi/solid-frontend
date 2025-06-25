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

  dataChange = new BehaviorSubject<(TreeNode | Profile)[]>([]);

  get data(): (TreeNode | Profile)[] {
    return this.dataChange.value;
  }
  set data(value: (TreeNode | Profile)[]) {
    //this.DataSource.data = value;
    //this.TreeControl.dataNodes = this._treeFlattener.flattenNodes(value);
    this.dataChange.next(value);
    this.DataSource.data = value;
    // this.TreeControl.dataNodes = this._treeFlattener.flattenNodes(value);
    // this.dataChange.next(value);
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
  static getLevel(node: FlatTreeNode) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  static isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get the children for the node. */
  static getChildren(node: TreeNode | Profile) {
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
      //this.DataSource.data = rootNodes;
      //this.dataChange.next(rootNodes);
      this.expandSelectedNode();
      if (this.coreConfig.expandProfileTree) this.TreeControl.expandAll();
    });
  }

  public ngAfterViewInit(): void {
    this.selectedElements.changes.subscribe((_) => this.scrollTo());
    // keep track of expanded nodes ("added")
    this.TreeControl.expansionModel.changed.subscribe(change => {
      if (change.added) {
        console.log("expansion model changed", change.added);
        // change.added
        //   .filter(n => n.type === 'category')
        //   .forEach(node => {
        //     this.loadChildren(node).then(() => {
        //       this.onNodeClick(node);
        //     });
        //   });
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log("expanding selected node");
    this.expandSelectedNode();
    if (this.collapseTree) this.TreeControl.collapseAll();
  }

  /** Get whether the node has children or not. */
  public hasChild(index: number, node: FlatTreeNode) {
    console.log("hasChild", node);
    return node.expandable;
  }

  public hasNoChild(index: number, node: FlatTreeNode) {
    console.log("hasNoChild", node);
    return !node.expandable;
  }

  onNodeClick(node: EntryNode | CategoryNode) {
    if (this.TreeControl.isExpanded(node)) {
      console.log("collapsing node", node);
      this.TreeControl.collapse(node);
      this._selectedNode = null;
    } else {
      if (node.type === 'category') {
        console.log("expanding node", node);
        this.loadChildren(node).then(() => {
          const newNode = this.TreeControl.dataNodes.find(n => n.id === node.id);
          if (newNode) {
            this.TreeControl.expand(newNode);
          }
        });
      }
      this.TreeControl.expand(node);
      this._selectedNode = node;
    }
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
    console.log("entering loadChildren");
    if (node.loaded || !node.expandable) {
     return Promise.resolve();
    }
    node.loading = true;
    //this.dataChange.next(this.data);

    return new Promise((resolve) => {
    this._store.dispatch(new GetChildren(node.id));
    console.log("loading children of", node);
    console.log("childrenById$", this.childrenById$.pipe(take(1)).subscribe(childrenMap => {
      console.log("childrenMap", childrenMap);
    }));
    this.childrenById$.pipe(
      map(childrenMap => childrenMap[node.id]),
      filter(children => !!children),
      take(1)
    ).subscribe(children => {
      console.log("updating children", children);
      const nodeToUpdateIndex = this.data.findIndex(n => n.id === node.id);
      if (nodeToUpdateIndex !== -1) {
        console.log("updating node", this.data[nodeToUpdateIndex]);
        const updatedNode = { ...this.data[nodeToUpdateIndex], children };
        const newData = [
          ...this.data.slice(0, nodeToUpdateIndex),
          updatedNode,
          ...this.data.slice(nodeToUpdateIndex + 1)
        ];
        this.data = newData;
      }
      console.log("node again", this.data[nodeToUpdateIndex]);
      if (nodeToUpdateIndex !== -1) {
        //this.data[nodeToUpdateIndex].loaded = true;
        //this.data[nodeToUpdateIndex].loading = false;
      }
      //this.dataChange.next(this.data);
      console.log("this data", this.data);
      console.log("current datasource", this.DataSource.data);
      console.log("flattened data (dataNodes)", this.TreeControl.dataNodes);
      //console.log("hasChild", this.hasChild(0, node));
      //this.dataChange.next(this.data);
      resolve();
    })
    });
  }
}
