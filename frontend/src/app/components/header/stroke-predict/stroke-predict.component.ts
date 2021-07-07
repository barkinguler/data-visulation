import {error} from '@angular/compiler/src/util';
import {ViewChild} from '@angular/core';
import {ElementRef} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Istroke} from 'src/app/Imodel/Istroke';
import {IstrokeTranslation} from 'src/app/Imodel/IstrokeTranslation';
import {AuthService} from 'src/app/Services/auth.service';
import {ModalService} from 'src/app/Services/modal.service';
import {StrokeService} from 'src/app/Services/stroke.service';

@Component({
  selector: 'app-stroke-predict',
  templateUrl: './stroke-predict.component.html',
  styleUrls: ['./stroke-predict.component.css'],
  providers: [ModalService]
})
export class StrokePredictComponent implements OnInit {

  @ViewChild('modalPredict') elementRef: ElementRef
  id: number;
  predict;
  loading: boolean = false;

  constructor(public authservice: AuthService, private modalService: ModalService, private strokeService: StrokeService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.modalService.setup(this.elementRef);
  }

  open() {


    this.modalService.open();
  }

  close() {
    this.loading = false;
    this.modalService.close();
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    const valueForm = form.value;

    this.id = valueForm.id;
    const strokeValue: Istroke = {
      workerId: parseInt(valueForm.id),
      bmi: parseInt(valueForm.bmi),
      age: parseInt(valueForm.age),
      avgGlucoseLevel: parseInt(valueForm.avgglucose),
      hypertension: valueForm.Hypertension == 'Evet' ? 1 : 0,
      heartDisease: valueForm.hearth == 'Evet' ? 1 : 0,
      residenceType: this.Translate(valueForm.residence),
      smokingStatus: this.Translate(valueForm.smoking),
      workType: this.Translate(valueForm.worktype),
      gender: this.Translate(valueForm.gender),
      everMarried: this.Translate(valueForm.married),
      stroke: valueForm.stroke == 'Evet' ? 1 : 0,
      dtype: 'string'

    }
    console.log('asd', strokeValue);
    this.strokeService.save(strokeValue).subscribe(
      data => {
        this.strokeService.getPredict(this.id).subscribe(
          value => {
            this.predict = value;

          }
        )
      },
      error => {

        var interval = setInterval(() => {
          this.strokeService.getPredict(this.id).subscribe(
            value => {

              if (value != null) {

                this.predict = value == 1 ? 'Riskli' : 'Risk Yok';

              }

              if (value != null) {
                clearInterval(interval);
                this.loading = false;
              } else
                this.predict = null;
            }
          )
        }, 5000);

        console.error('hata!', error);
      }
    );

  }

  Translate(value) {
    const languages: IstrokeTranslation[] = this.strokeService.strokeValues;
    for (let i = 0; i < languages.length; i++) {
      if (languages[i].tr == value)
        return languages[i].eng;
    }

  }


}
