import { Component, AfterViewInit } from '@angular/core';

declare function perfectScrollBar(): any;
declare function script(): any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    //perfectScrollBar();
    //script();
  }

}
