import { OnDestroy, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, OutletContext, Params, Router } from '@angular/router';
import * as EventEmitter from 'events';
import { Subscription } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { ILogs } from 'src/app/Imodel/Ilogs';
import { Imachine } from 'src/app/Imodel/Imachine';

import { MachineService } from 'src/app/Services/machine.service';
import { WorkersService } from 'src/app/Services/workers.service';
import { MachineComponent } from '../machine.component';

@Component({
  selector: 'app-machine-tab',
  templateUrl: './machine-tab.component.html',
  styleUrls: ['./machine-tab.component.css']
})
export class MachineTabComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private MachineService: MachineService) {

  }
  subscription: Subscription;
  static selectedMachineId = new Subject<number>();

  machines: ILogs[] = [];
  ngOnInit(): void {
    this.subscription = this.MachineService.getStoredLogs().subscribe(

      machines => {
        this.machines = machines;
      }

    )

  }
  getMachines() {
    const tmp: number[] = [];
    for (let machine of this.machines) {
      tmp.push(machine.machineId);
    }
    const tempArray = [...tmp].sort();       //değişebilir aynı tab numaralarını eleme

    for (let i = 0; i < tempArray.length; i++) {
      for (let k = i + 1; k < tempArray.length; k++) {
        if (tempArray[i] === tempArray[k]) {
          k--;
          tempArray.splice(k, 1);
        }
      }

    }

    return tempArray;
  }

  showMachine(machine_id: number) {
    MachineTabComponent.selectedMachineId.next(machine_id);

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
