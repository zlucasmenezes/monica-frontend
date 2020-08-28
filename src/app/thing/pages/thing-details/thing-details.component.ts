import { Component, OnInit } from '@angular/core';
import { IProjectPopulated } from 'src/app/project/project.model';
import { IThingPopulated } from '../../thing.model';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ThingService } from '../../thing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/project/project.service';

@Component({
  selector: 'm-thing-details',
  templateUrl: './thing-details.component.html',
  styleUrls: ['./thing-details.component.scss']
})
export class ThingDetailsComponent implements OnInit {

  public project: IProjectPopulated;
  public thing: IThingPopulated;

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private thingService: ThingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  async ngOnInit(): Promise<void> {
    this.project = await this.getProject();
    this.thing = await this.getThing();
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

  public isAdmin(): boolean {
    if (!this.project) { return false; }
    return this.project.admin._id === this.authService.getTokenData().userId;
  }

  public addSensor() {
    this.router.navigate([`project/${this.project._id}/thing/${this.thing._id}/sensor/create`]);
  }

}
