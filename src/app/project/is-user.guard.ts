import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class IsUserGuard implements CanActivate {
  constructor(private authService: AuthService, private projectService: ProjectService, private router: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const projectId = next.paramMap.get('projectId');
    const project = await this.projectService.getProject(projectId);

    if (project.privacy === 'public') {
      return true;
    }

    const userId = this.authService.getTokenData().userId;

    if (project.admin._id === userId) {
      return true;
    }

    if (project.users.some(user => user._id === userId)) {
      return true;
    }

    this.router.navigate(['/project']);
    return false;
  }
}
