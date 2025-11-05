const particles = [];
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;


let baseSizeFactor = width / 1000;
function createParticles(count = 50) {
    particles.length = 0;
    for (let i = 0; i < count; i++) {
      const radius = (Math.random() * 1 + 0.25) * baseSizeFactor;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        speedX: (Math.random() - 0.5) * 0.5 * baseSizeFactor,
        speedY: (Math.random() * 0.2 + 0.1) * baseSizeFactor,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    baseSizeFactor = width / 1000;
    createParticles();
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224, 226, 245, ${p.alpha})`;
      ctx.fill();
  
      p.x += p.speedX;
      p.y += p.speedY;
  
      if (p.y > height) {
        p.y = 0;
        p.x = Math.random() * width;
      }
  
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
    }
  
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
  