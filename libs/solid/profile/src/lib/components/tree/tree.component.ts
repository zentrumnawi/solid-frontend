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
import { ChildrenLoaded, GetChildren, GetEntries, GetRootNodes, SetNavigateProfileFromURL, SetFullPaths, SetExpandedNodeIds, SetSelectedProfilePath } from '../../state/profile.actions';
import { Store } from '@ngxs/store';
import { Select } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedDirective } from '../selected.directive';
import {
  MediaModel,
  SolidCoreConfig,
  SOLID_CORE_CONFIG,
} from '@zentrumnawi/solid-core';
import { ProfileState } from '../../state/profile.state';
import { SelectionChange } from '@angular/cdk/collections';
import { EnsureEntryPath } from '../../state/profile.actions';

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
  @Input() splitLayout!: boolean;

  public DataSource: MatTreeFlatDataSource<LazyTreeNode | Profile, FlatTreeNode>;
  // The TreeControl controls the expand/collapse state of tree nodes
  public readonly TreeControl: FlatTreeControl<FlatTreeNode>;

  // The TreeFlattener is used to generate the flat list of items from hierarchical data
  private readonly _treeFlattener: MatTreeFlattener<
    LazyTreeNode | Profile,
    FlatTreeNode
  >;

  private _selectedNode: CategoryNode | EntryNode | null = null;
  private _previousSelectedProfileId?: number;
  private _previousSelectedProfileType?: string;

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
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
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

  }

  static transformer(node: LazyTreeNode | Profile, level: number): FlatTreeNode {
    if (node.type === 'category') {
      return {
        id: node.id,
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
    // console.log("getting already fetched children of", node);
    if (node.type === 'category') {
      //console.log("returning already fetched children", node.children, node.profiles);
      //console.log("of node", node);
      return [...(node.children ?? []), ...(node.profiles ?? [])];
    }
    return null;
  }

  public ngOnInit(): void {
    
    // console.log("show datachange", this.dataChange.value);
    const roots = this._store.selectSnapshot(ProfileState.selectRootNodes);
    const childrenById = this._store.selectSnapshot(ProfileState.selectChildrenById);
    const entriesById = this._store.selectSnapshot(ProfileState.selectEntries);
    const expandedNodeIds = this._store.selectSnapshot(ProfileState.selectExpandedNodeIds);
    const selectedProfile = this._store.selectSnapshot(ProfileState.selectSelectedProfile);
    const selectedProfilePath = this._store.selectSnapshot(ProfileState.selectSelectedProfilePath);
  
    console.log("childrenById", childrenById);
    console.log("entriesById", entriesById);
    console.log("selected profile per url", this._activatedRoute.snapshot.params);
    console.log("selected profile", selectedProfile);

    console.log("oooooninit-openpath", this._store.selectSnapshot(ProfileState.selectSelectedProfilePath))
    // make mutable copy of roots
    const mutableRoots = roots.map(root => 
      this.reconstructNode(root, childrenById, entriesById)
    );
    
    this.dataChange.next(mutableRoots);
    console.log("roots", mutableRoots);
    console.log("oninit-openpath", this.openPath);
    
    // necessary for mobile view to return to state of expansion before choosing profile
    // If there are no dataNodes yet, automatic path expansion takes over -> ngOnChanges
    if(!this.splitLayout && this.TreeControl.dataNodes.length > 0) {
    setTimeout(() => {
      console.log("restore exp nodes", expandedNodeIds);
       this.TreeControl.dataNodes.forEach(n => {
           if (expandedNodeIds.includes(n.id)) this.TreeControl.expand(n);
         });
       }, 0);
    }
  }

  public async ngAfterViewInit(): Promise<void> {
    this.selectedElements.changes.subscribe((_) => {
      // Only scroll if the selected profile has actually changed
      const hasSelectionChanged = 
        this.selectedProfileId !== this._previousSelectedProfileId ||
        this.selectedProfileType !== this._previousSelectedProfileType;
      
      if (hasSelectionChanged && this.selectedElements.length > 0) {
        this._previousSelectedProfileId = this.selectedProfileId;
        this._previousSelectedProfileType = this.selectedProfileType;
        this.scrollTo();
      }
    });
    // Use expansionModel.changed for lazy loading
    this.TreeControl.expansionModel.changed.subscribe(async change => {
      console.log("ooooopenpath", this.openPath);
      // only expand if openPath is not set
      if(this._store.selectSnapshot(ProfileState.selectNavigateProfileFromURL) && this.openPath?.length) return;
      if (change.added) {
        console.log("(ngAfterViewInit) expanding bcs of change.added", change.added);
        const nodesToLoad = change.added
          .filter(n => n.type === 'category' && !n.loaded);
        
        // Sequential execution of loading children
        for (const node of nodesToLoad) {
          console.log("(ngAfterViewInit) loading children of", node);
          await this.loadChildren(node);
          const newNode = this.TreeControl.dataNodes.find(n2 => this.areNodesEqual(n2, node));
          if (newNode && newNode.loaded) {
            console.log("(ngAfterViewInit) expanding newNode", newNode);
            this.expandParents(newNode);
            this.TreeControl.expand(newNode);
          }
        }
      }
      //this._selectedNode = null
    });
  }
 
  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    console.log("expanding selected node insicde ngOnChanges", this.selectedProfileId);
    console.log("changes", changes);
    console.log("nnnavigateProfileFromURL", this._store.selectSnapshot(ProfileState.selectNavigateProfileFromURL));
    // automatically expand path from root to leav
    if('openPath' in changes && changes['selectedProfileId']?.currentValue !== -1 && changes['openPath'].currentValue.length > 0 ) {
      console.log("change is openPath");
      console.log("openPath", changes['openPath'].currentValue);
      const nodesToLoad = changes['openPath'].currentValue
      .filter((n: LazyTreeNode) => n.type === 'category');
    
    await this.expandAlongOpenPath(nodesToLoad);
    this.openPath = [];
    this._store.dispatch(new SetSelectedProfilePath([]));
    this._store.dispatch(new SetNavigateProfileFromURL(false));
    }
  }


private async expandAlongOpenPath(path: LazyTreeNode[]): Promise<void> {
  const nodesToLoad = [...path];
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
      //this.TreeControl.expand(node);
      this.expandParents(node);
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

    console.log('Starting loadChildren for', node);

    // Preserve expansion state
    const expandedIds = new Set(
      this.TreeControl.dataNodes
        .filter(n => this.TreeControl.isExpanded(n))
        .map(n => n.id)
    );

    node.loading = true;

    return new Promise((resolve, reject) => {
      forkJoin({
        childrenAction: this._store.dispatch(new GetChildren(node.id)),
        entriesAction: this._store.dispatch(new GetEntries(node.id))
      }).pipe(
        switchMap(() =>
          forkJoin({
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
          })
        )
      ).subscribe({
        next: ({ children, entries }) => {
          this.updateNodeChildrenPatch(this.data, node.id, children, entries);
          this.dataChange.next(this.data);

          // Restore expansion state after data update -> necessary becaue of dataChange.next
          setTimeout(() => {
            this.TreeControl.dataNodes.forEach(n => {
              if (expandedIds.has(n.id)) {
                this.TreeControl.expand(n);
              }
            });
          }, 0);

          // After restoring expansion, update store
          setTimeout(() => {
            const expandedIds = this.TreeControl.dataNodes
              .filter(n => this.TreeControl.isExpanded(n))
              .map(n => n.id);
            this._store.dispatch(new SetExpandedNodeIds(expandedIds));
          }, 0);

          resolve();
        },
        error: (error) => {
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
    //console.log("entries inside patch", entries);
    //console.log("tree inside patch", tree);
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

  private reconstructNode(
    node: LazyTreeNode,
    childrenById: { [id: number]: LazyTreeNode[] },
    entriesById: { [id: number]: Profile[] }
  ): LazyTreeNode {
    const cachedChildren = childrenById[node.id];
    const cachedEntries = entriesById[node.id];
    
    // if we have cached data, attach it and recursively reconstruct children
    if (cachedChildren || cachedEntries) {
      console.log("found cached data for node", node.id);
      return {
        ...node,
        children: cachedChildren 
          ? cachedChildren.map(child => 
              this.reconstructNode(child, childrenById, entriesById)
            )
          : node.children,
        profiles: cachedEntries || node.profiles,
        loaded: true,
        loading: false
      };
    }
    
    return { ...node };
  }
  
  
  
  
}
