import "../css/style.css";
function createGrid(cols, rows, populate) {
    var arr = new Array(cols);
    for (var i = 0; i < cols; i++) {
        arr[i] = new Array(rows);
        for (var j = 0; j < rows; j++) {
            arr[i][j] = { state: populate ? Math.floor(Math.random() * 2) : 0 };
        }
    }
    return arr;
}
function draw() {
    var cWidth = canvas.width;
    var cHeight = canvas.height;
    // make background black
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cWidth, cHeight);
    // draw current grid
    ctx.fillStyle = "#000000";
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            if (grid[i][j].state === 1) {
                var x = j * pixelSize;
                var y = i * pixelSize;
                ctx.fillRect(x, y, pixelSize, pixelSize);
            }
        }
    }
    // next generation
    var nGrid = createGrid(cols, rows, false);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            var v = grid[i][j].state;
            var neighbors = neighborsCount(i, j);
            if (v === 0 && neighbors === 3) {
                nGrid[i][j].state = 1;
            }
            else if (v === 1 && (neighbors < 2 || neighbors > 3)) {
                nGrid[i][j].state = 0;
            }
            else {
                nGrid[i][j].state = v;
            }
        }
    }
    grid = nGrid;
    requestAnimationFrame(draw);
}
function neighborsCount(x, y) {
    var neighbors = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            var nx = void 0, ny = void 0;
            nx = (x + i + cols) % cols;
            ny = (y + j + rows) % rows;
            neighbors += grid[nx][ny].state;
        }
    }
    return neighbors - grid[x][y].state;
}
var canvas = document.getElementById("canvas");
var width = window.innerWidth;
var height = window.innerHeight;
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");
var cols = 100;
var pixelSize = height / cols;
var rows = Math.floor(width / pixelSize);
var grid = createGrid(cols, rows, true);
draw();
//# sourceMappingURL=index.js.map