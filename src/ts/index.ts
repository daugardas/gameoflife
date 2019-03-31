import "../css/style.css";


interface Cell {
  state: number; // either 0 or 1
}

function createGrid(cols: number, rows: number, populate: boolean): Cell[][] {
  let arr: Cell[][] = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = { state: populate ? Math.floor(Math.random() * 2) : 0 };
    }
  }
  return arr;
}

function draw() {
  let cWidth: number = canvas.width;
  let cHeight: number = canvas.height;

  // make background black
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cWidth, cHeight);

  // draw current grid
  ctx.fillStyle = "#000000";
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].state === 1) {
        let x = j * pixelSize;
        let y = i * pixelSize;
        ctx.fillRect(x, y, pixelSize, pixelSize);
      }
    }
  }

  // next generation
  let nGrid: Cell[][] = createGrid(cols, rows, false);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let v: number = grid[i][j].state;
      let neighbors = neighborsCount(i, j);
      if (v === 0 && neighbors === 3) {
        nGrid[i][j].state = 1;
      } else if (v === 1 && (neighbors < 2 || neighbors > 3)) {
        nGrid[i][j].state = 0;
      } else {
        nGrid[i][j].state = v;
      }
    }
  }
  grid = nGrid;
  requestAnimationFrame(draw);
}

function neighborsCount(x: number, y: number): number {
  let neighbors = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let nx, ny;
      nx = (x + i + cols) % cols;
      ny = (y + j + rows) % rows;
      neighbors += grid[nx][ny].state;
    }
  }
  return neighbors - grid[x][y].state;
}

let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

let cols: number = 50;
let pixelSize: number = height / cols;
let rows: number = Math.floor(width / pixelSize);
let grid: Cell[][] = createGrid(cols, rows, true);
draw();