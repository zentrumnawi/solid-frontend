import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';

@Component({
  selector: 'app-crystalsystemdetail',
  templateUrl: './crystalsystemdetail.component.html',
  styleUrls: ['./crystalsystemdetail.component.scss']
})
export class CrystalsystemdetailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('iframe') public IFrame!: ElementRef;
  public Layer = 0;

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

  public onToggleAxisClick() {
    this.IFrame.nativeElement.contentWindow.toggleAxis();
  }

  public onLayerSelectChange(newLayer: number) {
    this.Layer = newLayer;
    this.IFrame.nativeElement.contentWindow.toggleHighlight(newLayer);
  }
}
