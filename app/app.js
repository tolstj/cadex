export function computeTriangulation(height, radius, segments) {
  let triangulation = [];

  for (let i = 0; i < segments; i++) {
    let triangle = {
      'A': {
        x: 0,
        y: 0, 
        z: +height,
      },
      'Pi': {
        x: radius * Math.cos(2 * Math.PI * i / segments),
        y: radius * Math.sin(2 * Math.PI * i / segments),
        z: 0,
      },
      'Pi+1': {
        x: radius * Math.cos(2 * Math.PI * (i + 1) / segments),
        y: radius * Math.sin(2 * Math.PI * (i + 1) / segments),
        z: 0,
      },
    };
    triangle = computeNormal(triangle, height, radius);
    triangulation.push(triangle);
  }

  return triangulation;
}

function computeNormal(triangle, height, radius) {
  const Pi = triangle['Pi'];
  const Pi_1 = triangle['Pi+1'];
  const B = {
    x: 0, 
    y: 0, 
    z: -(radius * radius) / height,
  };

  const computeNiMagnitude = function (Pi, B) {
    return (
      Math.sqrt(
        Math.pow((Pi.x - B.x), 2)
        + Math.pow((Pi.y - B.y), 2)
        + Math.pow((Pi.z - B.z), 2)
      )
    );
  };

  const Ni = {
    x: Pi.x - B.x, 
    y: Pi.y - B.y,
    z: Pi.z - B.z,
  };
  const Ni_1 = {
    x: Pi_1.x - B.x, 
    y: Pi_1.y - B.y, 
    z: Pi_1.z - B.z,
  };
  const NiMag = computeNiMagnitude(Pi, B);
  const NiMag_1 = computeNiMagnitude(Pi_1, B);
  
  return {
    ...triangle,
    'Pi': {
      ...triangle['Pi'],
      normal: {
        x: Ni.x / NiMag,
        y: Ni.y / NiMag,
        z: Ni.z / NiMag,
      },
    },
    'Pi+1': {
      ...triangle['Pi+1'],
      normal: {
        x: Ni_1.x / NiMag_1,
        y: Ni_1.y / NiMag_1,
        z: Ni_1.z / NiMag_1,
      },
    },
  };
}
