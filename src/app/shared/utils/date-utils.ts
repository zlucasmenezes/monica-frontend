import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

class DateUtils {
  public formatMillis(milliseconds: number, decimalPlaces = 1): string {
    if (!milliseconds) {
      return;
    }

    if (milliseconds < 60000) {
      const seconds =
        Math.round(dayjs.duration(milliseconds, 'milliseconds').asSeconds() * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
    }
    if (milliseconds < 60 * 60000) {
      const minutes =
        Math.round(dayjs.duration(milliseconds, 'milliseconds').asMinutes() * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
    if (milliseconds < 24 * 60 * 60000) {
      const hours =
        Math.round(dayjs.duration(milliseconds, 'milliseconds').asHours() * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }

    const days =
      Math.round(dayjs.duration(milliseconds, 'milliseconds').asDays() * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  }

  public fromNow(milliseconds: number): string {
    if (!milliseconds) {
      return;
    }

    const millisecondsFromNow = dayjs().diff(dayjs(milliseconds), 'ms');

    if (millisecondsFromNow < 1000) {
      return `updated now`;
    }
    if (millisecondsFromNow < 60000) {
      const seconds = Math.floor(dayjs.duration(millisecondsFromNow, 'milliseconds').asSeconds());
      return `${seconds} ${seconds === 1 ? 'second ago' : 'seconds ago'}`;
    }
    if (millisecondsFromNow < 60 * 60000) {
      const minutes = Math.floor(dayjs.duration(millisecondsFromNow, 'milliseconds').asMinutes());
      return `about ${minutes} ${minutes === 1 ? 'minute ago' : 'minutes ago'}`;
    }
    if (millisecondsFromNow < 24 * 60 * 60000) {
      const hours = Math.floor(dayjs.duration(millisecondsFromNow, 'milliseconds').asHours());
      return `about ${hours} ${hours === 1 ? 'hour ago' : 'hours ago'}`;
    }

    const days = Math.floor(dayjs.duration(millisecondsFromNow, 'milliseconds').asDays());
    return `about ${days} ${days === 1 ? 'day ago' : 'days ago'}`;
  }
}
export default new DateUtils();
