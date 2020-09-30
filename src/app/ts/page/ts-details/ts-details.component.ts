import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProjectPopulated } from 'src/app/project/project.model';
import { ProjectService } from 'src/app/project/project.service';
import arrayUtils from 'src/app/shared/utils/array-utils';
import { IThingPopulated } from 'src/app/thing/thing.model';
import { ThingService } from 'src/app/thing/thing.service';

@Component({
  selector: 'm-ts-details',
  templateUrl: './ts-details.component.html',
  styleUrls: ['./ts-details.component.scss'],
})
export class TsDetailsComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  public projectList: IProjectPopulated[];
  public projectFilteredList$: ReplaySubject<IProjectPopulated[]> = new ReplaySubject<IProjectPopulated[]>(1);
  public projectFilter = new FormControl();

  public thingList: IThingPopulated[];
  public thingFilteredList$: ReplaySubject<IThingPopulated[]> = new ReplaySubject<IThingPopulated[]>(1);
  public thingFilter = new FormControl();

  public loading = false;

  private onDestroy = new Subject<any>();

  constructor(private fb: FormBuilder, private projectService: ProjectService, private thingService: ThingService) {}

  async ngOnInit(): Promise<void> {
    this.projectFilteredList$.next((this.projectList = await this.getProjects()));

    this.initForm();
    this.subscribeForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      project: [null, [Validators.required]],
      thing: [{ value: null, disabled: true }, [Validators.required]],
      device: [{ value: null, disabled: true }, [Validators.required]],
    });
  }

  private subscribeForm() {
    this.projectFilter.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(value => {
      this.projectFilteredList$.next(this.filterProjects(value));
    });
    this.thingFilter.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(value => {
      this.thingFilteredList$.next(this.filterThings(value));
    });

    this.form
      .get('project')
      .valueChanges.pipe(takeUntil(this.onDestroy))
      .subscribe(async value => {
        this.form.get('thing').setValue(null);
        this.thingFilteredList$.next((this.thingList = await this.getThings(value)));
      });

    this.thingFilteredList$.pipe(takeUntil(this.onDestroy)).subscribe(things => {
      if (things && things.length > 0) {
        this.form.get('thing').enable();
      }
    });
  }

  private async getProjects(): Promise<IProjectPopulated[]> {
    return await this.projectService.getProjects();
  }

  private async getThings(project: string): Promise<IThingPopulated[]> {
    return await this.thingService.getThings(project);
  }

  public getProjectName(id: string): string {
    if (!this.projectList) {
      return;
    }

    const project = this.projectList.filter(u => u._id === id);
    return project[0] ? project[0].name : '';
  }

  public getThingName(id: string): string {
    if (!this.thingList) {
      return;
    }

    const thing = this.thingList.filter(u => u._id === id);
    return thing[0] ? thing[0].name : '';
  }

  public filterProjects(filter: string): IProjectPopulated[] {
    const fields = ['name'];
    return arrayUtils.filter(this.projectList, filter, fields);
  }

  public filterThings(filter: string): IThingPopulated[] {
    const fields = ['name', 'type'];
    return arrayUtils.filter(this.thingList, filter, fields);
  }

  public getTSData() {
    this.loading = true;
    console.log(this.form.getRawValue());
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
