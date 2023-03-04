import { Component, ElementRef, ViewChild } from '@angular/core';
import { filter, from, fromEvent, interval, map, Observable, reduce, scan, takeUntil, takeWhile } from 'rxjs';


@Component({
  selector: 'app-root',
  styles: [
    '.app-root {margin: 2rem}'
  ],
  template: `
    <div class="app-root">
      <h2>Count</h2>
      <h3>{{ valueCount }}</h3>
      <button type="button" class="btn btn-danger" id="stopButton">Stop</button>
    </div>
  `
})
export class AppComponent {
  valueCount: number = 5

  stopButton = document.getElementById('stopButton')
  stopClick$ = fromEvent(this.stopButton, 'click')

  counter$ = interval(1000)
    .pipe(
      map(() => -1),
      scan(
        (acc, curr) => { return acc + curr }, 5
      ),
      takeWhile(value => value >= 0),
      takeUntil(this.stopClick$)
    )
    .subscribe(
      value => {
        this.valueCount = value
        console.log(this.stopButton)
      }
    );
}

const numbers = [1, 2, 3]

from(numbers).pipe(
  reduce(
    (sum: number, val: number) => { return sum + val }, 0
  )
).subscribe(console.log)

from(numbers).pipe(
  scan(
    (sum: number, val: number) => { return sum + val }, 0
  )
).subscribe(console.log)

