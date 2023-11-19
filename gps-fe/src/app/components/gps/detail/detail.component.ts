import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import * as moment from "moment";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private apiService: ApiService
  ) {
  }

  id = this.route.snapshot.paramMap.get('id')

  gps: any = {};

  pieData: any = {}
  pieOptions: any = {}

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const labels: any = []
    const durations: any = []

    this.gps.locations.forEach((location: any) => {
      labels.push(`Location ${location.name} (${location.percentage}%)`)
      durations.push(location.duration)
    })

    this.pieData = {
      labels: labels,
      datasets: [
        {data: durations}
      ],
    };

    this.pieOptions = {
      plugins: {
        tooltip: {
          enabled: true,
        },
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        },
      }
    }
  }

  ngOnInit(): void {
    this.apiService.getGpsDetail(this.id)
      .then((response: any) => {
        this.gps = response.data
        this.initChart()
      })
      .catch((error) => {
        console.log(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.message || "There is something is wrong."
        });
      })
  }

  protected readonly moment = moment;
}
