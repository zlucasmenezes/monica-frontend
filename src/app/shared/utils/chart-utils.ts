import { ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';

class ChartUtils {
  private marleyColor = '#f7f7f7';
  private orangeColor = '#ff8801';
  private grayColor = '#333333';

  public getSingleDeviceDataOptions(stepX?: number, stepY?: number): ChartOptions {
    return {
      responsive: true,
      legend: {
        display: false,
      },
      tooltips: {
        displayColors: false,
      },
      elements: {
        line: {
          borderWidth: 4,
        },
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            gridLines: {
              color: this.marleyColor,
              lineWidth: 0.3,
              zeroLineColor: this.marleyColor,
              zeroLineWidth: 0,
            },
            ticks: {
              fontColor: this.marleyColor,
            },
            time: {
              ...this.getUnitStep(stepX ? stepX : null),
              tooltipFormat: 'YYYY-MM-DD HH:mm:ss',
              displayFormats: {
                millisecond: 'MM/DD HH:mm:ss',
                second: 'MM/DD HH:mm:ss',
                minute: 'MM/DD HH:mm',
                hour: 'MM/DD HH',
                day: 'MM/DD/YY',
              },
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: this.marleyColor,
              lineWidth: 0.3,
              zeroLineColor: this.marleyColor,
              zeroLineWidth: 0.3,
            },
            ticks: {
              fontColor: this.marleyColor,
              stepSize: stepY,
            },
          },
        ],
      },
    };
  }

  public getSingleDeviceDataColors(): Color[] {
    return [
      {
        backgroundColor: this.marleyColor + '33',
        borderColor: this.marleyColor,
        pointBackgroundColor: this.marleyColor,
        pointBorderColor: this.marleyColor,
        pointHoverBackgroundColor: this.marleyColor,
        pointHoverBorderColor: this.marleyColor,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBorderWidth: 0,
        pointStyle: 'circle',
      },
    ];
  }

  public getTSDataOptions(title: string | string[]): ChartOptions {
    return {
      title: {
        text: title,
        display: true,
        fontSize: 16,
        fontStyle: 'normal',
        fontFamily: 'Roboto',
        fontColor: this.orangeColor,
        padding: 20,
      },
      responsive: true,
      legend: {
        display: false,
      },
      tooltips: {
        displayColors: false,
      },
      elements: {
        line: {
          borderWidth: 1,
        },
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            gridLines: {
              color: this.grayColor,
              lineWidth: 0.3,
              zeroLineColor: this.grayColor,
              zeroLineWidth: 0,
            },
            ticks: {
              fontColor: this.grayColor,
            },
            time: {
              tooltipFormat: 'YYYY-MM-DD HH:mm:ss',
              displayFormats: {
                millisecond: 'MM/DD/YY HH:mm:ss',
                second: 'MM/DD/YY HH:mm:ss',
                minute: 'MM/DD/YY HH:mm',
                hour: 'MM/DD/YY HH',
                day: 'MM/DD/YY',
              },
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: this.grayColor,
              lineWidth: 0.3,
              zeroLineColor: this.grayColor,
              zeroLineWidth: 0.3,
            },
            ticks: {
              fontColor: this.grayColor,
            },
          },
        ],
      },
    };
  }

  public getTSDataColors(): Color[] {
    return [
      {
        backgroundColor: this.orangeColor + '33',
        borderColor: this.orangeColor,
        pointBackgroundColor: this.orangeColor,
        pointBorderColor: this.orangeColor,
        pointHoverBackgroundColor: this.orangeColor,
        pointHoverBorderColor: this.orangeColor,
        pointRadius: 1,
        pointHoverRadius: 2,
        pointBorderWidth: 0,
        pointStyle: 'circle',
      },
    ];
  }

  private getUnitStep(stepX?: number): { unit?: Chart.TimeUnit; unitStepSize?: number } {
    if (stepX === null) {
      return {};
    }

    stepX /= 1000;

    if (stepX < 60) {
      return { unit: 'second', unitStepSize: stepX };
    }
    if (stepX < 60 * 60) {
      return { unit: 'minute', unitStepSize: stepX / 60 };
    }
    if (stepX < 24 * 60 * 60) {
      return { unit: 'hour', unitStepSize: stepX / (60 * 60) };
    }

    return { unit: 'day', unitStepSize: stepX / (60 * 60 * 24) };
  }
}
export default new ChartUtils();
