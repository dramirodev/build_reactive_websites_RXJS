let canvas = <HTMLCanvasElement>document.querySelector('canvas');
canvas.width = 450;
canvas.height = 540;
let ctx = canvas.getContext('2d');
let coords = { x: 45, y: 54 };

function drawToPage(config) {
  let img = new Image();
  img.onload = function () {
    ctx.drawImage(img, config.x * coords.x, config.y * coords.y, coords.x, coords.y);
  }
  img.src = URL.createObjectURL(config.blob);
}
