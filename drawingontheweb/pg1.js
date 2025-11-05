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
    ctx.fillStyle = `rgba(240, 140, 211, ${p.alpha})`;
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
        flower.src = 'flower.png';
        flower.classList.add('flower');
        flower.style.position = 'absolute';
      
        //flower size based on window size
        const flowerSize = Math.min(window.innerWidth, window.innerHeight) * 0.07; 
        flower.style.width = `${flowerSize}px`;
        flower.style.height = `${flowerSize}px`;
      
        //so flowers spawn in middle mouuse area
        flower.style.left = `${this.x - flowerSize / 2}px`;
        flower.style.top = `${this.y - flowerSize / 2}px`;
      
        //rotate flowers a bit
        flower.style.transform = `rotate(${this.rotation}deg)`;
      
        const hueRotate = (Math.random() * 30) - 15;   
        const brightness = 0.9 + Math.random() * 0.2; 
      
        flower.style.filter = `hue-rotate(${hueRotate}deg) brightness(${brightness})`;
      
        flower.style.pointerEvents = 'none';
      
        document.body.appendChild(flower);
      }
      
      
      
  }
  
  //should only be able to place flowers on the grass part
  const meadow = document.querySelector('.meadow');
  
  meadow.addEventListener('click', (e) => {
    const clickX = e.clientX;
    const clickY = e.clientY;
    new Flower(clickX, clickY);
  });

  // Cloud class
class Cloud {
    constructor() {
      this.createElement();
    }
  
    createElement() {
      const cloud = document.createElement('img');
      const cloudImages = ['cloud1.png', 'cloud2.png'];
      const randomIndex = Math.floor(Math.random() * cloudImages.length);
      cloud.src = cloudImages[randomIndex];
      cloud.classList.add('cloud');
  
      cloud.style.position = 'absolute';
      cloud.style.top = `${Math.random() * (window.innerHeight * 0.5)}px`; 
  
      const scale = 0.1 + Math.random() * 0.3; //scale with window randomly 
      cloud.style.width = `${window.innerWidth * scale}px`; //cloud base size
      cloud.style.height = 'auto';
  
      const opacity = Math.random() * 0.3 + 0.7; //random oopacity
      cloud.style.opacity = opacity;
  
      //decides which direction cloud should move in
      const direction = Math.random() < 0.5 ? 'right' : 'left';
      this.direction = direction;
  
      //spawning clouds have to be off screen so they dont just pop into existence
      if (direction === 'right') {
        cloud.style.left = `-${cloud.style.width}`;
      } else {
        cloud.style.left = `${window.innerWidth + 250}px`; 
        cloud.style.transform = 'scaleX(-1)'; //flips sprite depending on like the direction
      }
  
      cloud.style.pointerEvents = 'none';
  
      document.body.appendChild(cloud);
      this.cloudElement = cloud;
  
      this.animate();
    }
  
    animate() {
      const speed = Math.random() * 0.5 + 0.5; //kindof randomm speed
  
      const move = () => {
        const currentLeft = parseFloat(this.cloudElement.style.left);
        const delta = speed; //pixels per frame
  
        if (this.direction === 'right') {
          this.cloudElement.style.left = `${currentLeft + delta}px`;
          if (currentLeft > window.innerWidth + 300) {
            this.destroy();
          }
        } else {
          this.cloudElement.style.left = `${currentLeft - delta}px`;
          if (currentLeft < -300) {
            this.destroy();
          }
        }
  
        this.animationFrame = requestAnimationFrame(move);
      };
  
      move();
    }
  
    //kill cloud after animation ends
    destroy() {
      cancelAnimationFrame(this.animationFrame);
      this.cloudElement.remove();
    }
  }
  
  //spawn cloud at random intervals
  function spawnCloud() {
    new Cloud();

    const interval = Math.random() * 5000 + 10000;

    setTimeout(spawnCloud, interval);
  }
  
  spawnCloud();
  
  