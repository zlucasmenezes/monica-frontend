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
            fontColor: this.marleyColor,
          },
          time: {
            unit: 'second',
            unitStepSize: stepX / 1000,
            round: 'second',
            tooltipFormat: 'YYYY-MM-DD HH:mm:ss',
            displayFormats: {
              millisecond: 'HH:mm:ss',
              second: 'HH:mm:ss',
              minute: 'HH:mm',
              hour: 'MM/DD HH:mm'
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
