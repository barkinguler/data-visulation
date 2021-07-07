import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ImachineItems } from 'src/app/Imodel/ImachineItems';
import { MachineService } from 'src/app/Services/machine.service';

@Component({
  selector: 'app-machine-items',
  templateUrl: './machine-items.component.html',
  styleUrls: ['./machine-items.component.css'],
})
export class MachineItemsComponent implements OnInit {
  @Injectable({
    providedIn: 'root',
  })
  id: number;
  machineItems: ImachineItems[] = [];
  filterInformation: any;
  constructor(
    private route: ActivatedRoute,
    private MachineService: MachineService
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.MachineService.getMachineItems(this.id).subscribe((value) => {
        this.machineItems = value;
      });
    });
  }

  getItems() {
    return this.machineItems;
  }

  deleteWorkerId(workerId) {
    this.MachineService.unregisterMachine(workerId).subscribe(
      (value) => {
        this.ngOnInit();
      },
      (error) => {
        this.ngOnInit();
        console.log(error);
      }
    );
  }
}
