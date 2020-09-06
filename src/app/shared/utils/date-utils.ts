import * as moment from 'moment';

class DateUtils {

  public formatMillis(milliseconds: number): string {
    if (!milliseconds) { return ''; }

    if (milliseconds < 60000) {
      const seconds = Math.round(moment.duration(milliseconds, 'milliseconds').asSeconds() * 10) / 10;
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
    }
    if (milliseconds < 60 * 60000) {
      const minutes = Math.round(moment.duration(milliseconds, 'milliseconds').asMinutes() * 10) / 10;
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
    if (milliseconds < 24 * 60 * 60000) {
      const hours = Math.round(moment.duration(milliseconds, 'milliseconds').asHours() * 10) / 10;
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }

    const days = Math.round(moment.duration(milliseconds, 'milliseconds').asDays() * 10) / 10;
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  }
}
export default new DateUtils();
