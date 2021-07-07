import {formatDate} from '@angular/common';
import {Input, OnDestroy} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {ILogs} from 'src/app/Imodel/Ilogs';
import {MachinePredictService} from 'src/app/Services/machine-predict.service';
import {MachineService} from 'src/app/Services/machine.service';
import {MachineTabComponent} from '../machine-tab/machine-tab.component';
import {MachineComponent} from '../machine.component';

@Component({
  selector: 'app-machine-graphic',
  templateUrl: './machine-graphic.component.html',
  styleUrls: ['./machine-graphic.component.css'],
})
export class MachineGraphicComponent implements OnInit, OnDestroy {
  subscription1: Subscription;
  subscription2: Subscription;

  constructor(
    private MachineService: MachineService,
    private route: ActivatedRoute,
    private machinePredictService: MachinePredictService
  ) {
  }

  machines: ILogs[] = [];
  machinesLabel: string[] = [];
  machineData: any;
  machinePredict = null;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      //route bi işe yaramıyo ama içine koyunca kodu senkronize oluyo çözemedim
      this.machineData = [];
      this.machinesLabel = [];

      this.subscription1 = this.MachineService.getStoredLogs().subscribe(
        (machines) => {
          this.machines = machines;
          this.machines.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          this.machinesChart();
        }
      );
    });

    this.subscription2 = MachineTabComponent.selectedMachineId.subscribe(
      (id) => {
        this.machinesLabel = [];
        this.machineData = [];
        this.getMachinesById(id);
        this.machinePredictService.getPredict(id).subscribe((value) => {
          if (value != null) {
            this.machinePredict = value;
            clearInterval(interval);
          } else this.machinePredict = null;
        });
        var interval = setInterval(() => {
          this.machinePredictService.getPredict(id).subscribe((value) => {
            if (value != null) {
              this.machinePredict = value;
              clearInterval(interval);
            } else this.machinePredict = null;
          });
        }, 5000);
      }
    );
  }

  getMachinesById(id: number) {
    let tmpArray: ILogs[] = [];
    tmpArray = this.machines.filter((machine) => machine.machineId == id);
    this.machineSelectedChart(tmpArray);
  }

  machineSelectedChart(machines: Array<ILogs>) {
    let heatData: number[] = [];
    for (let machine of machines) {
      const formattedDate = formatDate(machine.date, 'dd/MM/yyyy', 'en-US');
      this.machinesLabel.push(formattedDate);
      heatData.push(machine.heat);
    }
    this.machineData = [
      {fill: false, data: heatData, label: 'Sıcaklık', type: 'line'},
    ];
  }

  machinesChart() {
    this.machineData = [];
    this.machinesLabel = [];
    let heatData: number[] = [];

    for (let machine of this.machines) {
      const formattedDate = formatDate(machine.date, 'dd/MM/yyyy', 'en-US');
      this.machinesLabel.push(formattedDate);
      heatData.push(machine.heat);
    }

    this.machineData = [
      {fill: false, data: heatData, label: 'Sıcaklık', type: 'line'},
    ];
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
