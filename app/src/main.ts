// import worklet from "./worklet";
import setupScene from './componwnts/welcome.page';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Remote Canvas Stream</title>
  </style>
</head>
<body>
<h3>Generated content</h3>
<div id="example"></div>
<div id="output"></div>
<!-- Your native browser Canvas element -->
  <canvas id="012ABCDEF01235791113172329" width="400" height="300"></canvas>
<p>Hello</p>
<ul id="unit-list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  <li>item 4</li>
  <li>item 5</li>
  <li>item 6</li>
  <li>item 7</li>
  <li>item 8</li>
  <li>item 9</li>
  <li>item 10</li>
  <li>item N</li>
</ul>
</body>
</html>
`;

setupScene(document.querySelector<HTMLButtonElement>('#counter')!)
