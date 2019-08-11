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

  constructor() {
    const showTooltipHandler$ = this.tooltipShowEvents$.pipe(
      filter(event => event === 'show'),
      throttleTime(800)
    );

    showTooltipHandler$.subscribe(event => {
      console.log(event);
      this.tooltip.show();
    });

    this.hintMouseEvents$.subscribe(console.log);

    const closeTooltip$ = this.tooltipShowEvents$.pipe(filter(event => event === 'hide'));

  }

  ngAfterViewInit(): void {
    // this.mouseMoves$ = fromEvent(this.card.nativeElement, 'mousemove');
    //
    // this.mouseMoves$.subscribe( event => console.log('logging mousemove'));
    //
    // console.log('after view init');
  }

  tooltipMouseLeave() {
    const delayHintClose = this.hintMouseEvents$.pipe(
      filter(event => event === 'enter'),
      tap(console.log),
      // delay(800)
    );
    // timer(800).pipe(takeUntil(delayHintClose)).subscribe(() => this.tooltip.hide());
    // of(true).pipe(takeUntil(this.hintMouseEvents$), delay(800)).subscribe(() => this.tooltip.hide());
  }

  tooltipMouseEnter() {
    this.tooltipShowEvents$.next('show');
    // const delayHintClose = this.hintMouseEvents$.pipe(
    //   filter(event => event === 'enter'),
    //   tap(console.log),
    //   // delay(800)
    // );
    // timer(800).pipe(takeUntil(delayHintClose)).subscribe(() => this.tooltip.hide());
    // of(true).pipe(takeUntil(this.hintMouseEvents$), delay(800)).subscribe(() => this.tooltip.hide());
  }

  tooltipOnShow() {
    // this.tooltipShowEvents$.next('show');
  }

  tooltipOnHide() {
    // this.tooltipShowEvents$.next('hide');
  }

  hintEnter($event) {
    this.hintMouseEvents$.next('enter');
  }

  hintLeave($event) {
    timer(800).subscribe(() => this.tooltip.hide());
    this.hintMouseEvents$.next('leave');
  }
}
