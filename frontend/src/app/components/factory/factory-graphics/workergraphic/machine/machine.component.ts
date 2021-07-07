import {ViewChild} from '@angular/core';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {MachineService} from 'src/app/Services/machine.service';
import {MachineGraphicComponent} from './machine-graphic/machine-graphic.component';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  @ViewChild(MachineGraphicComponent) child: MachineGraphicComponent;

  constructor(private route: ActivatedRoute, private MachineService: MachineService) {

  }


  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {

          this.subscription = this.MachineService.findMachinesbyWorkerId(+params['id']).subscribe(
            logs => {

              //bir defa sorgu atmak için bu componentden çağırılıyor, sonra bilgi serviste saklanıyo tekrar kullanılması için

            }
          )

        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addFavority() {
    this.child.addGraphic();
  }

}
