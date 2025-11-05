const canvas = document.getElementById('petalCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const petalImages = [
  'petal1.png',
  'petal2.png',
  'petal3.png'
].map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Petal {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -50;
    this.size = 20 + Math.random() * 20;
    this.speedX = -0.5 + Math.random();
    this.speedY = 1 + Math.random() * 2;
    this.angle = Math.random() * 360;
    this.spin = -1 + Math.random() * 2;
    this.image = petalImages[Math.floor(Math.random() * petalImages.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.spin;

    if (this.y > canvas.height + 50 || this.x < -50 || this.x > canvas.width + 50) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

const petals = Array.from({ length: 30 }, () => new Petal());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(petal => {
    petal.update();
    petal.draw();
  });
  requestAnimationFrame(animate);
}

animate();

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
  
      const opacity = Math.random() * 0.3+0.3; //random oopacity
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
  
  