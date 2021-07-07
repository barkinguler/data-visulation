import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ifavories } from 'src/app/Imodel/Ifavories';
import { Iworkerstatus } from 'src/app/Imodel/Iworkerstatus';
import { ModalService } from 'src/app/Services/modal.service';
import { NewgraphicService } from 'src/app/Services/newgraphic.service';
import { WorkersService } from 'src/app/Services/workers.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-worker-graphic',
  templateUrl: './worker-graphic.component.html',
  styleUrls: ['./worker-graphic.component.css'],
})
export class WorkerGraphicComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,

    private workerService: WorkersService,
    private modalService: ModalService,
    private newgraphicService: NewgraphicService
  ) {}

  workerStatus: Iworkerstatus[] = [];
  workerStatusData: any[];
  workerLabel: string[] = [];

  workstatus_Subscription: Subscription;

  id = 1;

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      this.id = +params['id'];

      this.workerLabel = [];
      this.workerStatusData = [];

      this.getWorkerStatus(); // HER TIKLAMADA GIDIP DB YE SORMAK GEREKMEYEBILIR!!!!!!!!!! BURAYA COZUM URET
    });
  }

  ngOnDestroy() {
    this.workstatus_Subscription.unsubscribe();
  }

  getWorkerStatus() {
    this.workerStatus = [];
    this.workstatus_Subscription = this.workerService
      .findWorkStatus(this.id)
      .subscribe((value) => {
        this.workerStatus = value;
        this.workerStatus.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        this.workerStatusChart();
        this.newgraphicService.workerStatus.next({
          data: _.cloneDeep(this.workerStatusData),
          label: _.cloneDeep(this.workerLabel),
          type: 'status',
          id: this.id,
        });
      });
  }

  workerStatusChart() {
    const blood_pressure_Data: number[] = [];
    const blood_sugar_Data: number[] = [];

    for (const status of this.workerStatus) {
      const formattedDate = formatDate(status.date, 'dd/MM/yyyy', 'en-US');
      this.workerLabel.push(formattedDate);
      blood_sugar_Data.push(status.bloodSugar);
      blood_pressure_Data.push(status.bloodPressure);
    }
    this.workerStatusData = [
      { fill: false, data: blood_sugar_Data, label: 'Kan Şekeri' },
      { fill: false, data: blood_pressure_Data, label: 'Tansiyon' },
    ];
  }
  addFavority() {
    let graphic: Ifavories = {
      data: this.workerStatusData,
      label: this.workerLabel,
      type: 'status',
      id: this.id,
    };
    this.modalService.saveGraphic(graphic);
  }
}
