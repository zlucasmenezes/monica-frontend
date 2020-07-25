import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import formUtils from 'src/app/shared/utils/form-utils';
import { ThingService } from '../../thing.service';
import { IProject } from 'src/app/project/project.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntil, startWith } from 'rxjs/operators';
import { IThing } from '../../thing.model';
import { ReplaySubject, Subject } from 'rxjs';
import arrayUtils from 'src/app/shared/utils/array-utils';

@Component({
  selector: 'm-thing-create',
  templateUrl: './thing-create.component.html',
  styleUrls: ['./thing-create.component.scss']
})
export class ThingCreateComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public loading = false;

  public types: string[] = [];
  public filteredTypes$: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private thingService: ThingService,
    private activatedRoute: ActivatedRoute
    ) { }

  async ngOnInit() {
    this.filteredTypes$.next(this.types = arrayUtils.orderBy(await this.getTypes(), 'ASC'));
    this.initForm();
    this.subscribeForm();
  }

  private getProjectId(): string {
    return this.activatedRoute.snapshot.paramMap.get('projectId');
  }

  private async getTypes(): Promise<string[]> {
    return await this.thingService.getTypes(this.getProjectId());
  }

  private initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      type: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      project: [this.getProjectId(), [Validators.required]],
    });
  }

  private async subscribeForm() {
    this.form.get('type').valueChanges.pipe(takeUntil(this.onDestroy), startWith(''))
    .subscribe((value: string) => {
      this.filterTypes(value);
    });
  }

  public save() {
    if (!this.validate()) { return; }

    this.loading = true;

    this.thingService.createThing(this.form.value as IThing).finally(() => {
      this.loading = false;
    });
  }

  private validate(): boolean {
    if (this.form.invalid){ return false; }
    return true;
  }

  public getError(control: string): string {
    return formUtils.getError(this.form, control);
  }

  public filterTypes(filter: string) {
    this.filteredTypes$.next(arrayUtils.filter(this.types, filter));
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
