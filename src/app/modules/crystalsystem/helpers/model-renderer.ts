import {ElementRef} from "@angular/core";
import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {WEBGL} from "./three-webgl";
import { OrbitControls } from 'three-orbitcontrols-ts';

export abstract class ThreeRenderer {
  protected _scene = new Scene();
  private readonly _camera: PerspectiveCamera;
  private readonly _renderer: WebGLRenderer;
  private readonly _controls: OrbitControls;

  protected constructor(private _container: ElementRef) {
    this._scene = new Scene();
    const width = this._container.nativeElement.clientWidth;
    const height = this._container.nativeElement.clientHeight;

    // camera
    this._camera = new PerspectiveCamera(75, width / height, 0.1, 2000);
    this._scene.add(this._camera);
    this._camera.position.set(0, 150, 400);
    this._camera.lookAt(this._scene.position);

    // renderer
    const canvas = document.createElement( 'canvas' );
    if (WEBGL.isWebGL2Available()) {
      const context = canvas.getContext('webgl2') as WebGLRenderingContext;
      this._renderer = new WebGLRenderer({
        canvas,
        context,
        antialias: true,
        alpha: true
      });
    } else if (WEBGL.isWebGLAvailable()) {
      const context = canvas.getContext('webgl') as WebGLRenderingContext;
      this._renderer = new WebGLRenderer({
        canvas,
        context,
        antialias: true,
        alpha: true
      });
    } else {
      throw new Error("no webgl support");
    }
    this._renderer = new WebGLRenderer({antialias: true, alpha: true});
    this._renderer.setSize(width, height);
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    this._controls.enablePan = false;
    this._controls.enableZoom = true;
    this._controls.zoomSpeed = 1.0;
    this._controls.minZoom = 100;
    this._controls.maxZoom = 500;
  }

  public start() {
    this._container.nativeElement.appendChild(this._renderer.domElement);
    this.animate();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this._controls.update();
    this._renderer.render(this._scene, this._camera);
  }
}
