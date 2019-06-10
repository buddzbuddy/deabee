import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProcesslistComponent } from './processlist/processlist.component';
import { StartProcessComponent } from './start-process/start-process.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { ResourcesComponent } from './resources/resources.component';
import { MonitorComponent } from './monitor/monitor.component';
import { ReportComponent } from './report/report.component';
import { ViewItemComponent } from './resources/view-item/view-item.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'processlist', component: ProcesslistComponent },
  { path: 'startprocess/:processdefinitionkey', component: StartProcessComponent },
  { path: 'tasklist', component: TasklistComponent },
  { path: 'tasklist/:id', component: TasklistComponent },
  {
    path: 'resources',
    component: ResourcesComponent
  },
  {
    path: 'resources/:templateId',
    component: ResourcesComponent
  },
  {
    path: 'resources/:templateId/viewItem/:resourceItemId',
    component: ViewItemComponent
  },
  {
    path: 'monitor',
    component: MonitorComponent
  },
  {
    path: 'report',
    component: ReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
