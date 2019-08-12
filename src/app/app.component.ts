import { Component, ViewChild } from '@angular/core';
import { TooltipDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tooltipMessage: string;
  @ViewChild('pop', { static: false }) tooltip: TooltipDirective;

  timer;

  hide() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.tooltip.hide(), 800);
  }

  show() {
    clearTimeout(this.timer);
    if (this.tooltip.isOpen) {
      return;
    }
    this.tooltip.show();
  }
}
