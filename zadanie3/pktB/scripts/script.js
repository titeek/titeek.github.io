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

buttonGenerate.addEventListener("click", () => {
  const color = getRandomColor();

  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  const canvasWidth = parseFloat(getComputedStyle(canvas).width);
  const canvasHeight = parseFloat(getComputedStyle(canvas).height);
  const canvasOffsetX = canvas.offsetLeft;
  const canvasOffsetY = canvas.offsetTop;

  ctx.canvas.width = canvasWidth;
  ctx.canvas.height = canvasHeight;

  let isDragging = false;
  let lastX = 0;
  let lastY = 0;

  const makeBlock = (x, y, width, height, fill) => {
    const block = {
      x: x,
      y: y,
      width: width,
      height: height,
      fill: fill
    }
    blocks.push(block);
  }

  const drawAllBlock = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < blocks.length; i++) {
      let block = blocks[i]
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

    lastX = mouseX;
    lastY = mouseY;
    isDragging = true;
  }

  const customMouseUp = e => {
    mouseX = parseInt(e.clientX - canvasOffsetX);
    mouseY = parseInt(e.clientY - canvasOffsetY);

    isDragging = false;
  }

  const customMouseMove = e => {
    if (!isDragging) {
        return;
    }

    mouseX = parseInt(e.clientX - canvasOffsetX);
    mouseY = parseInt(e.clientY - canvasOffsetY);
    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        drawBlock(block);
        if (ctx.isPointInPath(lastX, lastY)) {
          block.x += (mouseX - lastX);
          block.y += (mouseY - lastY);
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