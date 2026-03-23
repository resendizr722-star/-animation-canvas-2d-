const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

// =======================
// CLASE CIRCLE
// =======================
class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.radius = radius;

    // Asegurar que inicia dentro del canvas
    this.posX = Math.max(radius, Math.min(x, window_width - radius));
    this.posY = Math.max(radius, Math.min(y, window_height - radius));

    this.color = color;
    this.text = text;
    this.speed = speed;

    this.dx = (Math.random() * 2 - 1) * this.speed;
    this.dy = (Math.random() * 2 - 1) * this.speed;
  }

  draw(context) {
    context.beginPath();

    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "16px Arial";

    context.fillText(this.text, this.posX, this.posY);

    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    context.stroke();

    context.closePath();
  }

  update(context) {
    this.draw(context);

    // Colisiones con bordes (corregidas)
    if (this.posX + this.radius > window_width) {
      this.posX = window_width - this.radius;
      this.dx = -this.dx;
    }

    if (this.posX - this.radius < 0) {
      this.posX = this.radius;
      this.dx = -this.dx;
    }

    if (this.posY + this.radius > window_height) {
      this.posY = window_height - this.radius;
      this.dy = -this.dy;
    }

    if (this.posY - this.radius < 0) {
      this.posY = this.radius;
      this.dy = -this.dy;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// =======================
// ARRAY DE CÍRCULOS
// =======================
let circles = [];

// =======================
// GENERAR CÍRCULOS
// =======================
function generarCirculos(n) {
  circles = [];

  for (let i = 0; i < n; i++) {
    let radius = Math.floor(Math.random() * 40 + 20);

    let x = Math.random() * window_width;
    let y = Math.random() * window_height;

    let speed = Math.random() * 4 + 1;

    let color = `hsl(${Math.random() * 360}, 70%, 50%)`;

    let circle = new Circle(x, y, radius, color, i + 1, speed);

    circles.push(circle);
  }
}

// =======================
// BOTÓN
// =======================
document.getElementById("btnGenerar").addEventListener("click", () => {
  let cantidad = parseInt(document.getElementById("numCircles").value);
  generarCirculos(cantidad);
});

// =======================
// ANIMACIÓN
// =======================
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window_width, window_height);

  circles.forEach(c => c.update(ctx));
}

animate();

// Inicial
generarCirculos(5);