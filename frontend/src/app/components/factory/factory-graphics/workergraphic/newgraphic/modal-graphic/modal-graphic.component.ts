import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Ifavories } from 'src/app/Imodel/Ifavories';
import { IgraphicInformations } from 'src/app/Imodel/IgraphicInformations';
import { ModalService } from 'src/app/Services/modal.service';
import { NewgraphicService } from 'src/app/Services/newgraphic.service';
import * as _ from "lodash";
@Component({
  selector: 'app-modal-graphic',
  templateUrl: './modal-graphic.component.html',
  styleUrls: ['./modal-graphic.component.css'],
  providers: [ModalService]
})
export class ModalGraphicComponent implements OnInit {
  @ViewChild('modal') elementRef: ElementRef
  constructor(private modalService: ModalService, private newgraphicService: NewgraphicService) { }
  equipment: Ifavories;
  machines: Ifavories;
  workerStatus: Ifavories;
  graphicOptions: IgraphicInformations[];
  condition: boolean = false;
  conditionType: boolean = false;
  graphicTypes: string[] = [];
  newGraphicData: any[] = [];
  newGraphicLabel: string[] = [];

  selectedGraphicInformation: IgraphicInformations;
  ngOnInit(): void {
    this.newgraphicService.equipments.subscribe(
      value => {
        this.equipment = value;

      }
    )
    this.newgraphicService.machines.subscribe(
      value => {
        this.machines = value;

      }
    )
    this.newgraphicService.workerStatus.subscribe(
      value => {
        this.workerStatus = value;

      }
    )

  }

  ngAfterViewInit(): void {

    this.modalService.setup(this.elementRef);
  }
  open() {

    this.modalService.open();
  }

  close() {

    this.modalService.close();
    this.reset();
    var ele = document.getElementsByName("flexRadioDefault");
    for (var i = 0; i < ele.length; i++) {
      var element = ele[i] as HTMLInputElement;
      element.checked = false;
    }
  }


