import {Component, OnInit} from '@angular/core';
import {EquipmentService} from 'src/app/Services/equipment.service';

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.css'],
})
export class UpdateEquipmentComponent implements OnInit {
  equipments;
  employerWorkplaceId: number = 1;

  constructor(private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    this.equipmentService
      .findEquipmentByWorkplaceId(this.employerWorkplaceId)
      .then((res) => {
        this.equipments = res;
      });
  }

  updateEquipmentById(equipment) {
    this.equipmentService
      .updateEquipmentById(equipment.id, equipment)
      .then((res) => {
        this.equipments = null;
        this.ngOnInit();
      });
  }

  deleteEquipmentById(equipmentId) {
    this.equipmentService.deleteEquipmnetById(equipmentId).then((res) => {
      this.equipments = null;
      this.ngOnInit();
    });
  }
}
