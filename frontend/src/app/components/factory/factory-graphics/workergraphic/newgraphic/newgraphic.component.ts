import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {Ifavories} from 'src/app/Imodel/Ifavories';
import {ModalService} from 'src/app/Services/modal.service';
import {NewgraphicService} from 'src/app/Services/newgraphic.service';

@Component({
  selector: 'app-newgraphic',
  templateUrl: './newgraphic.component.html',
  styleUrls: ['./newgraphic.component.css']
})
export class NewgraphicComponent implements OnInit, OnDestroy {
  id: number;
  subscription: Subscription;
  graphicValues: Ifavories[] = [];

  constructor(private newGraphicService: NewgraphicService, private route: ActivatedRoute, private ModalService: ModalService) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];

        })

    this.subscription = this.newGraphicService.customGraphic.subscribe(
      value => {
        this.graphicValues = value;
      }
    )
  }

  getGraphics() {
    return this.graphicValues.filter(item => item.id == this.id)
  }

  addFavority(value: Ifavories) {
    let graphic: Ifavories;
    graphic = {data: value.data, label: value.label, type: 'custom', id: this.id};
    console.log(graphic)
    this.ModalService.saveGraphic(graphic);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.newGraphicService.clear();
  }

}
