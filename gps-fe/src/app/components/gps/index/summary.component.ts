import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {MessageService} from "primeng/api";
import {CookieService} from "../../../services/cookie.service";
import {GpsIndex} from "../../../interfaces/gps";
import {Pagination} from "../../../interfaces/pagination";
import {Table} from "primeng/table";
import * as moment from 'moment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  gpses: GpsIndex[] = [];

  pagination: any = {};

  page: number = 1
  perPage: number = 5

  loading: boolean = false

  first: any = 0;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private messageService: MessageService,
  ) { }

  async ngOnInit() {
    this.loading = true

    await this.getGpsIndex()
  }

  getGpsIndex = async () => {
    this.loading = true

    await this.apiService.getGpsIndex(this.page, this.perPage)
      .then((response: any) => {
        this.gpses = response.data.data as GpsIndex[];
        this.pagination = response.meta as Pagination;

        // @ts-ignore
        this.gpses.forEach(
          gps => gps.latest_timestamp = moment(gps.latest_timestamp).format("DD MMMM yyyy HH:mm"))
      })
      .catch((error) => {
        console.log(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.message || "There is something is wrong."
        });
      })
      .finally(
        () => this.loading = false
      )
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  onSearch(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  viewDetail(id: string) {
    this.router.navigate(['/gps', id]);
  }

  async onPageChange(event: any) {
    this.first = event.first;
    this.page = event.page + 1

    await this.getGpsIndex()
  }

}
