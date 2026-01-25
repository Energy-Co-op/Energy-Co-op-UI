import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {AsyncPipe, DecimalPipe} from '@angular/common';
import {UserService} from '../../service/user.service';
import {EnergyMixService} from '../../service/energy-mix.service';
import {ChartConfiguration} from 'chart.js';
import pluginDataLabels from 'chartjs-plugin-datalabels';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    BaseChartDirective
  ],
  providers: [DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  auth = inject(AuthService);
  userService = inject(UserService);
  energyMixService = inject(EnergyMixService);
  decimalPipe = inject(DecimalPipe);

  title = 'Energy Co-op User Dashboard';

  private pieChartLegendEnabled = false;
  protected pieChartPlugins = [pluginDataLabels];

  protected pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {data: [1, 2, 3, 4, 5], label: 'Loading Energy Mix..'}
    ]
  };

  protected pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: this.pieChartLegendEnabled,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const percentage = context.parsed;
            const percentageFormatted = this.decimalPipe.transform(percentage, '1.2-2');

            return ` ${percentageFormatted}%`;
          }
        }
      },
      datalabels: {
        formatter: (value, context) => {
          // Show the percentage value in the pie chart
          if (context.chart.data.labels) {
            if (context.chart.data.labels[context.dataIndex]) {
              return context.chart.data.labels[context.dataIndex] + ': ' + value + '%';
            }
          }
          return '';
        },
        color: '#FFF',
        font: {
          weight: 'bold'
        }
      }
    },
  };

  ngOnInit(): void {
    this.energyMixService.getCurrentGenerationMix().subscribe((response => {
      const pieChartLabels: string[] = [];
      const pieChartDataValues: number[] = [];

      if (response.data) {
        for (const generationMix of response.data.generationmix) {
          const capitalizedFuel = generationMix.fuel.charAt(0).toUpperCase() + generationMix.fuel.slice(1);

          pieChartLabels.push(capitalizedFuel);
          pieChartDataValues.push(generationMix.perc);
        }

        this.pieChartData = {
          labels: pieChartLabels,
          datasets: [
            {data: pieChartDataValues, label: '% of energy mix'}
          ]
        };
      }
    }))
  }
}
