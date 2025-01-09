if (WEBGL.isWebGLAvailable() === false) {
  document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

const settings = {
  display: {
    axis: false,
    points: false,
    faces: true,
  },
};

const groups = {
  faces: new THREE.Group(),
  borders: new THREE.Group(),
  points: new THREE.Group(),
  axis: new THREE.Group(),
  v_100: new THREE.Group(),
  v_110: new THREE.Group(),
  v_111: new THREE.Group(),
};

let scene, renderer;
let perspectivecam, isocam;
let model = 'cubic';
let perspectivecontrols, isocontrols;

const loader = new THREE.TextureLoader();
const texture = loader.load('/assets/crystalsystem/textures/disc.png');

init();
initModel(model);
animate();

function init() {
  scene = new THREE.Scene();

  // CAMERA
  // Perspective camera
  perspectivecam = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  scene.add(perspectivecam);
  perspectivecam.position.set(15, 20, 30);

  //Orthographic camera (isometric view)
  isocam = new THREE.OrthographicCamera(
    window.innerWidth / -50,
    window.innerWidth / 50,
    window.innerHeight / 50,
    window.innerHeight / -50,
    1,
    1000
  );
  scene.add(isocam);
  isocam.position.set(15, 20, 30);

  //set default camera
  camera = perspectivecam;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // controls (obviously) need to be separate for each camera
  isocontrols = new THREE.OrbitControls(isocam, renderer.domElement);
  isocontrols.minDistance = 20;
  isocontrols.maxDistance = 50;
  isocontrols.maxPolarAngle = Math.PI / 2;

  perspectivecontrols = new THREE.OrbitControls(
    perspectivecam,
    renderer.domElement
  );
  perspectivecontrols.minDistance = 20;
  perspectivecontrols.maxDistance = 50;
  perspectivecontrols.maxPolarAngle = Math.PI / 2;

  //add light
  scene.add(new THREE.AmbientLight(0xffffff));

  // light
  var light = new THREE.PointLight(0xaaaaff, 0.7);
  camera.add(light); //shading not working if ligt added to scene

  // axis helper
  groups.axis.add(new THREE.AxesHelper(15));

  window.addEventListener('resize', onWindowResize, false);

  // add groups
  scene.add(groups.borders);

  if (settings.display.faces) {
    scene.add(groups.faces);
  }

  if (settings.display.axis) {
    scene.add(groups.axis);
  }

  if (settings.display.points) {
    scene.add(groups.points);
  }
}

function initModel(geoStr) {
  // select geometry
  let geo;
  switch (geoStr) {
    case 'cubic':
      geo = cubic;
      break;
    case 'hexagonal':
      geo = hexagonal;
      break;
    case 'monoclinic':
      geo = monoclinic;
      break;
    case 'orthorhombic':
      geo = orthorhombic;
      break;
    case 'trigonal':
      geo = trigonal;
      break;
    case 'tetragonal':
      geo = tetragonal;
      break;
    case 'triclinic':
      geo = triclinic;
      break;
  }
  const vertices = geo.vertices;
  const vertices_100 = geo.vertices_100;
  const vertices_110 = geo.vertices_110;
  const vertices_111 = geo.vertices_111;
  const borders = geo.borders;

  // create points
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0x0080ff,
    map: texture,
    size: 1,
    alphaTest: 0.5,
  });

  const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
  groups.points.remove(...groups.points.children);
  groups.points.add(new THREE.Points(pointsGeometry, pointsMaterial));

  // create faces
  const meshMaterial = new THREE.MeshLambertMaterial({
    color: 0xaaaaaa,
    opacity: 0.5,
    transparent: true,
  });
  const facesGeometry = new THREE.ConvexBufferGeometry(vertices);
  groups.faces.remove(...groups.faces.children);
  groups.faces.add(...createTwoSidedFaces(facesGeometry, meshMaterial));

  // create borders
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
  });
  groups.borders.remove(...groups.borders.children);
  borders.forEach((border) => {
    const geometry = new THREE.Geometry();
    geometry.vertices.push(border[0]);
    geometry.vertices.push(border[1]);
    groups.borders.add(new THREE.Line(geometry, lineMaterial));
  });

  // create special faces
  const highlightMaterial = new THREE.MeshBasicMaterial({
    color: 0x32c832,
    transparent: true,
    opacity: 0.7,
  });

  const geometry_100 = new THREE.ConvexBufferGeometry(vertices_100);
  groups.v_100.remove(...groups.v_100.children);
  groups.v_100.add(...createTwoSidedFaces(geometry_100, highlightMaterial));

  const geometry_110 = new THREE.ConvexBufferGeometry(vertices_110);
  groups.v_110.remove(...groups.v_110.children);
  groups.v_110.add(...createTwoSidedFaces(geometry_110, highlightMaterial));

  const geometry_111 = new THREE.ConvexBufferGeometry(vertices_111);
  groups.v_111.remove(...groups.v_111.children);
  groups.v_111.add(...createTwoSidedFaces(geometry_111, highlightMaterial));
}

function createTwoSidedFaces(geometry, material) {
  const meshFront = new THREE.Mesh(geometry, material.clone());
  meshFront.material.side = THREE.FrontSide; // front faces
  meshFront.renderOrder = 1;

  const meshBack = new THREE.Mesh(geometry, material.clone());
  meshBack.material.side = THREE.BackSide; // back faces
  meshBack.renderOrder = 0;

  return [meshBack, meshFront];
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  isocontrols.update();
  perspectivecontrols.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

function toggleAxis() {
  if (settings.display.axis) {
    scene.remove(groups.axis);
  } else {
    scene.add(groups.axis);
  }
  settings.display.axis = !settings.display.axis;
}

function togglePoints() {
  if (settings.display.points) {
    scene.remove(groups.points);
  } else {
    scene.add(groups.points);
  }
  settings.display.points = !settings.display.points;
}

function togglePerspective() {
  if (camera.isOrthographicCamera) {
    camera = perspectivecam;
  } else {
    camera = isocam;
  }
}

function toggleFaces() {
  if (settings.display.faces) {
    scene.remove(groups.faces);
  } else {
    scene.add(groups.faces);
  }
  settings.display.faces = !settings.display.faces;
}

function toggleHighlight(value) {
  switch (value) {
    case 0:
      scene.remove(groups.v_100);
      scene.remove(groups.v_110);
      scene.remove(groups.v_111);
      break;
    case 100:
      scene.add(groups.v_100);
      scene.remove(groups.v_110);
      scene.remove(groups.v_111);
      break;
    case 110:
      scene.remove(groups.v_100);
      scene.add(groups.v_110);
      scene.remove(groups.v_111);
      break;
    case 111:
      scene.remove(groups.v_100);
      scene.remove(groups.v_110);
      scene.add(groups.v_111);
      break;
  }
}

function switchModel(value) {
  model = value;
  initModel(model);
}
