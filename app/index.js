export function computeTriangulation(height, radius, segments) {
  let triangulation = [];

  for (let i = 0; i < segments; i++) {
    let triangle = {
      'A': [0, 0, +height],
      'Pi': [
        radius * Math.cos(2 * Math.PI * i / segments),
        radius * Math.sin(2 * Math.PI * i / segments),
        0,
      ],
      'Pi+1': [
        radius * Math.cos(2 * Math.PI * (i + 1) / segments),
        radius * Math.sin(2 * Math.PI * (i + 1) / segments),
        0,
      ],
    };
    triangulation.push(triangle);
  }

  return triangulation;
}
