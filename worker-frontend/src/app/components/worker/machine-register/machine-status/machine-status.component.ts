import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Iequipment} from 'src/app/Imodel/Iequipment';
import {EquipmentService} from 'src/app/Services/equipment.service';
import { MachinePredictService } from 'src/app/Services/machine-predict.service';
import {MachineService} from 'src/app/Services/machine.service';
import { StrokeService } from 'src/app/Services/stroke.service';

@Component({
  selector: 'app-machine-status',
  templateUrl: './machine-status.component.html',
  styleUrls: ['./machine-status.component.css'],
})
export class MachineStatusComponent implements OnInit, OnDestroy {
  isAllEquipmentActive: boolean;
  equipments: Iequipment[] = [];
  machineId: number;
  workerId: number;
  machinePredict;
  
  constructor(
    private route: ActivatedRoute,
    private EquipmentService: EquipmentService,
    private MachineService: MachineService,
    private machinePredictService:MachinePredictService
  ) {
    this.isAllEquipmentActive = false;
  }

  ngOnInit(): void {
    this.machinePredict=null;
    this.route.parent.parent.params.subscribe((params: Params) => {
      this.workerId = +params['id'];
      
    });

    this.route.params.subscribe((params: Params) => {
      this.machineId = +params['machineid'];

      this.machinePredictService.getPredict(this.machineId).subscribe(
        value=>{
            this.machinePredict=value;
            console.log(this.machinePredict);
        }
      );

      this.EquipmentService.getAllEquipmentByMachineId(
        this.machineId
      ).subscribe((value) => {
        this.equipments = value;
        this.equipments.sort((a, b) => a.id > b.id && 1 || -1);
        if (this.equipments.filter((item) => item.isActive === false || item.workerId !== this.workerId).length > 0) {
          this.isAllEquipmentActive = false;
        } else if (this.equipments.length > 0) {
          this.isAllEquipmentActive = true;
        } else {
          this.isAllEquipmentActive = false;
        }
      });
    });
  }

  getEquipments() {
    return this.equipments;
  }

  registerMachine() {
    this.MachineService.registerMachine(
      this.workerId,
      this.machineId
    ).subscribe(
      (responseData) => {
        this.ngOnInit();
        console.log(responseData);
        window.location.reload();
      },
      (error) => {
        this.ngOnInit();
        console.log(error);
        window.location.reload();

      }
    );
  }

  registerEquipment(equipmentId) {
    this.EquipmentService.registerEquipment(
      this.workerId,
      equipmentId
    ).subscribe(
      (responseData) => {
        this.ngOnInit();
        console.log(responseData);
      },
      (error) => {
        this.ngOnInit();
        console.log(error);
      }
    );

  }

  ngOnDestroy() {
  }
}
