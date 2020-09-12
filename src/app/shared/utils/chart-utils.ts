import { ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';

class ChartUtils {

  private marleyColor = '#f7f7f7';

  public getSingleDeviceOptions(stepX?: number, stepY?: number): ChartOptions {
    return {
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        displayColors: false
      },
      elements: {
        line: {
          borderWidth: 4
        }
      },
      scales: {
        xAxes: [{
          type: 'time',
          gridLines: {
            color: this.marleyColor,
            lineWidth: .3,
            zeroLineColor: this.marleyColor,
            zeroLineWidth: 0
          },
          ticks: {
            fontColor: this.marleyColor
          },
          time: {
            ... this.getUnitStep(stepX),
            tooltipFormat: 'YYYY-MM-DD HH:mm:ss',
            displayFormats: {
              second: 'MM/DD HH:mm:ss',
              minute: 'MM/DD HH:mm',
              hour: 'MM/DD HH',
              day: 'MM/DD/YY',
            }
          }
        }],
        yAxes: [{
          gridLines: {
            color: this.marleyColor,
            lineWidth: .3,
            zeroLineColor: this.marleyColor,
            zeroLineWidth: .3
          },
          ticks: {
            fontColor: this.marleyColor,
            stepSize: stepY,
          }
        }]
      }
    };
  }

  private getUnitStep(stepX: number): { unit: Chart.TimeUnit, unitStepSize: number } {
    stepX /= 1000;

    if (stepX < 60) {
      return  { unit: 'second', unitStepSize: stepX } ;
    }
    if (stepX < 60 * 60) {
      return  { unit: 'minute', unitStepSize: stepX / 60 } ;
    }
    if (stepX < 24 * 60 * 60) {
      return  { unit: 'hour', unitStepSize: stepX / (60 * 60) } ;
    }

    return  { unit: 'day', unitStepSize: stepX / (60 * 60 * 24) } ;
  }

  public getSingleDeviceColors(): Color[] {
    return [{
      backgroundColor: 'transparent',
      borderColor: this.marleyColor,
      pointBackgroundColor: this.marleyColor,
      pointBorderColor: this.marleyColor,
      pointHoverBackgroundColor: this.marleyColor,
      pointHoverBorderColor: this.marleyColor,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBorderWidth: 0,
      pointStyle: 'circle'
    }];
  }

}
export default new ChartUtils();
