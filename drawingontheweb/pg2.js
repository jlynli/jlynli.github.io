const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;


let baseSizeFactor = width / 1000;

const particles = [];

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

//new class for flowers
class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rotation = Math.random() * 360;
    this.createElement();
  }

  createElement() {
    const flower = document.createElement('img');

    const flowerType = Math.random() < 0.5 ? 'flower1.png' : 'flower2.png';
    flower.src = flowerType;
    flower.classList.add('flower');
    flower.style.position = 'absolute';

    const flowerSize = Math.min(window.innerWidth, window.innerHeight) * 0.25;
    flower.style.width = `${flowerSize}px`;
    flower.style.height = `${flowerSize}px`;

    flower.style.left = `${this.x - flowerSize / 2}px`;
    flower.style.top = `${this.y - flowerSize / 2}px`;

    flower.style.pointerEvents = 'none';

    document.body.appendChild(flower);
  }
}

  //flowers in bath only
  const water = document.querySelector('.water');
  
  water.addEventListener('click', (e) => {
    const clickX = e.clientX;
    const clickY = e.clientY;
    new Flower(clickX, clickY);
    createRipplePath(clickX, clickY);
  });

  function createRipplePath(x, y) {
    const svgNS = "http://www.w3.org/2000/svg";
  
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '200'); 
    svg.setAttribute('height', '200');
    svg.style.position = 'absolute';
    svg.style.left = `${x - 100}px`;  
    svg.style.top = `${y - 100}px`;
    svg.style.pointerEvents = 'none';
    svg.style.overflow = 'visible';
    svg.style.zIndex = '0'; 
  
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '100'); 
    circle.setAttribute('cy', '100'); 
    circle.setAttribute('r', '30');   
    circle.setAttribute('class', 'ripple-circle');
    
    svg.appendChild(circle);
    document.body.appendChild(svg);
  
    circle.addEventListener('animationend', () => {
      svg.remove();
    });
  }


  