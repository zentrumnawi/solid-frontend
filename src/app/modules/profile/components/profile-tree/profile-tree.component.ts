import {FlatTreeControl} from '@angular/cdk/tree';
import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {of as observableOf, Subscription} from 'rxjs';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {ImageFiles} from '../../../../shared/models';
import {ProfileService} from '../../services/profile.service';
import {MineralProfile, Profile, ProfileCategory} from '../../state/profile.model';
import {Store} from "@ngxs/store";
import {Navigate} from "@ngxs/router-plugin";
import {ProfileState} from "../../state/profile.state";
import {map} from "rxjs/operators";

export type FlatTreeNode = MineralNode | CategoryNode;

export interface MineralNode {
  type: 'mineral'
  level: number;
  imageFiles: ImageFiles;
  imageLoaded: boolean;
  expandable: false,
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
  selector: 'app-profile-tree',
  templateUrl: './profile-tree.component.html',
  styleUrls: ['./profile-tree.component.scss'],
})
export class ProfileTreeComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('contentContainer', { static: false }) public ContentContainer!: ElementRef;
  public SplitLayout: boolean = false;
  public Selected?: number = undefined;
  public SelectedProfile?: MineralProfile;
  private SelectedCategory?: ProfileCategory;
  public CanSwipeLeft = false;
  public CanSwipeRight = false;


  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  public DataSource: MatTreeFlatDataSource<Profile, FlatTreeNode>;
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  public readonly TreeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  private readonly _treeFlattener: MatTreeFlattener<Profile, FlatTreeNode>;

  private _storeSub?: Subscription;

  private _selectedNode: CategoryNode | MineralNode | null = null;


  constructor(
    private _service: ProfileService,
    private _store: Store,
  ) {
    super();
    this._service.loadProfiles();

    this._treeFlattener = new MatTreeFlattener(
      ProfileTreeComponent.transformer,
      ProfileTreeComponent.getLevel,
      ProfileTreeComponent.isExpandable,
      node => ProfileTreeComponent.getChildren(node));

    this.TreeControl = new FlatTreeControl(ProfileTreeComponent.getLevel, ProfileTreeComponent.isExpandable);
    this.DataSource = new MatTreeFlatDataSource(this.TreeControl, this._treeFlattener);
    this.addSub(this._store.select(s => s.profile).subscribe(profiles => {
      this.DataSource.data = profiles;
    }));
    this._store.select(s => s.router.state.params).subscribe(params => {
      if (params.id) {
        this.selectProfileInt(parseInt(params.id, 10));
      } else {
        this.selectProfileInt();
      }
    });
  }

  /** Transform the data to something the tree can read. */
  static transformer(node: Profile, level: number): FlatTreeNode {
    if (node.type === 'category') {
      return {
        title: node.title,
        type: 'category',
        info: node.description,
        level: level,
        expandable: true,
      };
    } else {
      return {
        title: node.variety ? node.variety : node.mineralName,
        id: node.id,
        type: 'mineral',
        level: level,
        expandable: false,
        imageFiles: node.imageFiles,
        imageLoaded: false,
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

  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.calculateLayout();
  }

  /** Get whether the node has children or not. */
  public hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  public selectProfile(profileId?: number) {
    console.log(' SELECT', profileId);
    if (profileId) {
      this._store.dispatch( new Navigate(['/profile', profileId]));
    } else {
      this._store.dispatch(new Navigate(['/profile']));
    }
    this.selectProfileInt(profileId);
  }

  private selectProfileInt(profileId?: number) {
    if (profileId) {
      this.Selected = profileId;
      this._store.selectSnapshot(s => s.profile);
      this._storeSub = this._store.select(ProfileState.selectProfile).pipe(map(f => f(profileId))).subscribe(profile => {
        if (profile) {
          this.SelectedProfile = profile.profile;
          this.SelectedCategory = profile.category;
          const index = profile.category.children.indexOf(profile.profile);
          this.CanSwipeLeft = index > 0;
          this.CanSwipeRight = index < profile.category.children.length - 1;
        }
      });
    } else {
      this.Selected = undefined;
      this.SelectedProfile = undefined;
    }
  }

  public swipeLeft() {
    if (this.SelectedCategory && this.SelectedProfile) {
      const index = this.SelectedCategory.children.indexOf(this.SelectedProfile);
      this.selectProfile((this.SelectedCategory.children[index - 1] as MineralProfile).id);
    }
  }

  public swipeRight() {
    console.log(this.SelectedProfile, this.SelectedCategory);
    if (this.SelectedCategory && this.SelectedProfile) {
      const index = this.SelectedCategory.children.indexOf(this.SelectedProfile);
      this.selectProfile((this.SelectedCategory.children[index + 1] as MineralProfile).id);
    }
  }

  public onImageLoaded(node: FlatTreeNode) {
    if (node.type === 'mineral') {
      node.imageLoaded = true;
    }
  }

  public ngAfterViewInit(): void {
    this.calculateLayout();
  }

  private calculateLayout() {
    const split = this.ContentContainer.nativeElement.clientWidth >= 800;
    if (split !== this.SplitLayout) {
      setTimeout(() => {
        this.SplitLayout = split;
      }, 0);
    }
  }

  public onPanEnd($event: HammerInput) {
    if ($event.deltaX > 100 && this.CanSwipeLeft) {
      $event.preventDefault();
      this.swipeLeft();
    } else if ($event.deltaX < -100 && this.CanSwipeRight) {
      $event.preventDefault();
      this.swipeRight();
    }
  }

  onNodeClick(node: MineralNode | CategoryNode) {
    if (this.TreeControl.isExpanded(node)) {
      this.TreeControl.collapse(node);
      this._selectedNode = null;
    } else {
      if (this._selectedNode) {
          const children = this.TreeControl.getDescendants(this._selectedNode);
          if (!children || (Array.isArray(children) && !children.includes(node))) {
            this.TreeControl.collapse(this._selectedNode);
          this.TreeControl.dataNodes.forEach(n => {
            const c = this.TreeControl.getDescendants(n);
            if (c && Array.isArray(c) && c.includes(this._selectedNode!) && !c.includes(node)) {
              this.TreeControl.collapse(n);
            }
          })
          }
        }
      this.TreeControl.expand(node);
      this._selectedNode = node;
    }
  }
}
