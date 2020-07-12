import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

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
      name: [null, [Validators.required]],
      description: [null],
      admin: [null, [Validators.required]],
      privacy: [null, [Validators.required]],
      users: [null],
    });
  }

  public getError(control: string): string {
    const errors: ValidationErrors = this.form.get(control).errors;

    let error = `invalid ${control}`;

    if (!errors) { return error; }
    if (errors.required) { error = `${control} is required`; }
    if (errors.minlength) { error = `${control} must be at least ${errors.minlength.requiredLength} characters`; }

    return error.charAt(0).toUpperCase() + error.slice(1);
  }

  public async save() {
    console.log(this.form.value);
  }

}
