import { ajax } from 'rxjs/ajax';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

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

let requests = [];
for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 10; y++) {
    let endpoint = 
      `http://localhost:3000/api/managingAsync/assets/coverpart-${x}-${y}.png`;
    let request$ = ajax({
      url: endpoint,
      responseType: 'blob'
    })
    .pipe(
      map(res => ({
        blob: res.response,
        x,
        y
      }))
    );
    requests.push(request$);
  }
}

merge(...requests)
.subscribe(
  val => drawToPage(val),
  err => alert(err)
);
