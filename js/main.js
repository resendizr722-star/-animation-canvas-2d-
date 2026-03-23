const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width = 800;
let height = 500;

canvas.width = width;
canvas.height = height;

let circles = [];

// CLASE CIRCULO
class Circle {
  constructor(x, y, radius, speed) {
    this.radius = radius;
    this.posX = x;
    this.posY = y;

    this.dx = (Math.random() - 0.5) * speed * 2;
    this.dy = (Math.random() - 0.5) * speed * 2;
  }

  draw(ctx) {
    ctx.beginPath();

    // EFECTO GLASS
    let gradient = ctx.createRadialGradient(
      this.posX, this.posY, this.radius * 0.2,
      this.posX, this.posY, this.radius
    );

    gradient.addColorStop(0, "rgba(255,255,255,0.7)");
    gradient.addColorStop(1, "rgba(255,255,255,0.05)");

    ctx.fillStyle = gradient;
    ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.stroke();

    ctx.closePath();
  }

  update() {
    this.posX += this.dx;
    this.posY += this.dy;

    // REBOTES CORREGIDOS
    if (this.posX + this.radius >= width) {
      this.posX = width - this.radius;
      this.dx *= -1;
    }

    if (this.posX - this.radius <= 0) {
      this.posX = this.radius;
      this.dx *= -1;
    }

    if (this.posY + this.radius >= height) {
      this.posY = height - this.radius;
      this.dy *= -1;
    }

    if (this.posY - this.radius <= 0) {
      this.posY = this.radius;
      this.dy *= -1;
    }

    this.draw(ctx);
  }
}

// GENERAR CIRCULOS
function generarCirculos(n) {
  circles = [];

  for (let i = 0; i < n; i++) {
    let radius = Math.random() * 30 + 20;

    let x = Math.random() * (width - 2 * radius) + radius;
    let y = Math.random() * (height - 2 * radius) + radius;

    let speed = Math.random() * 3 + 1;

    circles.push(new Circle(x, y, radius, speed));
  }
}

// ANIMACION
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, width, height);

  circles.forEach(c => c.update());
}

// BOTON
document.getElementById("btnAplicar").addEventListener("click", () => {
  let n = parseInt(document.getElementById("numCirculos").value);
  width = parseInt(document.getElementById("canvasWidth").value);
  height = parseInt(document.getElementById("canvasHeight").value);

  canvas.width = width;
  canvas.height = height;

  generarCirculos(n);
});

// INICIO
generarCirculos(5);
animate();