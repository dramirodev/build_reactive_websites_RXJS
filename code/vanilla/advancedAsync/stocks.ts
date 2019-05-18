declare var Chart;

import { merge, fromEvent, of, combineLatest } from 'rxjs';
import { scan, map } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';

let config = {
  type: 'line',
  data: {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    datasets: []
  },
  options: {
    legend: {
      onClick: () => { }
    },
    animation: false,
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  }
};

let colorMap = {
  ABC: 'rgb(255, 99, 132)',
  DEF: 'rgb(75, 192, 192)',
  GHI: 'rgb(54, 162, 235)',
  JKL: 'rgb(153, 102, 255)'
};

let ctx = document.querySelector('canvas').getContext('2d');
let stockChart = new Chart(ctx, config);

let abcEl = <HTMLElement>document.querySelector('.abc');
let defEl = <HTMLElement>document.querySelector('.def');
let ghiEl = <HTMLElement>document.querySelector('.ghi');
let jklEl = <HTMLElement>document.querySelector('.jkl');
