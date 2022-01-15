const buttonGenerate = document.querySelector("#generateButton");
const blocks = [];

const getRandomColor = () => {
  let signs = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += signs[Math.floor(Math.random() * 16)];
  }
  return color;
}

let lastId = 0;

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = parseFloat(getComputedStyle(canvas).width);
const canvasHeight = parseFloat(getComputedStyle(canvas).height);
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

let lastX = 0;
let lastY = 0;
let elementDragged = null;
const blockedX = [];
const blockedY = [];

buttonGenerate.addEventListener("click", () => {
  const color = getRandomColor();
  const makeBlock = (x, y, width, height, fill) => {
    const block = {
      id: lastId,
      x: x,
      y: y,
      width: width,
      height: height,
      fill: fill
    }
    lastId = lastId + 1;
    blocks.push(block);
  }

  const drawAllBlock = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < blocks.length; i++) {
      let block = blocks[i];
      drawBlock(block);
      ctx.fillStyle = block.fill;
      ctx.fill();
      ctx.stroke();
    }
  }

  const drawBlock = block => {
    ctx.beginPath();
    ctx.moveTo(block.x, block.y);
    ctx.rect(block.x, block.y, block.width, block.height);
    ctx.closePath();
  }

  const customMouseDown = e => {
    mouseX = parseInt(e.clientX - canvasOffsetX);
    mouseY = parseInt(e.clientY - canvasOffsetY);

    elementDragged = blocks.find(block => block.x < mouseX && mouseX < block.x + block.width && block.y < mouseY && mouseY < block.y + block.height)
    if(elementDragged) {
      elementDragged.xClicked = mouseX - elementDragged.x
      elementDragged.yClicked = mouseY - elementDragged.y
    }
    lastX = mouseX;
    lastY = mouseY;
  }

  const customMouseUp = e => {
    mouseX = parseInt(e.clientX - canvasOffsetX);
    mouseY = parseInt(e.clientY - canvasOffsetY);

    elementDragged = null;
  }

  const customMouseMove = e => {
    if (!elementDragged) {
        return;
    }

    mouseX = parseInt(e.clientX - canvasOffsetX);
    mouseY = parseInt(e.clientY - canvasOffsetY);

    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        let collision = false;
        drawBlock(block);
        if (ctx.isPointInPath(lastX, lastY) && block === elementDragged) {
          blocks.forEach(block => {
            if(block.x < mouseX && mouseX < block.x + block.width && block.y < mouseY && mouseY < block.y + block.height) {
              collision = true;
            }
          });
          if(!collision) {
            block.x += (mouseX - lastX);
            block.y += (mouseY - lastY);
          }
        }
    }
    lastX = mouseX;
    lastY = mouseY;
    drawAllBlock();
  }

  const initialFunction = () => {
    makeBlock(30, 30, 25, 25, color);
    drawAllBlock();
  }

  initialFunction();
  canvas.onmousedown = customMouseDown;
  canvas.onmouseup = customMouseUp;
  canvas.onmousemove = customMouseMove;
});