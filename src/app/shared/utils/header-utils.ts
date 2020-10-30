import { IHeaderLink } from '../components/header/header.model';

class HeaderUtils {
  public getHeaderLinks(): IHeaderLink[] {
    return [
      {
        name: 'PROJECTS',
        route: 'project',
      },
      {
        name: 'TIME SERIES DATA',
        route: 'ts',
      },
    ];
  }
}
export default new HeaderUtils();
