import { Component, OnInit } from '@angular/core';
import { NewsService } from '../_services/news.service';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { ToasterClass, ToasterPosition } from '../_class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource = [];
  toaster: ToasterClass;
  constructor(private newsService: NewsService, private _toaster: ToastrService) {
    this.toaster = new ToasterClass(_toaster);
  }

  ngOnInit() {
    this.rescueData();
  }

  rescueData() {
    this.newsService.getNewsInformation().subscribe(
      response => {
        if (response['body']['data'].length === 0) {
          this.toaster.error('Search', 'No se han encontrados registros asociados a la busqueda', ToasterPosition.topLeft);
        }
        this.dataSource = response['body']['data'];
        console.log(this.dataSource);
      },
      error => {
        if (error.status === 404) {
          this.toaster.error('Search', 'No se han encontrados registros asociados a la busqueda', ToasterPosition.topLeft);
        }
      });
  }

  deleteNews(idNew) {
    this.newsService.deleteNew(idNew).subscribe(
      response => {
        this.toaster.success('Delete', 'Deleted successfully', ToasterPosition.topLeft);
        this.rescueData();
      },
      error => {
        if (error.status === 404) {
          this.toaster.error('Delete', 'Error when deleting record', ToasterPosition.topLeft);
        }
      });
  }
}
