import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {ActivatedRoute, Router} from '@angular/router';
import {activateRoutes} from '@angular/router/src/operators/activate_routes';
import {select, Store} from '@ngrx/store';
import {of as observableOf} from 'rxjs';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {ImageFiles} from '../../../../shared/models';
import {ProfileService} from '../../services/profile.service';
import {Profile, ProfileAppState} from '../../state/profile.model';
import {selectProfiles} from '../../state/selectors';

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
  title: string
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-profile-tree',
  templateUrl: './profile-tree.component.html',
  styleUrls: ['./profile-tree.component.scss'],
})
export class ProfileTreeComponent extends BaseComponent {
  public Selected: string = '';
  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  public DataSource: MatTreeFlatDataSource<Profile, FlatTreeNode>;
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  public readonly TreeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  private readonly _treeFlattener: MatTreeFlattener<Profile, FlatTreeNode>;


  constructor(
    private _service: ProfileService,
    store: Store<ProfileAppState>,
    private _router: Router,
    route: ActivatedRoute,
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
    this.addSub(store.pipe(select(selectProfiles)).subscribe(profiles => {
      this.DataSource.data = profiles;
    }));
    // route.children[0].params.subscribe(params => console.log(params));
  }

  /** Transform the data to something the tree can read. */
  static transformer(node: Profile, level: number): FlatTreeNode {
    if (node.type === 'category') {
      return {
        title: node.title,
        type: 'category',
        level: level,
        expandable: true,
      };
    } else {
      return {
        title: node.name,
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

  /** Get whether the node has children or not. */
  public hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  public selectProfile(profileId: string) {
    this.Selected = profileId;
    this._router.navigate(['profile', profileId]);
  }

  public onImageLoaded(node: FlatTreeNode) {
    if (node.type === 'mineral') {
      node.imageLoaded = true;
    }
  }
}
