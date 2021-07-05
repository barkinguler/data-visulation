import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { Iworkerstatus } from 'src/app/Imodel/Iworkerstatus';
import { EquipmentService } from 'src/app/Services/equipment.service';
import { FactoriesService } from 'src/app/Services/factories.service';
import { StrokeService } from 'src/app/Services/stroke.service';
import { WorkersService } from 'src/app/Services/workers.service';

@Component({
  selector: 'app-workergraphic',
  templateUrl: './workergraphic.component.html',
  styleUrls: ['./workergraphic.component.css']
})
export class WorkergraphicComponent implements OnInit {
  id:number;
  predict;
  constructor(private strokeService:StrokeService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          
          this.strokeService.getPredict(this.id).subscribe(
            value=>{
              
              
              
              this.predict=value;
              
              
              });
        });

        


  }





}
