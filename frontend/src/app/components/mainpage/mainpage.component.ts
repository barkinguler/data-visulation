import { Component, OnInit } from '@angular/core';
import { Iworkplace } from 'src/app/Imodel/Iworkplace';
import { FactoriesService } from 'src/app/Services/factories.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor(private factoriesServis: FactoriesService) { }
  workPlaces = [];

  async ngOnInit() {
    console.log(this.factoriesServis.getworkPlaces())
    await this.factoriesServis.getworkPlaces().then(res => {
      res.map(workplace => {
        this.workPlaces.push(workplace);
      });
    });
    console.log(this.workPlaces);
  }

  getWorkPlaces() {

  }
  showWorkers(value: Iworkplace) {

    this.factoriesServis.setSelectedFactoryId(value.id);

  }
}
