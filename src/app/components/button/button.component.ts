import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-button",
  template: `
        <div class="button-row" [formGroup]="group">
          <button mat-raised-button color="primary" type="submit" [disabled]="group.invalid">{{field.label}}</button>
        </div>
`,
  styles: []
})
export class ButtonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {

  }
}
