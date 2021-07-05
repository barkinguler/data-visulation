import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ifavories } from '../Imodel/Ifavories';
import { IgraphicInformations } from '../Imodel/IgraphicInformations';
import { ILogs } from '../Imodel/Ilogs';

@Injectable({
  providedIn: 'root'
})
export class NewgraphicService {

  equipments = new Subject<Ifavories>();
  machines = new Subject<Ifavories>();
  workerStatus = new Subject<Ifavories>();
  customGraphic = new Subject<Ifavories[]>();
  customGraphicInformation: Ifavories[] = [];
  private graphicOptions: IgraphicInformations[] = [];

  constructor() {
    this.graphicOptions.push({ category: 'status', dataName: 'Kan Şekeri', isSelected: false, type: ['line', 'bar', 'scatter'] });
    this.graphicOptions.push({ category: 'status', dataName: 'Tansiyon', isSelected: false, type: ['line', 'bar', 'scatter'] });
    this.graphicOptions.push({ category: 'machine', dataName: 'Makine Sıcaklık', isSelected: false, type: ['line', 'bar', 'scatter'] });
    this.graphicOptions.push({ category: 'equipment', dataName: 'Ekipman Yakınlık', isSelected: false, type: ['line', 'bar', 'scatter'] });
    this.graphicOptions.push({ category: 'equipment', dataName: 'Ekipman Yükseklik', isSelected: false, type: ['line', 'bar', 'scatter'] });
    this.graphicOptions.push({ category: 'equipment', dataName: 'Ekipman Sıcaklık', isSelected: false, type: ['line', 'bar', 'scatter'] });
    this.graphicOptions.push({ category: 'equipment', dataName: 'Gözlük Takılma Bilgisi', isSelected: false, type: ['scatter'] });
  }

  getgraphicOptions(): Array<IgraphicInformations> {
    return this.graphicOptions;
  }

  resetOptions() {
    for (let option of this.graphicOptions) {
      option.isSelected = false;

    }

  }

  save(value: Ifavories) {
    this.customGraphicInformation.push(value);
    this.customGraphic.next(this.customGraphicInformation);
  }

  clear() {
    this.customGraphicInformation = []
    this.customGraphic.next(this.customGraphicInformation);
  }

}
