import {Component, OnInit} from '@angular/core';
import {WorkersService} from 'src/app/Services/workers.service';

@Component({
  selector: 'app-update-worker',
  templateUrl: './update-worker.component.html',
  styleUrls: ['./update-worker.component.css'],
})
export class UpdateWorkerComponent implements OnInit {
  workers;
  employerWorkplaceId: number = 1;

  constructor(public workerService: WorkersService) {
  }

  ngOnInit(): void {
    this.workerService
      .getWorkersforFactory(this.employerWorkplaceId)
      .then((res) => {
        this.workers = res;
      });
  }

  updateWorkerById(worker) {
    let response = this.workerService
      .updateWorkerById(worker.id, worker)
      .then((res) => {
        this.workers = null;
        this.ngOnInit();
      });
  }

  deleteWorkerById(workerId) {
    this.workerService.deleteWorkerById(workerId).then((res) => {
      this.workers = null;
      this.ngOnInit();
    });
  }
}
