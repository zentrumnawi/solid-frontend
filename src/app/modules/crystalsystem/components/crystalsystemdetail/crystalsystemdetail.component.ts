import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {ThreeRenderer} from "../../helpers/model-renderer";
import {ExampleRenderer} from "../../models/example-renderer";

// import "p5/lib/addons/p5.dom";

@Component({
  selector: 'app-crystalsystemdetail',
  templateUrl: './crystalsystemdetail.component.html',
  styleUrls: ['./crystalsystemdetail.component.scss']
})
export class CrystalsystemdetailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('renderContainer') public Container!: ElementRef;
  private _renderer?: ThreeRenderer;

  public ngAfterViewInit(): void {
    this._renderer = new ExampleRenderer(this.Container);
    this._renderer.start();
  }

  public ngOnDestroy(): void {
  }
}
