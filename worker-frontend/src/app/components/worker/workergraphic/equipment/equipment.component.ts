import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {EquipmentService} from 'src/app/Services/equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css'],
})
export class EquipmentComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private EquipmentService: EquipmentService
  ) {
  }

  subscription: Subscription;

  ngOnInit(): void {
    this.route.parent.parent.params.subscribe((params: Params) => {
      console.log('asd' + params['id']);
      this.subscription = this.EquipmentService.findEquipment(
        +params['id']
      ).subscribe((logs) => {
        //bir defa sorgu atmak için bu componentden çağırılıyor, sonra bilgi serviste saklanıyo tekrar kullanılması için
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
