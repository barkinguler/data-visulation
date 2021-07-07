import { Component, OnInit } from '@angular/core';
import { Iworkplace } from 'src/app/Imodel/Iworkplace';
import { EquipmentService } from 'src/app/Services/equipment.service';
import { FactoriesService } from 'src/app/Services/factories.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-create-equipment',
  templateUrl: './create-equipment.component.html',
  styleUrls: ['./create-equipment.component.css'],
})
export class CreateEquipmentComponent implements OnInit {
  workPlaces: Iworkplace[] = [];
  newEquipment = {
    job: '',
    isActive: false,
    name: '',
    newMaintenanceDate: '',
    oldMaintenanceDate: '',
    authorityLevel: 0,
    workplaceId: 1,
    status: true,
  };

  constructor(
    private equipmentService: EquipmentService,
    public messageServis: MessageService,
    public factoriesService: FactoriesService
  ) {}

  ngOnInit(): void {
    this.factoriesService.getworkPlaces().then((res) => {
      res.map((workplace) => {
        this.workPlaces.push(workplace);
      });
    });
  }

  createEquipment() {
    this.equipmentService.createEquipment(this.newEquipment).then((res) => {
      this.newEquipment.job = '';
      this.newEquipment.name = '';
      this.newEquipment.newMaintenanceDate = '';
      this.newEquipment.oldMaintenanceDate = '';
      this.newEquipment.authorityLevel = 0;
    });
  }
}
