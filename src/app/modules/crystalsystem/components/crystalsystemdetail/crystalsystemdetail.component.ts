import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {InfoOverlayComponent} from "../info-overlay/info-overlay.component";

type Models = 'cubic' | 'hexagonal' | 'monoclinic' | 'orthorhombic' | 'trigonal' | 'tetragonal' | 'triclinic';

@Component({
  selector: 'app-crystalsystemdetail',
  templateUrl: './crystalsystemdetail.component.html',
  styleUrls: ['./crystalsystemdetail.component.scss']
})
export class CrystalsystemdetailComponent {
  @ViewChild('iframe', { static: false}) public IFrame!: ElementRef;
  public Layer = 0;
  public Model: Models = 'cubic';
  public Descriptions: { [key: string]: string} = {};
  public ModelNames = {
      cubic: 'kubisch',
      hexagonal: 'hexagonal',
      monoclinic: 'monoklin',
      orthorhombic: 'orthorhombisch',
      trigonal: 'trigonal',
      tetragonal: 'tetragonal',
      triclinic: 'triklin'
    };

  constructor(http: HttpClient, private _dialog: MatDialog) {
    http.get<{[key: string]: string}>('/assets/crystalsystem/geometry/infotext.json').toPromise().then(v => {
      this.Descriptions = v;
    });
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
    this.Model = newModel;
    this.IFrame.nativeElement.contentWindow.switchModel(newModel);
  }

  onInfoClick() {
    this._dialog.open(InfoOverlayComponent, {
      data: {
        title: this.ModelNames[this.Model],
        text: this.Descriptions[this.Model]
      }
    });
  }
}
