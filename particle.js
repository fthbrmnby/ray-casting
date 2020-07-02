class Particle {
  constructor(pos) {
    this.pos = pos;
    this.rays = []

    for (var angle = 0; angle < 360; angle += 1) {
      this.rays.push(new Ray(this.pos, angle))
    }
  }

  castRays(object) {
    for (let ray of this.rays) {
      let point = null;
      let minDist = Infinity;
      for (let o of object) {
        var pt = ray.cast(o);
        if (pt) {
          var dist = p5.Vector.dist(this.pos, pt);
          if (dist < minDist) {
            point = pt;
            minDist = dist;
          }
        }
      }

      if (point) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, point.x, point.y);
      }
    }
  }

  update(pos) {
    this.pos = pos;
    this.rays = []

    for (var angle = 0; angle < 360; angle += 1) {
      this.rays.push(new Ray(this.pos, angle))
    }
  }

  draw() {
    ellipse(this.pos.x, this.pos.y, 10);
  }
}