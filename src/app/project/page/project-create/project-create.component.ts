import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import formUtils from 'src/app/shared/utils/form-utils';

@Component({
  selector: 'm-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  public form: FormGroup;
  public loading = false;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      description: [null, Validators.maxLength(240)],
      admin: [null, [Validators.required]],
      privacy: [null, [Validators.required]],
      users: [null],
    });
  }

  public getError(control: string): string {
    return formUtils.getError(this.form, control);
  }

  public resizeTextArea(textarea: any, control: AbstractControl) {
    return formUtils.resizeTextArea(textarea, control);
  }

  public async save() {
    if (this.form.invalid){ return; }

    console.log(this.form.value);
  }

}
