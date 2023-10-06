import { AfterViewInit, Component, OnInit } from '@angular/core';


declare function perfectScrollBar(): any;
declare function script(): any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'repositorio-fet';

  constructor() { }

  ngAfterViewInit(): void {
    perfectScrollBar();
    script();
  }
}
