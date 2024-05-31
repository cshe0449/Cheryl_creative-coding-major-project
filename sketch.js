let colors = ['#e6302b', '#fd7800', '#fbd400', '#3bd89f', '#0045e8', '#f477c3', '#70499c', '#006494', '#1b98e0'];

class CirclePacking {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.points = [];
    this.time = 0; // Initialize time variable
    this.generatePoints();
  }

  generatePoints() {
    let count = int(this.w * this.h);
    for (let i = 0; i < count; i++) {
      let z = random(15, 300);
      let x = this.x + random(-this.w / 2 + z / 2, this.w / 2 - z / 2);
      let y = this.y + random(-this.h / 2 + z / 2, this.h / 2 - z / 2);
      let add = true;
      for (let j = 0; j < this.points.length; j++) {
        let p = this.points[j];
        if (dist(x, y, p.x, p.y) < (z + p.z) * 0.5) {
          add = false;
          break;
        }
      }
      if (add) this.points.push(createVector(x, y, z));
    }
  }

  updatePoints() {
    this.time += 0.01; // Increment time
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let noiseFactor = 0.1; // Adjust the noise factor for desired effect
      p.x += map(noise(this.time + i * noiseFactor), 0, 1, -1, 1);
      p.y += map(noise(this.time + i * noiseFactor + 1000), 0, 1, -1, 1); // Offset added to vary noise for x and y
      p.z += map(noise(this.time + i * noiseFactor + 2000), 0, 1, -1, 1); // Offset added to vary noise for size
    }
  }

  draw() {
    this.updatePoints(); // Update points before drawing
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      noFill();
      noStroke();
      fill(random(colors));
      if (p.z < 30) {
        circle(p.x, p.y, p.z);
      } else {
        let tt = int(random(30, 40));
        let rgn = 67;
        for (let j = 0; j < tt; j++) {
          let mn = map(j, 0, tt, 1, 0.5);
          let dd = map(j, 0, tt, p.z, 0);
          fill(random(colors));
          this.form(p.x, p.y, dd, rgn, mn);
        }
      }
    }
  }

  form(x, y, d, num, mn) {
    push();
    translate(x, y);
    beginShape();
    for (let i = 0; i < num; i++) {
      let a = map(i, 0, num - 1, 0, PI * 2);
      let r = d * 0.5;
      if (i % 2 == 0) r *= mn;
      let vx = r * cos(a);
      let vy = r * sin(a);
      vertex(vx, vy);
    }
    endShape();
    pop();
  }
}

function setup() {
  createCanvas(740, 740);
  rectMode(CENTER);
  cp = new CirclePacking(width / 2, height / 2, width, height); // Store CirclePacking instance globally
}

function draw() {
  background('#014b70');
  cp.draw(); // Draw the circles and shapes with animation
}
