class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(radians(angle));
  }

  // https://en.wikipedia.org/wiki/Line–line_intersection
  cast(object) {
    let x3 = this.pos.x;
    let y3 = this.pos.y;
    let x4 = this.pos.x + this.dir.x;
    let y4 = this.pos.y + this.dir.y;

    let x1 = object.start.x;
    let y1 = object.start.y;
    let x2 = object.end.x;
    let y2 = object.end.y;

    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denom == 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom
    const u = -(((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom)


    if (t > 0 && t < 1 && u > 1) {
      var px = x1 + t * (x2 - x1);
      var py = y1 + t * (y2 - y1);

      return createVector(px, py);
    }

    return;
  }

  draw() {
    stroke(255);
    line(this.pos.x, this.pos.y, this.pos.x + this.dir.x * 10, this.pos.y + this.dir.y * 10)
  }
}