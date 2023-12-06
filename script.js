const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const drops = [];

class Raindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 2;
    this.speed = 5;
  }

  fall() {
    this.y += this.speed;

    // Reset drop if it goes off the screen
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
  }
}

// Initialize raindrops
for (let i = 0; i < 100; i++) {
  const drop = new Raindrop(Math.random() * canvas.width, Math.random() * canvas.height);
  drops.push(drop);
}

function simulate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const drop of drops) {
    drop.fall();
    drop.draw();
  }

  requestAnimationFrame(simulate);
}

simulate();

// Resize canvas when window is resized
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
