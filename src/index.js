import { display3d, renderNewCone } from './display3d';

display3d();

const formParameters = document.getElementById('formParameters');
const paramHeight = document.getElementById('paramHeight');
const paramRadius = document.getElementById('paramRadius');
const paramSegments = document.getElementById('paramSegments');
const params = [paramHeight, paramRadius, paramSegments];
const url = 'http://127.0.0.1:80/api';

params.forEach((param) => param.value = 0);
formParameters.addEventListener('submit', (e) => {
  e.preventDefault();
  const height = paramHeight.value;
  const radius = paramRadius.value;
  const segments = paramSegments.value;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      height,
      radius,
      segments,
    }),
  })
    .then(res => res.json())
    .then(res => {
      const triangulation = res;
      renderNewCone(triangulation);
    });
});
