const monoclinic = generate();

function generate() {
  const a1 = new THREE.Vector3(-5, 5, -1.25);
  const a2 = new THREE.Vector3(5, 5, -1.25);
  const a3 = new THREE.Vector3(7.5, -10, -1.25);
  const a4 = new THREE.Vector3(-2.5, -10, -1.25);

  const b1 = new THREE.Vector3(-5, 5, 5);
  const b2 = new THREE.Vector3(5, 5, 5);
  const b3 = new THREE.Vector3(7.5, -10, 5);
  const b4 = new THREE.Vector3(-2.5, -10, 5);


  return {
    vertices: [
      a1, a2, a3, a4, b1, b2, b3, b4
    ],
    borders: [
      [a1, a2], [a2, a3], [a3, a4], [a4, a1],
      [b1, b2], [b2, b3], [b3, b4], [b4, b1],
      [a1, b1], [a2, b2], [a3, b3], [a4, b4]
    ],
    vertices_100: [a1, a2, a3, a4], // Add a minimum of 4 points for the convex hull algorithm. Duplicates allowed.
    vertices_110: [a2, a3, b1, b4], // Add a minimum of 4 points for the convex hull algorithm. Duplicates allowed.
    vertices_111: [a1, a3, a3, b4] // Add a minimum of 4 points for the convex hull algorithm. Duplicates allowed.
  };
}
