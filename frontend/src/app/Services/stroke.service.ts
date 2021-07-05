import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';

import { Istroke } from '../Imodel/Istroke';
import { IstrokeTranslation } from '../Imodel/IstrokeTranslation';

@Injectable({
  providedIn: 'root'
})
export class StrokeService {
  strokeValues:IstrokeTranslation[]=[];
  posturl='http://104.155.99.161:8080/strokeApi/v1/addWorkerStroke';
  geturl='http://104.155.99.161:8080/workerApi/v1/getStrokeStatusById/'
  constructor(private http: HttpClient) { 
    this.strokeValues.push({tr:'Erkek',eng:'Male'});
    this.strokeValues.push({tr:'Kadın',eng:'Female'});
    this.strokeValues.push({tr:'Evet',eng:'Yes'});
    this.strokeValues.push({tr:'Hayır',eng:'No'});
    this.strokeValues.push({tr:'Özel',eng:'Private'});
    this.strokeValues.push({tr:'Özel',eng:'Private'});
    this.strokeValues.push({tr:'Memur',eng:'Govt_job'});
    this.strokeValues.push({tr:'Serbest Meslek',eng:'Self-employed'});
    this.strokeValues.push({tr:'Stajyer(Çocuk,genç)',eng:'children'});
    this.strokeValues.push({tr:'Şehir Konutu',eng:'Urban'});
    this.strokeValues.push({tr:'Kırsal Ev',eng:'Rural'});
    this.strokeValues.push({tr:'Hiç kullanmadı',eng:'never_smoked'});
    this.strokeValues.push({tr:'Bilinmiyor',eng:'Unknown'});
    this.strokeValues.push({tr:'Önceden Kullandı',eng:'formerly smoked'});
    this.strokeValues.push({tr:'Kullanıyor',eng:'smokes'});
    this.strokeValues.push({tr:'Hiç Çalışmadı',eng:'never_worked'});
    this.strokeValues.push({tr:'Diğer',eng:'Other'});
    
  
    
  }
  private header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });

  save(value:Istroke){
    return this.http.post<Istroke>(this.posturl, value, { headers: this.header })
    ;

  }

  getPredict(id:number){
    return this.http
      .get(
        this.geturl + id, {headers: this.header}
      );
  }
}
