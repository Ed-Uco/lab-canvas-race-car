 window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  }; 
   function startGame() {
      update();
  } 

};

const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');
let frames = 0;
const walls = [];

class Road {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = $canvas.width;
        this.height = $canvas.height;
        this.image = new Image();
        this.image.src =
            '/images/road.png';
    }

    draw() {
        this.y++;
      if (this.y > this.height) this.y = 0;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(
            this.image,
            this.x,
            this.y - this.height,
            this.width,
            this.height,
        );
    }
}

class Car {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 100;
    this.image = new Image();
    this.move = 20;
    this.image.src = "/images/car.png";
  }
  draw() {
   if (this.y > $canvas.height - this.height) {
       this.y = $canvas.height - this.height;
   }
   if (this.x > $canvas.width - this.width) {
       this.x = $canvas.width - this.width;
   }
   if (this.x < 0) {
       this.x = 0;
   }

   ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
    moveLeft() {
      this.x -= this.move;
    }
    moveRight(){
      this.x += this.move;
    }
  
  isTouching(obj) {
    return (
        this.x < obj.x + obj.width &&
        this.x + this.width > obj.x &&
        this.y < obj.y + obj.height &&
        this.y + this.height > obj.y
    );
  }
  
}

class Wall {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 30;
    this.image = new Image();
    this.image.src ="/images/brick.png"
  }
  draw() {
    this.y ++;
    ctx.drawImage(this.image,this.x,this.y, this.width,this.height)
  }
}


const road = new Road();
const car = new Car(220, 200);

function update() {
    // 1. calcular o recalcular el estado de nuestro programa
    frames++;
  generateWalls();
  checkCollitions();
  // 2. Limpiar el canvas
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    // 3. Dibujar los elementos
  road.draw();
  car.draw();
  drawWalls();
  checkKeys();
/*   gameOver(); */
  requestAnimationFrame(update);
}

// Funciones de apoyo

function checkCollitions() {
  walls.forEach((wall) => {
    if (car.isTouching(wall)) {
      alert('Game Over');
          }
  });
}

function generateWalls() {
  if (frames % 200 === 0) {
    const x = Math.floor(Math.random() * 251) + 50;
    const width = Math.floor(Math.random() * 251) + 50;
    if (width < 20) {
      return width += 20
    }
    const wallposition = new Wall(x,0, width);
    walls.push(wallposition);
  }
}

function drawWalls() {
  walls.forEach((wall) => wall.draw());
}

function checkKeys() {
  document.onkeydown = (event) => {
    event.preventDefault(event);
    switch (event.key) {
      case "ArrowLeft":
        car.moveLeft();
        break;
      case "ArrowRight":
        car.moveRight();
        break;

      default:
        break;
    }
   
  };
   
}