  getGraphicOptions(): Array<IgraphicInformations> {
    this.graphicOptions = this.newgraphicService.getgraphicOptions();
    return this.graphicOptions.filter(item => !item.isSelected);

  }
  selectedInformation(option: IgraphicInformations) {
    this.graphicTypes = option.type;
    this.selectedGraphicInformation = option;

  }
  selectedType(type: string) {
    this.selectedGraphicInformation.selectedType = type;
    this.conditionType = true;
  }
  addOption() {
    this.selectedGraphicInformation.isSelected = true;
    this.graphicTypes = [];
    this.conditionType = false;
    this.createGraphic();
    this.condition = true;
  }
  save() {
    let graphic: Ifavories = { data: this.newGraphicData, label: this.newGraphicLabel, type: 'custom', id: this.equipment.id };
    this.newgraphicService.save(graphic);
  }
  reset() {

    this.newGraphicData = [];
    this.newGraphicLabel = [];
    this.newgraphicService.resetOptions();
    this.selectedGraphicInformation = null;
    this.graphicTypes = [];
    this.condition = false;
    this.conditionType = false;
  }
  createGraphic() {
    if (this.newGraphicLabel.length == 0)
      this.firstCreateGraphic();
    else if (this.selectedGraphicInformation.dataName === 'Ekipman Sıcaklık') {
      let tmpLabel: string[] = [];
      let tmpData = [];
      let tmpOldData = [];
      let tmpNewData = [];

      for (let i = 0; i < this.equipment.label.length; i++) {

        for (let j = 0; j < this.newGraphicLabel.length; j++) {

          if (this.newGraphicLabel[j] == this.equipment.label[i] && tmpOldData.indexOf(j) == -1 && tmpNewData.indexOf(i) == -1) {

            tmpLabel.push(this.equipment.label[i]);
            tmpData.push(this.equipment.data[2].data[i]);
            tmpOldData.push(j);
            tmpNewData.push(i);
          }

        }
      }

      if (tmpLabel.length != 0) {
        let tmpDataset = [];

        for (let i = 0; i < this.newGraphicData.length; i++) {
          tmpDataset.push(this.newGraphicData[i]);
          let tmp = [];

          console.log(tmp);
          for (let j = 0; j < this.newGraphicData[i].data.length; j++) {
            if (tmpOldData.indexOf(j) != -1) {
              let tmp1 = this.newGraphicData[i].data[j];
              tmp.push(tmp1);

            }
          }
          tmpDataset[i].data = tmp;

        }

        tmpDataset.push({ fill: false, data: tmpData, label: this.selectedGraphicInformation.dataName, type: this.selectedGraphicInformation.selectedType });
        this.newGraphicData = tmpDataset;


        this.newGraphicLabel = tmpLabel;

      }
    }
    else if (this.selectedGraphicInformation.dataName === 'Ekipman Yükseklik') {
      let tmpLabel: string[] = [];
      let tmpData = [];
      let tmpOldData = [];
      let tmpNewData = [];
      for (let i = 0; i < this.equipment.label.length; i++) {

        for (let j = 0; j < this.newGraphicLabel.length; j++) {
          if (this.newGraphicLabel[j] == this.equipment.label[i] && tmpOldData.indexOf(j) == -1 && tmpNewData.indexOf(i) == -1) {
            tmpLabel.push(this.equipment.label[i]);
            tmpData.push(this.equipment.data[3].data[i]);
            tmpOldData.push(j);
            tmpNewData.push(i);

          }
        }
      }
      if (tmpLabel.length != 0) {


        let tmpDataset = [];
        for (let i = 0; i < this.newGraphicData.length; i++) {
          tmpDataset.push(this.newGraphicData[i]);
          let tmp = [];

          console.log(tmp);
          for (let j = 0; j < this.newGraphicData[i].data.length; j++) {
            if (tmpOldData.indexOf(j) != -1) {
              let tmp1 = this.newGraphicData[i].data[j];
              tmp.push(tmp1);

            }
          }
          tmpDataset[i].data = tmp;

        }

        tmpDataset.push({ fill: false, data: tmpData, label: this.selectedGraphicInformation.dataName, type: this.selectedGraphicInformation.selectedType });
        this.newGraphicData = tmpDataset;
        this.newGraphicLabel = tmpLabel;
      }

    }
    else if (this.selectedGraphicInformation.dataName === 'Ekipman Yakınlık') {
      let tmpLabel: string[] = [];
      let tmpData = [];
      let tmpOldData = [];
      let tmpNewData = [];
      for (let i = 0; i < this.equipment.label.length; i++) {

        for (let j = 0; j < this.newGraphicLabel.length; j++) {
          if (this.newGraphicLabel[j] == this.equipment.label[i] && tmpOldData.indexOf(j) == -1 && tmpNewData.indexOf(i) == -1) {
            tmpLabel.push(this.equipment.label[i]);
            tmpData.push(this.equipment.data[4].data[i]);
            tmpOldData.push(j);
            tmpNewData.push(i);
          }
        }
      }
      if (tmpLabel.length != 0) {


        let tmpDataset = [];
        for (let i = 0; i < this.newGraphicData.length; i++) {
          tmpDataset.push(this.newGraphicData[i]);
          let tmp = [];

          console.log(tmp);
          for (let j = 0; j < this.newGraphicData[i].data.length; j++) {
            if (tmpOldData.indexOf(j) != -1) {
              let tmp1 = this.newGraphicData[i].data[j];
              tmp.push(tmp1);

            }
          }
          tmpDataset[i].data = tmp;

        }
        tmpDataset.push({ fill: false, data: tmpData, label: this.selectedGraphicInformation.dataName, type: this.selectedGraphicInformation.selectedType });
        this.newGraphicData = tmpDataset;
        this.newGraphicLabel = tmpLabel;
      }

    }
    else if (this.selectedGraphicInformation.dataName === 'Gözlük Takılma Bilgisi') {
      let tmpLabel: string[] = [];
      let tmpDataActive = [];
      let tmpDataInactive = [];
      let tmpOldData = [];
      let tmpNewData = [];
      for (let i = 0; i < this.equipment.label.length; i++) {

        for (let j = 0; j < this.newGraphicLabel.length; j++) {
          if (this.newGraphicLabel[j] == this.equipment.label[i] && tmpOldData.indexOf(j) == -1 && tmpNewData.indexOf(i) == -1) {
            tmpLabel.push(this.equipment.label[i]);
            if (this.equipment.data[0].data[i] != null)
              tmpDataActive.push(this.equipment.data[0].data[i]);
            else
              tmpDataInactive.push(this.equipment.data[1].data[i])
            tmpOldData.push(j);
            tmpNewData.push(i);
          }
        }
      }
      if (tmpLabel.length != 0) {
        console.log(tmpDataActive);
        console.log(tmpDataInactive);

        let tmpDataset = [];
        tmpDataset.push({ data: tmpDataActive, label: 'Gözlük Takıldı', type: this.selectedGraphicInformation.selectedType, pointRadius: 10, backgroundColor: 'green' });
        tmpDataset.push({ data: tmpDataInactive, label: 'Gözlük Takılmadı', type: this.selectedGraphicInformation.selectedType, pointRadius: 10, backgroundColor: 'red' });
        for (let i = 0; i < this.newGraphicData.length; i++) {
          tmpDataset.push(this.newGraphicData[i]);
          let tmp = [];

          console.log(tmp);
          for (let j = 0; j < this.newGraphicData[i].data.length; j++) {
            if (tmpOldData.indexOf(j) != -1) {
              let tmp1 = this.newGraphicData[i].data[j];
              tmp.push(tmp1);

            }
          }
          tmpDataset[i + 2].data = tmp;

        }
        this.newGraphicLabel = tmpLabel;
        this.newGraphicData = tmpDataset;



      }


    }
    else if (this.selectedGraphicInformation.dataName === 'Makine Sıcaklık') {
      let tmpLabel: string[] = [];
      let tmpData = [];
      let tmpOldData = [];
      let tmpNewData = [];
      for (let i = 0; i < this.machines.label.length; i++) {

        for (let j = 0; j < this.newGraphicLabel.length; j++) {
          if (this.newGraphicLabel[j] == this.machines.label[i] && tmpOldData.indexOf(j) == -1 && tmpNewData.indexOf(i) == -1) {
            tmpLabel.push(this.machines.label[i]);
            tmpData.push(this.machines.data[0].data[i]);
            tmpOldData.push(j);
            tmpNewData.push(i);
          }
        }
      }
      console.log(tmpOldData, tmpNewData);
      if (tmpLabel.length != 0) {


        let tmpDataset = [];
        for (let i = 0; i < this.newGraphicData.length; i++) {
          tmpDataset.push(this.newGraphicData[i]);
          let tmp = [];

          console.log(tmp);
          for (let j = 0; j < this.newGraphicData[i].data.length; j++) {
            if (tmpOldData.indexOf(j) != -1) {
              let tmp1 = this.newGraphicData[i].data[j];
              tmp.push(tmp1);

            }
          }
          tmpDataset[i].data = tmp;

        }
        tmpDataset.push({ fill: false, data: tmpData, label: this.selectedGraphicInformation.dataName, type: this.selectedGraphicInformation.selectedType });
        this.newGraphicData = tmpDataset;
        this.newGraphicLabel = tmpLabel;
      }
    }
    else if (this.selectedGraphicInformation.dataName === 'Kan Şekeri') {
      let tmpLabel: string[] = [];
      let tmpData = [];
      let tmpOldData = [];
      let tmpNewData = [];
      for (let i = 0; i < this.workerStatus.label.length; i++) {

        for (let j = 0; j < this.newGraphicLabel.length; j++) {
          if (this.newGraphicLabel[j] == this.workerStatus.label[i] && tmpOldData.indexOf(j) == -1 && tmpNewData.indexOf(i) == -1) {
            tmpLabel.push(this.workerStatus.label[i]);
            tmpData.push(this.workerStatus.data[0].data[i]);
            tmpOldData.push(j);
            tmpNewData.push(i);
          }
        }
      }


      if (tmpLabel.length != 0) {
        let tmpDataset = [];

        for (let i = 0; i < this.newGraphicData.length; i++) {
          tmpDataset.push(this.newGraphicData[i]);
          let tmp = [];

          console.log(tmp);
          for (let j = 0; j < this.newGraphicData[i].data.length; j++) {
            if (tmpOldData.indexOf(j) != -1) {
              let tmp1 = this.newGraphicData[i].data[j];
              tmp.push(tmp1);

            }
          }
          tmpDataset[i].data = tmp;

        }


        tmpDataset.push({ fill: false, data: tmpData, label: this.selectedGraphicInformation.dataName, type: this.selectedGraphicInformation.selectedType });
        this.newGraphicLabel = tmpLabel;
        this.newGraphicData = tmpDataset;

      }

    }
    else if (this.selectedGraphicInformation.dataName === 'Tansiyon') {
      let tmpLabel: string[] = [];
      let tmpData = [];
      let tmpOldData = [];
      let tmpNewData = [];
      for (let i = 0; i < this.workerStatus.label.length; i++) {

        for (let j = 0; j < this.newGraphicLabel.length; j++) {
          if (this.newGraphicLabel[j] == this.workerStatus.label[i] && tmpOldData.indexOf(j) == -1 && tmpNewData.indexOf(i) == -1) {
            tmpLabel.push(this.workerStatus.label[i]);
            tmpData.push(this.workerStatus.data[1].data[i]);
            tmpOldData.push(j);
            tmpNewData.push(i);
          }
        }
      }
      if (tmpLabel.length != 0) {


        let tmpDataset = [];
        for (let i = 0; i < this.newGraphicData.length; i++) {
          tmpDataset.push(this.newGraphicData[i]);
          let tmp = [];

          console.log(tmp);
          for (let j = 0; j < this.newGraphicData[i].data.length; j++) {
            if (tmpOldData.indexOf(j) != -1) {
              let tmp1 = this.newGraphicData[i].data[j];
              tmp.push(tmp1);

            }
          }
          tmpDataset[i].data = tmp;

        }
        tmpDataset.push({ fill: false, data: tmpData, label: this.selectedGraphicInformation.dataName, type: this.selectedGraphicInformation.selectedType });
        this.newGraphicLabel = tmpLabel;
        this.newGraphicData = tmpDataset;
      }
    }
  }
  firstCreateGraphic() {
    if (this.selectedGraphicInformation.dataName === 'Ekipman Sıcaklık') {
      let tmpEquipment: Ifavories = _.cloneDeep(this.equipment);
      tmpEquipment.data[2].type = this.selectedGraphicInformation.selectedType;

      tmpEquipment.data[2].label = this.selectedGraphicInformation.dataName;
      this.newGraphicData.push(tmpEquipment.data[2]);

      this.newGraphicLabel = tmpEquipment.label;

    }
    else if (this.selectedGraphicInformation.dataName === 'Ekipman Yükseklik') {
      let tmpEquipment: Ifavories = _.cloneDeep(this.equipment);
      tmpEquipment.data[3].type = this.selectedGraphicInformation.selectedType;
      tmpEquipment.data[3].label = this.selectedGraphicInformation.dataName;
      this.newGraphicData.push(tmpEquipment.data[3]);

      this.newGraphicLabel = tmpEquipment.label;

    }
    else if (this.selectedGraphicInformation.dataName === 'Ekipman Yakınlık') {
      let tmpEquipment: Ifavories = _.cloneDeep(this.equipment);
      tmpEquipment.data[4].type = this.selectedGraphicInformation.selectedType;
      tmpEquipment.data[4].label = this.selectedGraphicInformation.dataName;
      this.newGraphicData.push(tmpEquipment.data[4]);

      this.newGraphicLabel = tmpEquipment.label;

    }
    else if (this.selectedGraphicInformation.dataName === 'Gözlük Takılma Bilgisi') {
      let tmpEquipment: Ifavories = _.cloneDeep(this.equipment);

      this.newGraphicData.push(tmpEquipment.data[0]);
      this.newGraphicData.push(tmpEquipment.data[1]);

      this.newGraphicLabel = tmpEquipment.label;

    }
    else if (this.selectedGraphicInformation.dataName === 'Kan Şekeri') {
      let tmpStatus: Ifavories = _.cloneDeep(this.workerStatus);
      tmpStatus.data[0].type = this.selectedGraphicInformation.selectedType;
      tmpStatus.data[0].label = this.selectedGraphicInformation.dataName;
      this.newGraphicData.push(tmpStatus.data[0]);


      this.newGraphicLabel = tmpStatus.label;

    }
    else if (this.selectedGraphicInformation.dataName === 'Tansiyon') {
      let tmpStatus: Ifavories = _.cloneDeep(this.workerStatus);
      tmpStatus.data[1].type = this.selectedGraphicInformation.selectedType;
      tmpStatus.data[1].label = this.selectedGraphicInformation.dataName;
      this.newGraphicData.push(tmpStatus.data[1]);


      this.newGraphicLabel = tmpStatus.label;

    }
    else if (this.selectedGraphicInformation.dataName === 'Makine Sıcaklık') {
      let tmpMachine: Ifavories = _.cloneDeep(this.machines);
      tmpMachine.data[0].type = this.selectedGraphicInformation.selectedType;
      tmpMachine.data[0].label = this.selectedGraphicInformation.dataName;
      this.newGraphicData.push(tmpMachine.data[0]);


      this.newGraphicLabel = tmpMachine.label;

    }
  }



}
