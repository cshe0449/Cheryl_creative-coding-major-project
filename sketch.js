let colors = ['#e6302b', '#fd7800', '#fbd400', '#3bd89f', '#0045e8', '#f477c3', '#70499c', '#006494', '#1b98e0'];

class CirclePacking {
  // Constructor to initialize the CirclePacking instance.
  constructor(x, y, w, h) {
    this.x = x; // Center x-coordinate.
    this.y = y; // Center y-coordinate.
    this.w = w; // Width of the area.
    this.h = h; // Height of the area.
    this.points = []; // Array to store circles.
    this.generatePoints(); // Generate circles.
  }

  // Generate non-overlapping points for circles within the given area.
  generatePoints() {
    let count = int(this.w * this.h); // Number of points based on area.

    for (let i = 0; i < count; i++) {
      let z = random(15, 300); // Random diameter between 15 and 300.
      let x = this.x + random(-this.w / 2 + z / 2, this.w / 2 - z / 2); // Random x position within bounds.
      let y = this.y + random(-this.h / 2 + z / 2, this.h / 2 - z / 2); // Random y position within bounds.
      let add = true; // Flag to check if circle can be added.

      // Check for overlap with existing circles.
      for (let j = 0; j < this.points.length; j++) {
        let p = this.points[j];
        if (dist(x, y, p.x, p.y) < (z + p.z) * 0.5) {
          add = false;
          break;
        }
      }

      if (add) this.points.push(createVector(x, y, z)); // Add circle if no overlap.
    }
  }

  // Draw the circles and shapes within them.
  draw() {
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      noFill();
      noStroke();
      fill(random(colors)); // Random color for each shape.

      if (p.z < 30) {
        circle(p.x, p.y, p.z); // Draw simple circle if small.
      } else {
        let tt = int(random(30, 40)); // Number of layers for larger circles.
        let rgn = 67; // Number of vertices for star-like shape.
        for (let j = 0; j < tt; j++) {
          let mn = map(j, 0, tt, 1, 0.5); // Scale factor for star vertices.
          let dd = map(j, 0, tt, p.z, 0); // Diameter reduction per layer.
          fill(random(colors)); // Random color for each layer.
          this.form(p.x, p.y, dd, rgn, mn); // Draw the shape.
        }
      }
    }
  }


  // Create a star-like shape.
  form(x, y, d, num, mn) {
    push();
    translate(x, y); // Move to the center of the shape.
    beginShape();
    for (let i = 0; i < num; i++) {
      let a = map(i, 0, num - 1, 0, PI * 2); // Angle for each vertex.
      let r = d * 0.5; // Radius of the shape.
      if (i % 2 == 0) r *= mn; // Scale every other vertex.
      let vx = r * cos(a); // X-coordinate of vertex.
      let vy = r * sin(a); // Y-coordinate of vertex.
      vertex(vx, vy); // Add vertex to shape.
    }
    endShape();
    pop();
  }
}

function setup() {
  createCanvas(740, 740); // Set up canvas size.
  rectMode(CENTER); // Set rectangle mode to center.
}

function draw() {
  background('#014b70'); // Set background color.
  let cp = new CirclePacking(width / 2, height / 2, width, height); // Create CirclePacking instance.
  cp.draw(); // Draw the circles and shapes.
  noLoop(); // Stop draw loop for static image.
}