import { Component, OnInit } from '@angular/core';
import { Iworkplace } from 'src/app/Imodel/Iworkplace';
import { FactoriesService } from 'src/app/Services/factories.service';
import { MachineService } from 'src/app/Services/machine.service';

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css'],
})
export class CreateMachineComponent implements OnInit {
  workPlaces: Iworkplace[] = [];
  newMachine = {
    job: '',
    isRunning: false,
    name: '',
    newMaintenanceDate: '',
    oldMaintenanceDate: '',
    authorityLevel: 0,
    workplaceId: 1,
    status: true,
  };

  constructor(
    public machineService: MachineService,
    public factoriesService: FactoriesService
  ) {}

  ngOnInit(): void {
    this.factoriesService.getworkPlaces().then((res) => {
      res.map((workplace) => {
        this.workPlaces.push(workplace);
      });
    });
  }

  createMachine() {
    this.machineService.createMachine(this.newMachine).then((res) => {
      this.newMachine.job = ' ';
      this.newMachine.isRunning = false;
      this.newMachine.name = '';
      this.newMachine.newMaintenanceDate = '';
      this.newMachine.oldMaintenanceDate = '';
      this.newMachine.authorityLevel = 0;
    });
  }
}
