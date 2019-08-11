import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent, Observable, of, Subject, timer} from 'rxjs';
import {debounceTime, delay, exhaustMap, filter, switchMap, takeUntil, tap, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'tooltip';
  content = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
  tooltipShowEvents$: Subject<string> = new Subject();
  hintMouseEvents$: Subject<string> = new Subject();
  @ViewChild('pop', { static: false }) tooltip;

  constructor() {}

  ngAfterViewInit(): void {}

  tooltipMouseLeave() {
    const delayHintClose = this.hintMouseEvents$.pipe(
      filter(event => event === 'enter'),
      tap(console.log),
    );
    timer(800).pipe(takeUntil(delayHintClose)).subscribe(() => this.tooltip.hide());
  }

  tooltipMouseEnter() {
    this.tooltipShowEvents$.next('show');
    const delayHintClose = this.hintMouseEvents$.pipe(
      filter(event => event === 'enter'),
      tap(console.log),
    );
  }

  tooltipOnShow() {
    this.tooltipShowEvents$.next('show');
  }

  tooltipOnHide() {
    this.tooltipShowEvents$.next('hide');
  }

  hintEnter($event) {
    this.hintMouseEvents$.next('enter');
  }

  hintLeave($event) {
    timer(800).subscribe(() => this.tooltip.hide());
    this.hintMouseEvents$.next('leave');
  }
}
