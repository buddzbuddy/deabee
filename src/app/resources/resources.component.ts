import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { EntityformComponent } from '../material/entity-form/entity-form.component';
import { MaterialService } from '../material.service';
import { NotificationService } from '../notification.service';
import { FieldConfig } from '../field.interface';
import { Validators } from '@angular/forms';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  columnsToDisplay: string[] = [];
  columnCaptionsToDisplay: any[] = [];
  columnCaptionsToDisplay2: any[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() templateId: number = 0;
  @Input() isSelect: boolean = false;
  @Input() isMultiSelect: boolean = false;
  @Output() selectResourceItem = new EventEmitter();
  @Output() checkResourceItem = new EventEmitter();
  searchKey: string;
  oDataItems: MatTableDataSource<any>;
  entityName: string;
  entityCaption: string;
  //templateId: number = 0;
  isLoadingResults = false;
  constructor(
    private odataSvc: DataService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private materialSvc: MaterialService,
    private notificationSvc: NotificationService,
    private router: Router
    ) {
      this.isLoadingResults = true;
    }
  onSelectedResourceItem(selectedResourceItemId) {
    this.selectResourceItem.emit(selectedResourceItemId);
  }
  onCheckedResourceItem(resourceItemId, event) {
    this.checkResourceItem.emit({ resourceItemId, isChecked: event.checked });
  }
  ngOnInit() {
    this.initResources();
  }
  initResourceByTemplateId(){
    if(this.templateId == 0) return;
    this.odataSvc.getTemplateById(this.templateId).subscribe(template => {
      this.entityName = template.Name;
      this.entityCaption = template.Description;
      this.odataSvc.getFieldsByTemplateId(this.templateId).subscribe((tField) => {
        this.columnCaptionsToDisplay = tField.value;
        this.odataSvc.getODataResource(this.entityName + "s").subscribe(data => {
          this.oDataItems = new MatTableDataSource(data.value);
          this.createFields();
          this.oDataItems.sort = this.sort;
          this.oDataItems.paginator = this.paginator;
          this.columnsToDisplay.push('actions');
          this.oDataItems.filterPredicate = (data, filter) => {
            return this.columnsToDisplay.some(ele => {
              return ele != 'actions' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
            });
          };
          this.isLoadingResults = false;
        });
      });
    });
  }
  initDynamicTemplates(){
    this.odataSvc.getDynamicTemplates().subscribe(data => {
      this.oDataItems = new MatTableDataSource(data.value);
      this.createFields();
      this.oDataItems.sort = this.sort;
      this.oDataItems.paginator = this.paginator;

      this.oDataItems.filterPredicate = (data, filter) => {
        return this.columnsToDisplay.some(ele => {
          return data[ele].toString().toLowerCase().indexOf(filter) != -1;
        });
      };
      this.isLoadingResults = false;
    });
  }
  initResources(){
    this.isLoadingResults = true;
    if(this.templateId > 0) {
      this.initResourceByTemplateId();
    }
    else if (this.route.params != null) {
      this.route.params.subscribe(params => {
        if (params['templateId'] != null) {
          this.templateId = params['templateId'];
          this.initResourceByTemplateId();
        }
        else {
          this.initDynamicTemplates();
        }
      });
    }
  }
  createFields(){
    this.columnsToDisplay = [];
    if(this.oDataItems.data.length > 0){
      let firstRow = this.oDataItems.data[0];
      Object.keys(firstRow).forEach((field) => {
        this.columnsToDisplay.push(field);
        let captionObj = this.columnCaptionsToDisplay.find((x) => x.Name == field);
        if(captionObj != null) this.columnCaptionsToDisplay2[field] = captionObj.Label;
        else this.columnCaptionsToDisplay2[field] = field;
      });
    }
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.oDataItems.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "90%";
    const resourceProperties: FieldConfig[] = [];
    this.odataSvc.getFieldsByTemplateId(this.templateId).subscribe(data => {
      for (let f of data.value) {
        let resourceProperty: FieldConfig = {
          name: f.Name,
          label: f.Label,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: f.Label + ' is required'
            }
          ],
          type: f.ElementType
        };
        if(f.InputType){
          resourceProperty.inputType = f.InputType;
        }
        resourceProperties.push(resourceProperty);
      }
      resourceProperties.push({
        type: "button",
        label: "Сохранить"
      });
      dialogConfig.data = {
        resourceName: this.entityName,
        resourceCaption: this.entityCaption,
        resourceId: this.templateId,
        resourceProperties
      }
      let d = this.dialog.open(EntityformComponent, dialogConfig);
      d.afterClosed().subscribe(dialogData => {
        if(dialogData.reload)
          this.initResources();
      });
    });
  }

  onDetails(row){
    this.router.navigate(['resources/' + this.templateId + '/viewItem/' + row['Id']]);
    /*const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "90%";

    const resourceProperties: FieldConfig[] = [];
    this.odataSvc.getFieldsByTemplateId(this.templateId).subscribe(data => {
      for (let f of data.value) {
        let resourceProperty: FieldConfig = {
          name: f.Name,
          label: f.Label,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: f.Label + ' is required'
            }
          ],
          type: f.ElementType
        };
        if(f.InputType){
          resourceProperty.inputType = f.InputType;
        }
        if(row[f.Name]) {
          resourceProperty.value = row[f.Name]
        }
        resourceProperties.push(resourceProperty);
      }
      resourceProperties.push({
        name: "Id",
        label: "#",
        type: "input",
        inputType: "text",
        value: row['Id']
      });
      dialogConfig.data = {
        resourceName: this.entityName,
        resourceCaption: this.entityCaption,
        resourceId: this.templateId,
        resourceProperties
      }
      let d = this.dialog.open(EntityformComponent, dialogConfig);
      d.afterClosed().subscribe(dialogData => {
        if(dialogData.reload)
          this.initResources();
      });
    });*/
  }

  onEdit(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "90%";

    const resourceProperties: FieldConfig[] = [];
    this.odataSvc.getFieldsByTemplateId(this.templateId).subscribe(data => {
      for (let f of data.value) {
        let resourceProperty: FieldConfig = {
          name: f.Name,
          label: f.Label,
          validations: [
            {
              name: 'required',
              validator: Validators.required,
              message: f.Label + ' is required'
            }
          ],
          type: f.ElementType
        };
        if(f.InputType){
          resourceProperty.inputType = f.InputType;
        }
        if(row[f.Name]) {
          resourceProperty.value = row[f.Name]
        }
        resourceProperties.push(resourceProperty);
      }
      resourceProperties.push({
        name: "Id",
        label: "#",
        type: "input",
        inputType: "text",
        value: row['Id']
      });
      resourceProperties.push({
        type: "button",
        label: "Сохранить"
      });
      dialogConfig.data = {
        resourceName: this.entityName,
        resourceCaption: this.entityCaption,
        resourceId: this.templateId,
        resourceProperties
      }
      let d = this.dialog.open(EntityformComponent, dialogConfig);
      d.afterClosed().subscribe(dialogData => {
        if(dialogData.reload)
          this.initResources();
      });
    });
  }

  onDelete(Id){
    if(confirm('Are you sure to delete this record?')){
      this.materialSvc.deleteResource(this.entityName, Id).then(_ => {
        this.notificationSvc.success('Deleted successfully');
        this.initResources();
      }).catch(_ => {
        this.notificationSvc.warn('! Deleting failed. See console logs to deails...');
      });
    }
  }
}
