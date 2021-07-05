import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iworkerstatus } from 'src/app/Imodel/Iworkerstatus';
import { AuthService } from 'src/app/Services/auth.service';
import { WorkersService } from 'src/app/Services/workers.service';

@Component({
  selector: 'app-worker-graphic',
  templateUrl: './worker-graphic.component.html',
  styleUrls: ['./worker-graphic.component.css']
})
export class WorkerGraphicComponent implements OnInit {

  constructor(private route: ActivatedRoute, private workerService: WorkersService, private authService: AuthService) { }

  workerStatus: Iworkerstatus[] = [];
  workerStatusData: any;
  workerLabel: string[] = [];



  workstatus_Subscription: Subscription;


  id = Number(this.authService.getUserId());


  // tslint:disable-next-line:typedef
  ngOnInit() {
    console.log(this.id);
    this.route.parent.parent.params
      .subscribe(
        (params: Params) => {

          this.id = +params['id'];
          console.log(this.id);


          this.workerLabel = [];
          this.workerStatusData = [];


          this.getWorkerStatus(); // HER TIKLAMADA GIDIP DB YE SORMAK GEREKMEYEBILIR!!!!!!!!!! BURAYA COZUM URET

        }
      );

  }

  ngOnDestroy() {

    this.workstatus_Subscription.unsubscribe();
  }

  getWorkerStatus() {
    this.workerStatus = [];
    this.workstatus_Subscription = this.workerService.findWorkStatus(this.id).subscribe(
      (value => {

        this.workerStatus = value;
        this.workerStatus.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        this.workerStatusChart();

      }));
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

}
