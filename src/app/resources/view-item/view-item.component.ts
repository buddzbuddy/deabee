import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent implements OnInit {
  templateId: number = 0;
  resourceItemId: number = 0;
  resourceName: string = '';
  fieldValues: any[] = [];
  fields: any[] = [];
  buttons: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private odataSvc: DataService
  ) { }

  ngOnInit() {
    if (this.route.params != null) {
      this.route.params.subscribe(params => {
        if (params['templateId'] != null && params['resourceItemId'] != null) {
          this.templateId = params['templateId'];
          this.resourceItemId = params['resourceItemId'];

          this.odataSvc.getTemplateById(this.templateId).subscribe(t => {
            this.resourceName = t.Name;
            this.odataSvc.getFieldsByTemplateId(this.templateId).subscribe(data => {
              this.fields = data.value;
              this.odataSvc.getODataResourceItem(this.resourceName, this.resourceItemId).subscribe(data => {
                this.fieldValues = data;
              });
            });
          });
          this.odataSvc.getButtonsByTemplateId(this.templateId).subscribe(data => {
            this.buttons = data.value;
          });
        }
      });
    }
  }

}
