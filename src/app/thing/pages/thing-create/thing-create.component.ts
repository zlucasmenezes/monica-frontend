import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { IProjectPopulated } from 'src/app/project/project.model';
import arrayUtils from 'src/app/shared/utils/array-utils';
import formUtils from 'src/app/shared/utils/form-utils';
import { IThing, IThingPopulated } from '../../thing.model';
import { ThingService } from '../../thing.service';
import { ProjectService } from './../../../project/project.service';

@Component({
  selector: 'm-thing-create',
  templateUrl: './thing-create.component.html',
  styleUrls: ['./thing-create.component.scss'],
})
export class ThingCreateComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public loading = false;

  public types: string[] = [];
  public filteredTypes$: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  public project: IProjectPopulated;

  public thingId: IThing['_id'];

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private thingService: ThingService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  async ngOnInit() {
    this.project = await this.getProject();
    this.filteredTypes$.next((this.types = arrayUtils.orderBy(await this.getTypes(), 'ASC')));
    this.initForm(await this.getThing(this.getProjectId(), (this.thingId = this.getThingId())));
    this.subscribeForm();
  }

  private getProjectId(): string {
    return this.activatedRoute.snapshot.paramMap.get('projectId');
  }

  private async getProject(): Promise<IProjectPopulated> {
    return await this.projectService.getProject(this.getProjectId());
  }

  private getThingId(): string {
    return this.activatedRoute.snapshot.paramMap.get('thingId');
  }

  private async getThing(projectId: string, thingId: string): Promise<IThingPopulated> {
    return await this.thingService.getThing(projectId, thingId);
  }

  private async getTypes(): Promise<string[]> {
    return await this.thingService.getTypes(this.getProjectId());
  }

  private initForm(thing: IThingPopulated) {
    this.form = this.fb.group({
      name: [thing ? thing.name : null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      type: [thing ? thing.type : null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      project: [this.getProjectId(), [Validators.required]],
    });
  }

  private async subscribeForm() {
    this.form
      .get('type')
      .valueChanges.pipe(takeUntil(this.onDestroy), startWith(''))
      .subscribe((value: string) => {
        this.filterTypes(value);
      });
  }

  public save() {
    if (!this.validate()) {
      return;
    }

    this.loading = true;

    let save: Promise<void>;
    if (this.thingId) {
      save = this.thingService.editThing(this.thingId, this.form.value as IThing);
    } else {
      save = this.thingService.createThing(this.form.value as IThing);
    }

    save.finally(() => {
      this.loading = false;
    });
  }

  private validate(): boolean {
    if (this.form.invalid) {
      return false;
    }
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
