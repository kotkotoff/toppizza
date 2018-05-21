
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Pizza } from '../models/pizza.model';
import { Api } from '../services/api.service';
import { TopList } from '../models/toplist';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'up-main',
  templateUrl: './up-main.component.html',
  styleUrls: ['./up-main.component.css']
})
export class UpMainComponent implements OnInit {

  displayedColumns = ['position', 'toppings', 'count'];
  topInput: FormControl;
  dataSource: MatTableDataSource<Pizza>;

  constructor(private api: Api) { }

  ngOnInit() {
    this.topInput = new FormControl();
    this.topInput.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(top => this.createList(top));

    this.createList(10);
  }

  createList(top: number) {
    const topList = new TopList();
    this.api.get().subscribe(o => {
      for (const order of o) {
        topList.add(order);
      }
      const orders = topList.getTop(top);
      this.dataSource = new MatTableDataSource<Pizza>(orders);
    });
  }
}
