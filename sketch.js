let particle;
let boundaries = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  let startPos = createVector(width / 2, height / 2);
  particle = new Particle(startPos);

  for (let i = 0; i < 5; i++) {
    var x1 = random(width + 100);
    var y1 = random(height + 100);
    var x2 = random((x1 + width / 4) - 100);
    var y2 = random((y1 + height / 4) - 100);
    boundaries.push(new Boundary(x1, y1, x2, y2));
  }
  boundaries.push(new Boundary(0, 0, width, 0));
  boundaries.push(new Boundary(0, 0, 0, height));
  boundaries.push(new Boundary(width, 0, width, height));
  boundaries.push(new Boundary(0, height, width, height));
}

function draw() {
  background(0);
  particle.draw();

  for (let b of boundaries) {
    b.draw();
  }

  particle.castRays(boundaries);
  particle.update(createVector(mouseX, mouseY));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}