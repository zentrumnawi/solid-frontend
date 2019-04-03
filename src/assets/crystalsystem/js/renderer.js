if (WEBGL.isWebGLAvailable() === false) {
  document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

const settings = {
  display: {
    axis: false,
    points: false,
    faces: false,
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

let camera, scene, renderer;
let model = 'cubic';
const loader = new THREE.TextureLoader();
const texture = loader.load('/assets/crystallsystem/textures/disc.png');

init();
initModel(model);
animate();

function init() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // camera
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(15, 20, 30);
  scene.add(camera);

  // controls
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = 20;
  controls.maxDistance = 50;
  controls.maxPolarAngle = Math.PI / 2;

  scene.add(new THREE.AmbientLight(0xFFFFFF));

  // light
  var light = new THREE.PointLight(0xffffff, 1);
  // camera.add( light );

  // axis helper
  groups.axis.add(new THREE.AxesHelper(200));

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
    case "cubic":
      geo = cubic;
      break;
    case "hexagonal":
      geo = hexagonal;
      break;
    case "monoclinic":
      geo = monoclinic;
      break;
    case "orthorhombic":
      geo = orthorhombic;
      break;
    case "rhombohedral":
      geo = rhombohedral;
      break;
    case "tetragonal":
      geo = tetragonal;
      break;
    case "triclinic":
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
    alphaTest: 0.5
  });

  const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
  groups.points.remove(groups.points.children);
  groups.points.add(new THREE.Points(pointsGeometry, pointsMaterial));

  // create faces
  const meshMaterial = new THREE.MeshLambertMaterial({
    color: 0xAAAAAA,
    transparent: true,
    opacity: 0.5
  });
  const facesGeometry = new THREE.ConvexBufferGeometry(vertices);
  groups.faces.remove(groups.faces.child);
  groups.faces.add(...createTwoSidedFaces(facesGeometry, meshMaterial));


  // create borders
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
  });
  groups.borders.remove(groups.borders.children);
  borders.forEach(border => {
    const geometry = new THREE.Geometry();
    geometry.vertices.push(border[0]);
    geometry.vertices.push(border[1]);
    groups.borders.add(new THREE.Line(geometry, lineMaterial));
  });


  // create special faces
  const highlightMaterial = new THREE.MeshBasicMaterial({
    color: 0x32c832,
    transparent: true,
    opacity: 1
  });
  const geometry_100 = new THREE.ConvexBufferGeometry(vertices_100);
  groups.v_100.remove(groups.v_100.children);
  groups.v_100.add(...createTwoSidedFaces(geometry_100, highlightMaterial));

  const geometry_110 = new THREE.ConvexBufferGeometry(vertices_110);
  groups.v_110.remove(groups.v_110.children);
  groups.v_110.add(...createTwoSidedFaces(geometry_110, highlightMaterial));

  const geometry_111 = new THREE.ConvexBufferGeometry(vertices_111);
  groups.v_111.remove(groups.v_111.children);
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
  console.log('replaced ', value)
}
