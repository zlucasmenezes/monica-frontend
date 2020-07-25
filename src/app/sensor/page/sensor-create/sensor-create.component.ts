import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import formUtils from 'src/app/shared/utils/form-utils';
import { SensorTypeService } from '../../sensor-type.service';
import { ISensorType, ISensor } from '../../sensor.model';
import arrayUtils from 'src/app/shared/utils/array-utils';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SensorService } from '../../sensor.service';

@Component({
  selector: 'm-sensor-create',
  templateUrl: './sensor-create.component.html',
  styleUrls: ['./sensor-create.component.scss']
})
export class SensorCreateComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public loading = false;

  public types: ISensorType[] = [];

  public filteredTypes$: ReplaySubject<ISensorType[]> = new ReplaySubject<ISensorType[]>(1);
  public typeFilter = new FormControl();

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private sensorTypeService: SensorTypeService,
    private sensorService: SensorService
  ) { }

  async ngOnInit() {
    this.filteredTypes$.next(this.types = arrayUtils.orderBy(await this.getTypes(), 'ASC', 'type'));
    this.initForm();
    this.subscribeForm();
  }

  private initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(64)]],
      type: [null, [Validators.required]],
      pin: [null, [Validators.required, Validators.min(1)]],
      pollTime: [null, [Validators.required, Validators.min(1000)]],
      thing: [this.getThingId(), [Validators.required]]
    });
  }

  private async subscribeForm() {
    this.typeFilter.valueChanges.pipe(takeUntil(this.onDestroy))
    .subscribe((value: string) => {
      this.filterTypes(value);
    });
  }

  private getProjectId(): string {
    return this.activatedRoute.snapshot.paramMap.get('projectId');
  }

  private getThingId(): string {
    return this.activatedRoute.snapshot.paramMap.get('thingId');
  }

  private async getTypes(): Promise<ISensorType[]> {
    return await this.sensorTypeService.getTypes();
  }

  public getTypeName(id: string): string {
    const type = this.types.filter(t => t._id === id);

    return type[0] ? type[0].type : '';
  }

  public save() {
    if (!this.validate()) { return; }

    this.loading = true;

    this.sensorService.createSensor(this.getProjectId(), this.form.value as ISensor).finally(() => {
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
    const fields = ['type', 'input'];
    this.filteredTypes$.next(arrayUtils.filter(this.types, filter, fields));
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
