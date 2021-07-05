import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ILogs } from 'src/app/Imodel/Ilogs';
import { EquipmentService } from 'src/app/Services/equipment.service';
import { EquipmentTabComponent } from '../equipment-tab/equipment-tab.component';

@Component({
  selector: 'app-equipment-graphic',
  templateUrl: './equipment-graphic.component.html',
  styleUrls: ['./equipment-graphic.component.css']
})
export class EquipmentGraphicComponent implements OnInit, OnDestroy {

  constructor(private equipmentService: EquipmentService, private route: ActivatedRoute) { }
  subscription1: Subscription;
  subscription2: Subscription;
  static IsactiveData: ILogs[] = [];
  equipments: ILogs[] = [];
  equipmentLabel: string[] = [];
  equipmentData: any;
  equipmentid: number;

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {

          //route bi işe yaramıyo ama içine koyunca kodu senkronize oluyo çözemedim
          this.equipmentData = [];
          this.equipmentLabel = [];
          EquipmentGraphicComponent.IsactiveData = [];
          this.subscription1 = this.equipmentService.getStoredLogs().subscribe(
            equipments => {
              this.equipmentLabel = [];
              this.equipmentData = [];

              this.equipments = equipments;
              this.equipments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
              this.equipmentsChart();
            }
          );
        });
    this.subscription2 = EquipmentTabComponent.selectedEquipmentId.subscribe(
      id => {
        this.equipmentLabel = [];
        this.equipmentData = [];
        this.getMachinesById(id);
      }
    );
  }
  getMachinesById(id: number) {
    let tmpArray: ILogs[] = []
    tmpArray = this.equipments.filter(equipment => equipment.id == id);
    this.equipmentSelectedChart(tmpArray);
  }
  equipmentSelectedChart(equipments: Array<ILogs>) {

    const activeData: number[] = [];
    const inactiveData: number[] = [];
    const heatData: number[] = [];
    const altitudeData: number[] = [];
    const proximityData: number[] = [];
    for (const equipment of equipments) {
      const formattedDate = formatDate(equipment.date, 'dd/MM/yyyy', 'en-US');
      this.equipmentLabel.push(formattedDate);
      heatData.push(equipment.heat);
      altitudeData.push(equipment.altitude);
      proximityData.push(equipment.proximity);                                    // equipmentsChart() ile aynı kodun tekrarlaması çözülebilir 
      if (equipment.isActive) {
        EquipmentGraphicComponent.IsactiveData.push(equipment);
        activeData.push(0);
        inactiveData.push(null);
      }

      else {
        inactiveData.push(0);
        activeData.push(null);
        EquipmentGraphicComponent.IsactiveData.push(equipment);
      }
    }
    this.equipmentData = [
      { data: activeData, label: 'Gözlük Takıldı', type: 'scatter', pointRadius: 10, backgroundColor: 'green' },
      { data: inactiveData, label: 'Gözlük Takılmadı', type: 'scatter', pointRadius: 10, backgroundColor: 'red' },
      { data: heatData, label: 'Sıcaklık', type: 'bar' },
      { data: altitudeData, label: 'Rakım', type: 'bar' },
      { data: proximityData, label: 'Yakınlık', type: 'bar' }

    ];
  }

  equipmentsChart() {
    const activeData: number[] = [];
    const inactiveData: number[] = [];
    const heatData: number[] = [];
    const altitudeData: number[] = [];
    const proximityData: number[] = [];
    for (const equipment of this.equipments) {
      const formattedDate = formatDate(equipment.date, 'dd/MM/yyyy', 'en-US');
      this.equipmentLabel.push(formattedDate);
      heatData.push(equipment.heat);
      altitudeData.push(equipment.altitude);
      proximityData.push(equipment.proximity);
      if (equipment.isActive) {
        EquipmentGraphicComponent.IsactiveData.push(equipment);
        activeData.push(0);
        inactiveData.push(null);
      }

      else {
        inactiveData.push(0);
        activeData.push(null);
        EquipmentGraphicComponent.IsactiveData.push(equipment);
      }
    }
    this.equipmentData = [
      { data: activeData, label: 'Gözlük Takıldı', type: 'scatter', pointRadius: 10, backgroundColor: 'green' },
      { data: inactiveData, label: 'Gözlük Takılmadı', type: 'scatter', pointRadius: 10, backgroundColor: 'red' },
      { data: heatData, label: 'Sıcaklık', type: 'bar' },
      { data: altitudeData, label: 'Rakım', type: 'bar' },
      { data: proximityData, label: 'Yakınlık', type: 'bar' }

    ];
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  public chartOption = {
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          const result = [];


          if (tooltipItem.datasetIndex < 2) {

            const machine_id = EquipmentGraphicComponent.IsactiveData[tooltipItem.index].machineId;
            const is_running: string = EquipmentGraphicComponent.IsactiveData[tooltipItem.index].isRunnig ? 'çalışıyor' : 'çalışmıyor';
            result.push('Makine id: ' + machine_id);
            result.push('Durum: ' + is_running);
          }
          else {
            result.push('Değer: ' + tooltipItem.value);
          }
          return result;

        }
      }
    }
  };

}
