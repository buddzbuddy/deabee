import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem } from '../nav-item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  @ViewChild('drawer') drawer: ElementRef;
  menuItems: MenuItem[] = [
    {
      "DisplayName":"",
      "Route":"",
      "IconName":""
    }
  ];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataSvc: DataService
    ) { }
    ngOnInit(){
      this.dataSvc.getMenuItems().subscribe(data => this.menuItems = data.value);
    }
}
