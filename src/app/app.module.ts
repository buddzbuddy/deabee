import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { HttpClientModule } from "@angular/common/http";
import { OAuthModule } from 'angular-oauth2-oidc';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProcesslistComponent } from './processlist/processlist.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { HomeComponent } from './home/home.component';
import { StartProcessComponent } from './start-process/start-process.component';
import { GenericForm } from './generic-form.component';
import { CamundaRestService } from './camunda-rest.service';
import { ResourcesComponent } from './resources/resources.component';
import { MaterialModule } from './material.module';
import { DataService } from './data.service';
import { MaterialService } from './material.service';
import { EntityformComponent } from './material/entity-form/entity-form.component';

import { InputComponent } from "./components/input/input.component";
import { ButtonComponent } from "./components/button/button.component";
import { SelectComponent } from "./components/select/select.component";
import { DateComponent } from "./components/date/date.component";
import { RadiobuttonComponent } from "./components/radiobutton/radiobutton.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectGridComponent } from './grid/select-grid.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NavService } from './nav.service';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './local-storage.service';
import { TaskFormComponent } from './material/task-form/task-form.component';
import { MonitorComponent } from './monitor/monitor.component';
import { ReportComponent } from './report/report.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletCoreComponent } from './leaflet/leaflet-core/leaflet-core.component';
import { LeafletEventsComponent } from './leaflet/leaflet-events/leaflet-events.component';
import { BaselayersComponent } from './leaflet/layers/baselayers/baselayers.component';
import { LayersComponent } from './leaflet/layers/layers/layers.component';
import { MarkersComponent } from './leaflet/layers/markers/markers.component';
import { NgforLayersComponent } from './leaflet/layers/ngfor-layers/ngfor-layers.component';
import { PerformanceComponent } from './leaflet/performance/performance.component';
import { LeafletWrapperComponent } from './leaflet/performance/leaflet-wrapper/leaflet-wrapper.component';
import { ViewItemComponent } from './resources/view-item/view-item.component';
import { MultiSelectFormComponent } from './grid/multi-select-form/multi-select-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ProcesslistComponent,
    TasklistComponent,
    HomeComponent,
    StartProcessComponent,
    GenericForm,
    ResourcesComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    SelectGridComponent,
    MainNavComponent,
    MenuListItemComponent,
    MonitorComponent,
    ReportComponent,
    LeafletCoreComponent,
    LeafletEventsComponent,
    BaselayersComponent,
    LayersComponent,
    MarkersComponent,
    NgforLayersComponent,
    PerformanceComponent,
    LeafletWrapperComponent,
    ViewItemComponent,
    MultiSelectFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['http://localhost:5001/api/identity'],
          sendAccessToken: true
      }
  }),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    StorageServiceModule,
    LeafletModule.forRoot()
  ],
  providers: [
    CamundaRestService,
    DataService,
    MaterialService,
    NavService,
    LocalStorageService
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    EntityformComponent,
    TaskFormComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    SelectGridComponent,
    MultiSelectFormComponent
  ]
})
export class AppModule {
 }
