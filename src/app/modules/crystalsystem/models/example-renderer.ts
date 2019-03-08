import {ElementRef} from "@angular/core";
import {
  BoxGeometry,
  LineBasicMaterial,
  LineDashedMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  WireframeGeometry
} from "three";
import {ThreeRenderer} from "../helpers/model-renderer";

export class ExampleRenderer extends ThreeRenderer {
  constructor(container: ElementRef) {
    super(container);
    // basic cube
    const geometry = new BoxGeometry( 100, 100, 100 );
    const material = new LineDashedMaterial({ color: 0xFF00FF, linewidth: 1 });
    // const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new Mesh( geometry, material );
    this._scene.add( cube );


    var wireframe = new WireframeGeometry( geometry );

    var line = new LineSegments( wireframe );
    if (!Array.isArray(line.material)) {
      line.material.depthTest = false;
      line.material.transparent = true;
    }

    this._scene.add( line );
  }
}
