import { Component } from '@angular/core';
import { count, Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  observable = new Observable(subscriber => {
    let count = 0

    const id = setInterval(() => {
      subscriber.next(count)
      subscriber.complete()
      count = +1
    }, 1000)

    return () => {
      console.log('called')
      clearInterval(id)
    }

  }).subscribe(
    { next: value => console.log('next:', value) }
  );

}
