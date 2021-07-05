import {Component, OnInit} from '@angular/core';

import { Iworkplace } from 'src/app/Imodel/Iworkplace';
import { FactoriesService } from 'src/app/Services/factories.service';
import {WorkersService} from 'src/app/Services/workers.service';

@Component({
  selector: 'app-create-worker',
  templateUrl: './create-worker.component.html',
  styleUrls: ['./create-worker.component.css']
})
export class CreateWorkerComponent implements OnInit {
  workPlaces:Iworkplace[]=[];
  newWorker = {
    firstName: '',
    lastName: '',
    age: 0,
    weight: '',
    length: '',
    bloodGroup: '',
    email: '',
    phoneNumber: '',
    disease: '',
    id: null,
    machineId: null,
    workplaceId: 1,
    isActive: true
  };

  constructor(public workerService: WorkersService,public factoriesService:FactoriesService) {
  }

   ngOnInit() {
     this.factoriesService.getworkPlaces().then(res => {
      res.map(workplace => {
        this.workPlaces.push(workplace);
      });
    });
    console.log(this.workPlaces);
  }

  

  kayitEt() {
    console.log("veri",this.newWorker);
    this.workerService.createWorker(this.newWorker).then(res => {
      
      this.newWorker.firstName = '';
      this.newWorker.lastName = '';
      this.newWorker.age = 0;
      this.newWorker.length = '';
      this.newWorker.weight = '';
      this.newWorker.bloodGroup = '';
      this.newWorker.email = '';
      this.newWorker.phoneNumber = '';
      this.newWorker.disease = '';
    });

  }

}
