let lines;

function setup() {
  createCanvas(windowWidth, windowHeight);
  lines = Line.getRandomLines(5);
}

function draw() {
  background(20);

  let intersectionPoints = [];
  let angles = [];

  for (let line of lines) {
    angles = angles.concat(getAngles(line));
  }

  for (let ang of angles) {
    intersectionPoints = intersectionPoints.concat(getIntersections(ang));
  }

  intersectionPoints = intersectionPoints.sort(function (a, b) {
    return a.angle - b.angle;
  });

  drawPoly(intersectionPoints);

  for (let line of lines) {
    line.draw();
  }

  stroke(0);
  ellipse(mouseX, mouseY, 10);
}

function getAngles(line) {
  angles = []
  for (let i = 0; i < 2; i++) {
    let p = i == 0 ? line.start : line.end;

    let ang = atan2(p.y - mouseY, p.x - mouseX);
    angles.push(ang);
    angles.push(ang - 0.001);
    angles.push(ang + 0.001);
  }
  return angles;
}

function getIntersections(ang) {
  let intersections = []
  let x1 = cos(ang);
  let y1 = sin(ang);
  let ray = Line.castRay(createVector(mouseX, mouseY), createVector(mouseX + x1, mouseY + y1));

  let i = ray.getIntersection(lines);
  if (i) {
    intersections.push({ pt: i, angle: ang });
  }

  return intersections;
}

function drawPoly(points) {
  for (i = 0; i < points.length; i++) {
    let p1 = points[i];
    let p2 = points[(i + 1) % points.length];

    noStroke();
    fill(255, 255, 255, 240);
    triangle(mouseX, mouseY, p1.pt.x, p1.pt.y, p2.pt.x, p2.pt.y);
  }
}