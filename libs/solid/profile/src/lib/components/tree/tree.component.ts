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
import { Observable, BehaviorSubject, of, take, map, filter, forkJoin } from 'rxjs';
import { LazyTreeNode, Profile, TreeNode } from '../../state/profile.model';
import { ChildrenLoaded, GetChildren, GetEntries, GetRootNodes } from '../../state/profile.actions';
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
  @Input() rootNodes!: Observable<(LazyTreeNode)[]>;
  //@Select(ProfileState.selectRootNodes) rootNodes!: Observable<(LazyTreeNode)[]>;
  //@Select(ProfileState.selectChildren) children!: Observable<TreeNode[]>;
  @Select(ProfileState.selectChildrenById) childrenById$!: Observable<{ [id: number]: LazyTreeNode[] }>;
  @Select(ProfileState.selectEntries) entries$!: Observable<{ [id: number]: Profile[] }>;
  @Output() selectProfile = new EventEmitter<
    number | { id: number; type: string }
  >();
  @Output() selectProfileTitle = new EventEmitter<string>();
  @Input() isDiveApp = false;
  @Input() collapseTree = false;
  @ViewChild('profileTree') profileTree: any;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  public DataSource: MatTreeFlatDataSource<LazyTreeNode | Profile, FlatTreeNode>;
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  public readonly TreeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  private readonly _treeFlattener: MatTreeFlattener<
    LazyTreeNode | Profile,
    FlatTreeNode
  >;

  private _selectedNode: CategoryNode | EntryNode | null = null;

  dataChange = new BehaviorSubject<(LazyTreeNode)[]>([]);

  get data(): (LazyTreeNode)[] {
    return this.dataChange.value;
  }
  set data(value: (LazyTreeNode)[]) {
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
  static transformer(node: LazyTreeNode | Profile, level: number): FlatTreeNode {
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
        loading: false,
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
        loading: false,
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
  static getChildren(node: LazyTreeNode | Profile) {
    console.log("getting children of", node);
    if (node.type === 'category') {
      console.log("returning children", node.children);
      console.log("of node", node);
      return [...(node.children ?? []), ...(node.profiles ?? [])];
    }
    return null;
  }

  public ngOnInit(): void {
    this._store.dispatch(new GetRootNodes()).pipe(take(1)).subscribe(() => {
      const roots = this._store.selectSnapshot(ProfileState.selectRootNodes);
      // make mutable copy of roots
      const mutableRoots = roots.map(root => ({ ...root }));
      this.dataChange.next(mutableRoots);
      console.log(Array.isArray(roots));
      console.log(roots);
      this.expandSelectedNode();
      if (this.coreConfig.expandProfileTree) this.TreeControl.expandAll();
    });
    // this.rootNodes.subscribe((rootNodes: LazyTreeNode[]) => {
    //   const mutableRoots = rootNodes.map(root => ({ ...root }));
    //   this.dataChange.next(mutableRoots);
    //   this.expandSelectedNode();
    //   if (this.coreConfig.expandProfileTree) this.TreeControl.expandAll();
    // }); 
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
              const newNode = this.TreeControl.dataNodes.find(n2 => this.areNodesEqual(n2, node));
              if (newNode && !newNode.loaded) {
                this.TreeControl.expand(newNode);
              }
              console.log("flat data (expansionModel)", this.TreeControl.dataNodes);
            });
            
          });
          
        // this._selectedNode = this.TreeControl.dataNodes.find(n => n.type === 'entry' && n.id === this.selectedProfileId &&
        //   n.def_type === this.selectedProfileType) ?? null;
      }
      this._selectedNode = null
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

  private areNodesEqual(node1: FlatTreeNode, node2: FlatTreeNode) {
    if (node1.type === 'entry' && node2.type === 'entry') {
      return node1.id === node2.id && node1.def_type === node2.def_type;
    } else if (node1.type === 'category' && node2.type === 'category') {
      return node1.id === node2.id;
    }
    return false;
  }

  onNodeClick(node: EntryNode | CategoryNode) {
    if (this.TreeControl.isExpanded(node)) {
      this.TreeControl.collapse(node);
      this._selectedNode = null;
    } else {
      if (this._selectedNode) {
        const children = this.TreeControl.getDescendants(this._selectedNode);
        console.log("children of sel node", children);
        if (
          !children ||
          (Array.isArray(children) && !children.includes(node))
        ) {
          console.log("collapsing sel node", this._selectedNode);
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
    
    //this.data = this.updateNodeChildren(this.data, node.id, undefined, { loading: true });
    Object.assign(node, { loading: true });

    return new Promise((resolve) => {
      this._store.dispatch(new GetChildren(node.id));
      this._store.dispatch(new GetEntries(node.id));
      forkJoin({
        children: this.childrenById$.pipe(
          map(childrenMap => childrenMap[node.id]),
          filter(children => !!children),
          take(1)
        ),
        entries: this.entries$.pipe(
          map(entriesMap => entriesMap[node.id]),
          filter(entries => !!entries),
          take(1)
        )
      }).subscribe(({ children, entries }) => {
        //this._store.dispatch(new ChildrenLoaded(node.id, children, entries));
        // Update the data with the new children and set loaded = true, loading = false
        //this.data = this.updateNodeChildren(this.data, node.id, children, { loaded: true, loading: false });
        this.updateNodeChildrenPatch(this.data, node.id, children, entries);
        //this.data = this.updateNodeProfiles(this.data, node.id, children, entries);
        this.dataChange.next(this.data);
        console.log("data (loadChildren) after update", this.data);
        // Optionally, re-expand the node if needed
        const newNode = this.TreeControl.dataNodes.find(n => this.areNodesEqual(n, node));
        // if (newNode) {
        //   this.TreeControl.expand(newNode);
        // }
        if (newNode && !this.TreeControl.isExpanded(newNode)) {
          this.expandParents(newNode);
          this.TreeControl.expand(newNode);
        }
        resolve();
      });
    });
  }

  private updateNodeChildren(tree: (LazyTreeNode)[], nodeId: number, children?: LazyTreeNode[], flags: Partial<LazyTreeNode> = {}): (LazyTreeNode)[] {
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

  private updateNodeChildrenPatch(tree: (LazyTreeNode)[], nodeId: number, children?: LazyTreeNode[], entries?: Profile[], flags: Partial<LazyTreeNode> = {}) {
    tree.forEach(n => {
      if (n.id === nodeId) {
        n.children = children?.map(c => ({ ...c})) ?? null;
        n.loaded = true;
        n.loading = false;
        n.profiles = entries?.map(e => ({ ...e})) ?? null;
      } else if ('children' in n && Array.isArray(n.children)) {
        this.updateNodeChildrenPatch(n.children, nodeId, children, entries, flags);
      }
    });
  }

  private updateNodeProfiles(
    nodes: LazyTreeNode[],
    targetId: number,
    newChildren: LazyTreeNode[],
    newProfiles: Profile[]
  ): LazyTreeNode[] {
    return nodes.map(node => {
      if (node.id === targetId) {
        return {
          ...node,
          children: newChildren,
          profiles: newProfiles
        };
      } else if (node.children) {
        return {
          ...node,
          children: this.updateNodeProfiles(node.children, targetId, newChildren, newProfiles)
        };
      } else {
        return node;
      }
    });
  }
}
