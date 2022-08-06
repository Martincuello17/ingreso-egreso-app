import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartEvent } from 'chart.js';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css'],
})
export class EstadisticaComponent implements OnInit {
  ingresos: number = 0;
  egresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe(({ items }) => {
      this.contarIngresoEgreso(items);
    });
  }

  contarIngresoEgreso(items: any) {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    items.forEach((item: any) => {
      if (item.tipo === 'ingreso') {
        this.ingresos++;
        this.totalIngresos += item.monto;
      } else {
        this.egresos++;
        this.totalEgresos += item.monto;
      }
    });

    this.doughnutChartData.datasets[0].data = [
      this.totalIngresos,
      this.totalEgresos,
    ];
  }
}
