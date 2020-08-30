import { ISensorPopulated } from './../../sensor.model';
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

  public sensorId: ISensor['_id'];

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private sensorTypeService: SensorTypeService,
    private sensorService: SensorService
  ) { }

  async ngOnInit() {
    this.filteredTypes$.next(this.types = arrayUtils.orderBy(await this.getTypes(), 'ASC', 'type'));
    this.initForm(
      await this.getSensor(
        this.getProjectId(),
        this.getThingId(),
        this.sensorId = this.getSensorId()
      )
    );
    this.subscribeForm();
  }

  private initForm(sensor: ISensorPopulated) {
    this.form = this.fb.group({
      name: [sensor ? sensor.name ? sensor.name : null : null, [Validators.required, Validators.maxLength(64)]],
      type: [sensor ? sensor.type ? sensor.type._id : null : null, [Validators.required]],
      pin: [sensor ? sensor.pin ? sensor.pin : null : null, [Validators.required, Validators.min(1)]],
      pollTime: [sensor ? sensor.pollTime ? sensor.pollTime : null : null, [Validators.required, Validators.min(1000)]],
      store: [sensor ? sensor.store ? sensor.store : true : true, [Validators.required]],
      thing: [this.getThingId(), [Validators.required]],
      function: [sensor ? sensor.function ? sensor.function : null : null],
      config: this.fb.array([])
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

  private getSensorId(): string {
    return this.activatedRoute.snapshot.paramMap.get('sensorId');
  }

  private async getSensor(projectId: string, thingId: string, sensorId: string): Promise<ISensorPopulated> {
    return await this.sensorService.getSensor(projectId, thingId, sensorId);
  }

  private async getTypes(): Promise<ISensorType[]> {
    return await this.sensorTypeService.getTypes();
  }

  public getTypeName(id: string): string {
    const type = this.types.filter(t => t._id === id);

    return type[0] ? type[0].type : '';
  }

  public getType(id: string): ISensorType {
    const type = this.types.filter(t => t._id === id);

    return type[0] ? type[0] : null;
  }

  public save() {
    if (!this.validate()) { return; }

    this.loading = true;

    let save: Promise<void>;
    if (this.sensorId) {
      save = save = this.sensorService.editSensor(this.getProjectId(), this.sensorId, this.form.value as ISensor);
    } else {
      save = this.sensorService.createSensor(this.getProjectId(), this.form.value as ISensor);
    }

    save.finally(() => {
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
