import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth/auth.component';

import {FactoryComponent} from './components/factory/factory.component';
import {HeaderComponent} from './components/header/header.component';
import {FactoryStartComponent} from './components/factory/factory-start/factory-start.component';


import {ItemsComponent} from './components/factory/items/items.component';
import {MainpageComponent} from './components/mainpage/mainpage.component';
import {FactoryGraphicsComponent} from './components/factory/factory-graphics/factory-graphics.component';

import {WorkergraphicComponent} from './components/factory/factory-graphics/workergraphic/workergraphic.component';

import {HttpClientModule} from '@angular/common/http';
import {CreateWorkerComponent} from './components/worker/create-worker/create-worker.component';
import {CreateEquipmentComponent} from './components/equipment/create-equipment/create-equipment.component';
import {CreateMachineComponent} from './components/machine/create-machine/create-machine.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UpdateWorkerComponent} from './components/worker/update-worker/update-worker.component';
import {UpdateEquipmentComponent} from './components/equipment/update-equipment/update-equipment.component';
import {UpdateMachineComponent} from './components/machine/update-machine/update-machine.component';
import {MessageComponent} from './components/messages/message/message.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {MachineTabComponent} from './components/factory/factory-graphics/workergraphic/machine/machine-tab/machine-tab.component';
import {MachineGraphicComponent} from './components/factory/factory-graphics/workergraphic/machine/machine-graphic/machine-graphic.component';
import {MachineComponent} from './components/factory/factory-graphics/workergraphic/machine/machine.component';
import {EquipmentComponent} from './components/factory/factory-graphics/workergraphic/equipment/equipment.component';
import {EquipmentGraphicComponent} from './components/factory/factory-graphics/workergraphic/equipment/equipment-graphic/equipment-graphic.component';
import {EquipmentTabComponent} from './components/factory/factory-graphics/workergraphic/equipment/equipment-tab/equipment-tab.component';
import {SelectedTabDirective} from './shared/selected-tab.directive';
import { WorkerstatusComponent } from './components/factory/factory-graphics/workergraphic/workerstatus/workerstatus.component';
import { WorkerGraphicComponent } from './components/factory/factory-graphics/workergraphic/workerstatus/worker-graphic/worker-graphic.component';
import {AuthService} from './Services/auth.service';
import {LoginGuard} from './guard/login.guard';
import { FilterPipe } from './shared/filter.pipe';
import { FavoritesComponent } from './components/header/favorites/favorites.component';
import { NewgraphicComponent } from './components/factory/factory-graphics/workergraphic/newgraphic/newgraphic.component';
import { ModalGraphicComponent } from './components/factory/factory-graphics/workergraphic/newgraphic/modal-graphic/modal-graphic.component';
import * as _ from "lodash";
import { StrokePredictComponent } from './components/header/stroke-predict/stroke-predict.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FactoryComponent,
    HeaderComponent,
    FactoryGraphicsComponent,
    FactoryStartComponent,
    ItemsComponent,
    MainpageComponent,
    MessageComponent,
    WorkergraphicComponent,

    CreateWorkerComponent,
    CreateEquipmentComponent,
    CreateMachineComponent,
    UpdateWorkerComponent,
    UpdateEquipmentComponent,
    UpdateMachineComponent,
    MachineComponent,
    MachineTabComponent,
    MachineGraphicComponent,
    EquipmentComponent,
    EquipmentGraphicComponent,
    EquipmentTabComponent,
    SelectedTabDirective,
    WorkerstatusComponent,
    WorkerGraphicComponent,
    FilterPipe,
    FavoritesComponent,
    NewgraphicComponent,
    ModalGraphicComponent,
    StrokePredictComponent,
    
    
    
    


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule

  ],
  providers: [AuthService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
