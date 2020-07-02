class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  draw() {
    stroke(255);
    strokeWeight(2);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  static getRandomLines(numLines) {
    let lines = [];

    for (let i = 0; i < numLines; i++) {
      let start = createVector(random(width), random(height));
      let end = createVector(random(width), random(height));
      lines.push(new Line(start, end));
    }

    lines.push(new Line(createVector(0, 0), createVector(width, 0)));
    lines.push(new Line(createVector(0, 0), createVector(0, height)));
    lines.push(new Line(createVector(width, 0), createVector(width, height)));
    lines.push(new Line(createVector(0, height), createVector(width, height)));
    return lines;
  }

  static castRay(from, to) {
    let ray = new Line(from, to);
    return ray;
  }

  getIntersection(others) {
    let nearestPoint = null;
    let minT1 = Infinity;

    for (let other of others) {
      let point = this.checkIntersection(other);
      if (point && point.t < minT1) {
        minT1 = point.t;
        nearestPoint = point.xy;
      }
    }
    return nearestPoint;
  }

  checkIntersection(other) {
    let r_px = this.start.x;
    let r_py = this.start.y;
    let r_dx = this.end.x - this.start.x;
    let r_dy = this.end.y - this.start.y;

    let s_px = other.start.x;
    let s_py = other.start.y;
    let s_dx = other.end.x - other.start.x;
    let s_dy = other.end.y - other.start.y;

    let T2 = (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) / (s_dx * r_dy - s_dy * r_dx)
    let T1 = (s_px + s_dx * T2 - r_px) / r_dx

    if (T1 > 0 && 0 < T2 && T2 < 1) {
      let x = r_px + r_dx * T1;
      let y = r_py + r_dy * T1;
      return { t: T1, xy: createVector(x, y) };
    }

    return;
  }
}