import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProjectPopulated } from 'src/app/project/project.model';
import { ProjectService } from 'src/app/project/project.service';
import formUtils from 'src/app/shared/utils/form-utils';
import { IThingPopulated } from 'src/app/thing/thing.model';
import { ThingService } from 'src/app/thing/thing.service';
import { IRelay, IRelayPopulated } from '../../relay.model';
import { RelayService } from '../../relay.service';

@Component({
  selector: 'm-relay-create',
  templateUrl: './relay-create.component.html',
  styleUrls: ['./relay-create.component.scss']
})
export class RelayCreateComponent implements OnInit {

  public form: FormGroup;
  public loading = false;

  public project: IProjectPopulated;
  public thing: IThingPopulated;

  public relayId: IRelay['_id'];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private relayService: RelayService,
    private thingService: ThingService,
    private projectService: ProjectService,
  ) { }

  async ngOnInit() {
    this.project = await this.getProject();
    this.thing = await this.getThing();
    this.initForm(
      await this.getRelay(
        this.getProjectId(),
        this.getThingId(),
        this.relayId = this.getRelayId()
      )
    );
  }

  private initForm(relay: IRelayPopulated) {
    this.form = this.fb.group({
      name: [relay ? relay.name ? relay.name : null : null, [Validators.required, Validators.maxLength(64)]],
      pin: [relay ? relay.pin ? relay.pin : null : null, [Validators.required, Validators.min(1)]],
      store: [relay ? relay.store !== null ? relay.store : true : true, [Validators.required]],
      thing: [this.getThingId(), [Validators.required]],
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

  public save() {
    if (!this.validate()) { return; }

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
    if (this.form.invalid) { return false; }
    return true;
  }

  public getError(control: string): string {
    return formUtils.getError(this.form, control);
  }

}
