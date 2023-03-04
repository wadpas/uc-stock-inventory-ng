import { Component } from '@angular/core';
import { filter, from, interval, map, Observable, reduce, scan } from 'rxjs';


@Component({
  selector: 'app-root',
  styles: [
    '.app-root {margin: 2rem}'
  ],
  template: `
    <div class="app-root">
      <h2>Count</h2>
      <h3>{{ valueCount }}</h3>
    </div>
  `
})
export class AppComponent {
  valueCount: number = 10;

  counter$ = interval(1000)
    .pipe(
      map(() => -1),
      scan(
        (acc, curr) => { return acc + curr }, 5
      ),
      filter(value => value >= 0)
    )
    .subscribe(
      value => this.valueCount = value
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

