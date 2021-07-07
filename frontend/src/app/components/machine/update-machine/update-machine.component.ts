import { Component, OnInit } from '@angular/core';
import { MachineService } from 'src/app/Services/machine.service';

@Component({
  selector: 'app-update-machine',
  templateUrl: './update-machine.component.html',
  styleUrls: ['./update-machine.component.css'],
})
export class UpdateMachineComponent implements OnInit {
  machines;
  employerWorkplaceId: number = 1;

  constructor(private machineService: MachineService) {}

  ngOnInit(): void {
    this.machineService
      .findeMachineByWorkplaceId(this.employerWorkplaceId)
      .then((res) => {
        this.machines = res;
      });
  }

  updateMachineById(machine) {
    this.machineService.updateMachineById(machine.id, machine).then((res) => {
      this.machines = null;
      this.ngOnInit();
    });
  }

  deleteMachineById(machineId) {
    this.machineService.deleteMachineById(machineId).then((res) => {
      this.machines = null;
      this.ngOnInit();
    });
  }
}
