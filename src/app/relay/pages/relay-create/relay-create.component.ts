import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProjectPopulated } from 'src/app/project/project.model';
import { ProjectService } from 'src/app/project/project.service';
import { IRelayPopulated } from 'src/app/relay/relay.model';
import formUtils from 'src/app/shared/utils/form-utils';
import { buttonPinValidator, isPinAvailableValidator } from 'src/app/shared/validators/pin.validator';
import { IThingPopulated } from 'src/app/thing/thing.model';
import { ThingService } from 'src/app/thing/thing.service';
import { IRelay } from '../../relay.model';
import { RelayService } from '../../relay.service';

@Component({
  selector: 'm-relay-create',
  templateUrl: './relay-create.component.html',
  styleUrls: ['./relay-create.component.scss'],
})
export class RelayCreateComponent implements OnInit {
  public form: FormGroup;
  public loading = false;

  public project: IProjectPopulated;
  public thing: IThingPopulated;
  private relay: IRelayPopulated;

  public relayId: IRelay['_id'];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private relayService: RelayService,
    private thingService: ThingService,
    private projectService: ProjectService
  ) {}

  async ngOnInit() {
    this.project = await this.getProject();
    this.thing = await this.getThing();

    this.initForm((this.relay = await this.getRelay(this.getProjectId(), this.getThingId(), (this.relayId = this.getRelayId()))));
    this.subscribeForm();
  }

  private initForm(relay: IRelayPopulated) {
    // tslint:disable: max-line-length
    this.form = this.fb.group({
      name: [relay ? (relay.name ? relay.name : null) : null, [Validators.required, Validators.maxLength(64)]],
      pin: [
        relay ? (relay.pin ? relay.pin : null) : null,
        [Validators.required, Validators.min(1), isPinAvailableValidator(this.getUnavailablePins(this.thing))],
      ],
      nc: [relay ? (relay.nc !== null ? relay.nc : false) : false, [Validators.required]],
      store: [relay ? (relay.store !== null ? relay.store : true) : true, [Validators.required]],
      button: [
        relay ? (relay.button ? relay.button : null) : null,
        [Validators.min(1), isPinAvailableValidator(this.getUnavailablePins(this.thing)), buttonPinValidator],
      ],
      thing: [this.getThingId(), [Validators.required]],
    });
  }

  private subscribeForm() {
    this.form.get('pin').valueChanges.subscribe(() => {
      this.form.get('button').updateValueAndValidity();
    });
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

  private async getThing(): Promise<IThingPopulated> {
    return await this.thingService.getThing(this.getProjectId(), this.getThingId());
  }

  private getRelayId(): string {
    return this.activatedRoute.snapshot.paramMap.get('relayId');
  }

  private async getRelay(projectId: string, thingId: string, relayId: string): Promise<IRelayPopulated> {
    return await this.relayService.getRelay(projectId, thingId, relayId);
  }

  private getUnavailablePins(thing: IThingPopulated): number[] {
    return [...thing.relays.map(relay => relay.pin), ...thing.sensors.map(sensor => sensor.pin)].filter(
      pin => pin !== (this.relay ? this.relay.pin : null)
    );
  }

  public save() {
    if (!this.validate()) {
      return;
    }

    this.loading = true;

    let save: Promise<void>;
    if (this.relayId) {
      save = this.relayService.editRelay(this.getProjectId(), this.relayId, this.form.value as IRelay);
    } else {
      save = this.relayService.createRelay(this.getProjectId(), this.form.value as IRelay);
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
}
