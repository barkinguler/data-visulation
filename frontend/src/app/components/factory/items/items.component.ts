import {Component, OnInit} from '@angular/core';
import {Iworker} from 'src/app/Imodel/Iworker';
import {FactoriesService} from 'src/app/Services/factories.service';
import {WorkersService} from 'src/app/Services/workers.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  filterInformation: any;

  workers: Iworker[] = [];

  constructor(private factoriesService: FactoriesService, private workerService: WorkersService) {
  }

  async ngOnInit() {
    await this.workerService.getWorkersforFactory(this.factoriesService.getSelectedFactoryId()).then(res => {
      res.map(worker => {
        this.workers.push(worker);
      });
    });
  }

  getWorkers(): Array<Iworker> {

    return this.workers;
  }


}
