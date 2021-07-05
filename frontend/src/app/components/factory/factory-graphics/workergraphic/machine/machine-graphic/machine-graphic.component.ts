import { formatDate } from '@angular/common';
import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ifavories } from 'src/app/Imodel/Ifavories';
import { ILogs } from 'src/app/Imodel/Ilogs';
import { MachineService } from 'src/app/Services/machine.service';
import { ModalService } from 'src/app/Services/modal.service';
import { NewgraphicService } from 'src/app/Services/newgraphic.service';
import { MachineTabComponent } from '../machine-tab/machine-tab.component';
import { MachineComponent } from '../machine.component';
import * as _ from "lodash";
import { MachinePredictService } from 'src/app/Services/machine-predict.service';
@Component({
  selector: 'app-machine-graphic',
  templateUrl: './machine-graphic.component.html',
  styleUrls: ['./machine-graphic.component.css']

})
export class MachineGraphicComponent implements OnInit, OnDestroy {
  subscription1: Subscription;
  subscription2: Subscription;
  id: number;
  machineId: number;
  machinePredict=null;
  constructor(private MachineService: MachineService, private route: ActivatedRoute, private ModalService: ModalService,private newgraphicService :NewgraphicService, private machinePredictService:MachinePredictService) {

  }

  machines: ILogs[] = [];
  machinesLabel: string[] = [];
  machineData: any[];
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          //route bi işe yaramıyo ama içine koyunca kodu senkronize oluyo çözemedim
          this.machineData = [];
          this.machinesLabel = [];
          this.machineId = null;
          this.subscription1 = this.MachineService.getStoredLogs().subscribe(
            machines => {
              this.machinePredict=null;
              this.machines = machines;
              this.machines.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
              this.machinesChart();
              this.newgraphicService.machines.next({data: _.cloneDeep(this.machineData), label: _.cloneDeep(this.machinesLabel), type: 'machine', id: this.id });
            }
          );
        });

    this.subscription2 = MachineTabComponent.selectedMachineId.subscribe(
      id => {
        this.machinesLabel = [];
        this.machineData = [];
        this.getMachinesById(id);
        this.machineId = id;
      }
    );
  }
  getMachinesById(id: number) {
    let tmpArray: ILogs[] = []
    tmpArray = this.machines.filter(machine => machine.machineId == id);
    this.machineSelectedChart(tmpArray);
    this.machinePredictService.getPredict(id).subscribe(
      value=>{
        if(value!=null){
          this.machinePredict=value;
          clearInterval(interval);
        }
        else
        this.machinePredict=null;
          
      }
    );
    var interval= setInterval(()=>{
      this.machinePredictService.getPredict(id).subscribe(
        value=>{
          if(value!=null){
            this.machinePredict=value;
            clearInterval(interval);
          }
          else
          this.machinePredict=null;
            
        }
      );
      
     }, 5000);
    
  }

  machineSelectedChart(machines: Array<ILogs>) {
    let heatData: number[] = [];
    for (let machine of machines) {
      const formattedDate = formatDate(machine.date, 'dd/MM/yyyy', 'en-US');
      this.machinesLabel.push(formattedDate);
      heatData.push(machine.heat);

    }
    this.machineData = [
      { fill: false, data: heatData, label: 'Sıcaklık', type: 'line'  
    } 

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
      { fill: false, data: heatData, label: 'Sıcaklık', type: 'line' }

    ];


  }

  addGraphic() {
    let graphic: Ifavories
    if (this.machineId) {
      graphic = { data: this.machineData, label: this.machinesLabel, type: 'machine', id: this.id, machineId: this.machineId };
    }
    else {
      graphic = { data: this.machineData, label: this.machinesLabel, type: 'machine', id: this.id };
    }

    this.ModalService.saveGraphic(graphic);
  }
  
  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
