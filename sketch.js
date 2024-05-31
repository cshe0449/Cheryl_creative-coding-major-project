let colors = ['#e6302b', '#fd7800', '#fbd400', '#3bd89f', '#0045e8', '#f477c3', '#70499c', '#006494', '#1b98e0'];

class CirclePacking {
  // Constructor to initialise the CirclePacking instance
  constructor(x, y, w, h) {
    this.x = x; // Centre x-coordinate
    this.y = y; // Centre y-coordinate
    this.w = w; // Width of the area
    this.h = h; // Height of the area
    this.points = []; // Array to store circle points
    this.time = 0; // Initialise time variable for animation
    this.generatePoints(); // Generate the initial points for circles
  }

  // Generate non-overlapping points for circles within the specified area
  generatePoints() {
    let count = int(this.w * this.h / 200); // Increase the number of points

    for (let i = 0; i < count; i++) {
      let z = random(15, 300); // Random diameter between 15 and 300
      let x = this.x + random(-this.w / 2 + z / 2, this.w / 2 - z / 2); // Random x position within bounds
      let y = this.y + random(-this.h / 2 + z / 2, this.h / 2 - z / 2); // Random y position within bounds
      let add = true; // Flag to check if the circle can be added

      // Check for overlap with existing circles
      for (let j = 0; j < this.points.length; j++) {
        let p = this.points[j];
        if (dist(x, y, p.x, p.y) < (z + p.z) * 0.5) {
          add = false;
          break;
        }
      }

      if (add) this.points.push(createVector(x, y, z)); // Add circle if no overlap
    }
  }

  // Update vertices periodically using Perlin noise for smaller circles
  updateVertices() {
    this.time += 0.01; // Increment time for animation
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      if (p.z < 100) { // Apply noise only to smaller circles
        let noiseFactor = 0.1;
        p.x += map(noise(this.time + i * noiseFactor), 0, 1, -1, 1);
        p.y += map(noise(this.time + i * noiseFactor + 1000), 0, 1, -1, 1);
      }
    }
  }

  // Draw the circles and shapes within them
  draw() {
    this.updateVertices(); // Update vertices periodically
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      noFill(); // Ensure no fill for the shapes
      noStroke(); // Ensure no stroke for the shapes
      fill(random(colors)); // Random colour for each shape

      if (p.z < 100) {
        // Draw a simple circle if the size is small
        circle(p.x, p.y, p.z);
      } else {
        // Draw more complex shapes for larger circles
        let tt = int(random(30, 40)); // Number of layers for larger circles
        let rgn = int(map(sin(this.time + i * 0.1), -1, 1, 20, 67)); // Animated number of vertices
        for (let j = 0; j < tt; j++) {
          let mn = map(j, 0, tt, 1, 0.5); // Scale factor for star vertices
          let dd = map(j, 0, tt, p.z, 0); // Diameter reduction per layer
          fill(random(colors)); // Random colour for each layer
          this.form(p.x, p.y, dd, rgn, mn); // Draw the shape
        }
      }
    }
  }

  // Create a star-like shape
  form(x, y, d, num, mn) {
    push();
    translate(x, y); // Move to the centre of the shape
    beginShape(); // Start defining the shape
    for (let i = 0; i < num; i++) {
      let a = map(i, 0, num - 1, 0, PI * 2); // Angle for each vertex
      let r = d * 0.5; // Radius of the shape
      if (i % 2 == 0) r *= mn; // Scale every other vertex
      let vx = r * cos(a); // X-coordinate of vertex
      let vy = r * sin(a); // Y-coordinate of vertex
      vertex(vx, vy); // Add vertex to shape
    }
    endShape(CLOSE); // Finish defining the shape
    pop();
  }
}

let cp; // Variable to hold the CirclePacking instance

function setup() {
  createCanvas(740, 740); // Set up the canvas size
  rectMode(CENTER); // Set rectangle mode to centre
  cp = new CirclePacking(width / 2, height / 2, width, height); // Create a CirclePacking instance
}

function draw() {
  background('#014b70'); // Set background colour
  cp.draw(); // Draw the circles and shapes
}
