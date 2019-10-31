import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../../../../environments/environment";
import {configurations} from "./crystalsystemdetail-configuration";

type Models = 'cubic' | 'hexagonal' | 'monoclinic' | 'orthorhombic' | 'trigonal' | 'tetragonal' | 'triclinic';

@Component({
  selector: 'app-crystalsystemdetail',
  templateUrl: './crystalsystemdetail.component.html',
  styleUrls: ['./crystalsystemdetail.component.scss']
})
export class CrystalsystemdetailComponent {
  @ViewChild('iframe', {static: false}) public IFrame!: ElementRef;
  public Configs = configurations;
  public SelectedConfig = configurations[0];
  public Layer = configurations[0].layers.length > 0 ? configurations[0].layers[0].name : '';
  public ShowInPreview = environment.preview;
  public Model = this.SelectedConfig.name;

  constructor(private _dialog: MatDialog) {
  }

  public onToggleSolidClick() {
    this.IFrame.nativeElement.contentWindow.toggleFaces();
  }

  public onTogglePointsClick() {
    this.IFrame.nativeElement.contentWindow.togglePoints();
  }

  public onTogglePerspectiveClick() {
    this.IFrame.nativeElement.contentWindow.togglePerspective();
  }

  public onToggleAxisClick() {
    this.IFrame.nativeElement.contentWindow.toggleAxis();
  }

  public onLayerSelectChange(newLayer: number) {
    this.Layer = newLayer;
    this.IFrame.nativeElement.contentWindow.toggleHighlight(newLayer);
  }

  public onModelSelectChange(newModel: Models) {
    this.SelectedConfig = this.Configs.find(c => c.name === newModel)!;
    this.Model = this.SelectedConfig.name;
    this.Layer = this.SelectedConfig.layers.length > 0 ? this.SelectedConfig.layers[0].name : '';
    this.IFrame.nativeElement.contentWindow.switchModel(newModel);
    this.IFrame.nativeElement.contentWindow.toggleHighlight(this.Layer);
  }

  onInfoClick() {
    // this._dialog.open(InfoOverlayComponent, {
    //   data: {
    //     title: this.ModelNames[this.Model],
    //     text: this.Descriptions[this.Model]
    //   }
    // });
  }
}
