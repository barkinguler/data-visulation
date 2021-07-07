import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

import { ILogs } from 'src/app/Imodel/Ilogs';
import { EquipmentService } from 'src/app/Services/equipment.service';

@Component({
  selector: 'app-equipment-tab',
  templateUrl: './equipment-tab.component.html',
  styleUrls: ['./equipment-tab.component.css'],
})
export class EquipmentTabComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private EquipmentService: EquipmentService
  ) {}
  subscription: Subscription;

  static selectedEquipmentId = new Subject<number>();

  equipments: ILogs[] = [];
  ngOnInit(): void {
    this.subscription = this.EquipmentService.getStoredLogs().subscribe(
      (equipments) => {
        this.equipments = equipments;
      }
    );
  }
  getEquipments() {
    const tmp: number[] = [];
    for (let equipment of this.equipments) {
      tmp.push(equipment.id);
    }
    const tempArray = [...tmp].sort(); //değişebilir aynı tab numaralarını eleme

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

  showEquipment(equipment_id: number) {
    EquipmentTabComponent.selectedEquipmentId.next(equipment_id);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
