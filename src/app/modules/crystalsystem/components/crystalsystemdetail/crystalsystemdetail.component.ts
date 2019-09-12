import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';

type Models = 'cubic' | 'hexagonal' | 'monoclinic' | 'orthorhombic' | 'rhombohedral' | 'tetragonal' | 'triclinic';

@Component({
  selector: 'app-crystalsystemdetail',
  templateUrl: './crystalsystemdetail.component.html',
  styleUrls: ['./crystalsystemdetail.component.scss']
})
export class CrystalsystemdetailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('iframe') public IFrame!: ElementRef;
  public Layer = 0;
  public Model: Models = 'cubic';

  public ngAfterViewInit(): void {

  }

  public ngOnDestroy(): void {
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
}
