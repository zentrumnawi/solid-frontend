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
import { Observable, BehaviorSubject, of, take, map, filter, forkJoin, catchError, switchMap, timeout } from 'rxjs';
import { LazyTreeNode, Profile, TreeNode } from '../../state/profile.model';
import { ChildrenLoaded, GetChildren, GetEntries, GetRootNodes, SetNavigateProfileFromURL } from '../../state/profile.actions';
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
import { SelectionChange } from '@angular/cdk/collections';

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
  @Input() openPath?: LazyTreeNode[];
  @Input() navigateProfileFromURL!: boolean;

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

  static getLevel(node: FlatTreeNode) {
    return node.level;
  }

  static isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  static getChildren(node: LazyTreeNode | Profile) {
    console.log("getting already fetched children of", node);
    if (node.type === 'category') {
      console.log("returning already fetched children", node.children, node.profiles);
      console.log("of node", node);
      return [...(node.children ?? []), ...(node.profiles ?? [])];
    }
    return null;
  }

  public ngOnInit(): void {
    // this._store.dispatch(new GetRootNodes()).pipe(take(1)).subscribe(() => {
    //   const roots = this._store.selectSnapshot(ProfileState.selectRootNodes);
    //   // make mutable copy of roots
    //   const mutableRoots = roots.map(root => ({ ...root }));
    //   this.dataChange.next(mutableRoots);
    //   console.log(Array.isArray(roots));
    //   console.log("roots", roots);
    //   //Promise.resolve().then(() => this.expandSelectedNode());
    //   if (this.coreConfig.expandProfileTree) this.TreeControl.expandAll();
    // });
    const roots = this._store.selectSnapshot(ProfileState.selectRootNodes);
    // make mutable copy of roots
    const mutableRoots = roots.map(root => ({ ...root }));
    this.dataChange.next(mutableRoots);
    console.log(Array.isArray(roots));
    console.log("roots", roots);
    //Promise.resolve().then(() => this.expandSelectedNode());
    if (this.coreConfig.expandProfileTree) this.TreeControl.expandAll();
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
      console.log("ooooopenpath", this.openPath);
      if(this.openPath?.length) return;
      if (change.added) {
        // if('openPath' in change.added) {
        //   console.log("change is openPath")
        // }
        console.log("expansion model changed", change.added);
        change.added
          .filter(n => n.type === 'category' && !n.loaded)
          .forEach(node => {
            console.log("(ngInit) loading children of", node);
            this.loadChildren(node).then(() => {
              const newNode = this.TreeControl.dataNodes.find(n2 => this.areNodesEqual(n2, node));
              if (newNode && newNode.loaded) {
                console.log("(ngInit) expanding newNode", newNode);
                this.expandParents(newNode);
                this.TreeControl.expand(newNode);
              }
              console.log("(ngInit) flat data (expansionModel)", this.TreeControl.dataNodes);
            });
            
          });
          
        // this._selectedNode = this.TreeControl.dataNodes.find(n => n.type === 'entry' && n.id === this.selectedProfileId &&
        //   n.def_type === this.selectedProfileType) ?? null;
      }
      //this._selectedNode = null
    });
  }
 
  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    console.log("expanding selected node insicde ngOnChanges", this.selectedProfileId);
    console.log("changes", changes);
    if('openPath' in changes && changes['selectedProfileId']?.currentValue !== -1 && changes['openPath'].currentValue.length > 0 && this.navigateProfileFromURL) {
      console.log("change is openPath");
      console.log("openPath", changes['openPath'].currentValue);
      const nodesToLoad = changes['openPath'].currentValue
      .filter((n: LazyTreeNode) => n.type === 'category' && !n.loaded);
    
    for (const node of nodesToLoad) {
      const flatNode = this.TreeControl.dataNodes.find(n => n.id === node.id);
      
      console.log("(ngOnChanges) loading children of", node);
      if (flatNode) {
        try {
          await this.loadChildren(flatNode);
          const newNode = this.TreeControl.dataNodes.find(n2 => this.areNodesEqual(n2, flatNode));
          console.log("(ngOnChanges) newNode", newNode);
          
          if (newNode && newNode.loaded) {
            console.log("(ngOnChanges) expanding newNode", newNode);
            this.expandParents(newNode);
            this.TreeControl.expand(newNode);
          }
          console.log("(ngOnChanges) flat data (expansionModel)", this.TreeControl.dataNodes);
        } catch (error) {
          console.error('Error loading children for node:', node, error);
        }
      }
    }
          this.openPath = [];
          this.navigateProfileFromURL = false;
          this._store.dispatch(new SetNavigateProfileFromURL(false));
    }
    
    if (!this.openPath?.length) { return; }

    console.log("collapsing tree", this.collapseTree);
    if (this.collapseTree) this.TreeControl.collapseAll();
  }

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
      // if (this._selectedNode) {
      //   const children = this.TreeControl.getDescendants(this._selectedNode);
      //   console.log("############selected node", this._selectedNode);
      //   console.log("clicked node", node);
      //   console.log("children of sel node", children);
      //   if (
      //     !children ||
      //     (Array.isArray(children) && !children.includes(node))
      //   ) {
      //     console.log("collapsing sel node", this._selectedNode);
      //     this.TreeControl.collapse(this._selectedNode);
      //     for (const dataNode of this.TreeControl.dataNodes) {
      //       const c = this.TreeControl.getDescendants(dataNode);
      //       if (
      //         c &&
      //         Array.isArray(c) &&
      //         c.includes(this._selectedNode) &&
      //         !c.includes(node)
      //       ) {
      //         this.TreeControl.collapse(dataNode);
      //       }
      //     }
      //   }
      // }
      this.TreeControl.expand(node);
      this._selectedNode = node;
    }
  }

  private expandSelectedNode() {
    console.log("expanding selected node", this.selectedProfileId, this.selectedProfileType);
    if (this.TreeControl.dataNodes) {
      console.log("data nodes", this.TreeControl.dataNodes);
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
    console.log("expanding parents of", node);
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
    if (node.loaded || !node.expandable || (node?.type === 'category' && node.children && node.children.length > 0)) {
      return Promise.resolve();
    }
    console.log("startig loadChildren for", node);
    
    //this.data = this.updateNodeChildren(this.data, node.id, undefined, { loading: true });
    //Object.assign(node, { loading: true });
    node.loading = true;

    return new Promise((resolve, reject) => {
      forkJoin({
        childrenAction: this._store.dispatch(new GetChildren(node.id)),
        entriesAction: this._store.dispatch(new GetEntries(node.id))
      }).pipe(
        switchMap(() => forkJoin({
          children: this.childrenById$.pipe(
            map(childrenMap => childrenMap[node.id]),
            filter(children => !!children),
            take(1),
            timeout(5000)
          ),
          entries: this.entries$.pipe(
            map(entriesMap => entriesMap[node.id]),
            filter(entries => !!entries),
            take(1),
            timeout(5000)
          )
        }))
      ).subscribe({
        next: ({ children, entries }) => {
          this.updateNodeChildrenPatch(this.data, node.id, children, entries);
          node.loaded = true;
          node.loading = false;
          this.dataChange.next(this.data);
          resolve();
        },
        error: (error) => {
          node.loading = false;
          console.error('Error loading children:', error);
          reject(error);
        }
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
    console.log("entries inside patch", entries);
    console.log("tree inside patch", tree);
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
