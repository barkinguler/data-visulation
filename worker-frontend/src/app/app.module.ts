import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {ChartsModule} from 'ng2-charts';


import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth/auth.component';


import {HeaderComponent} from './components/header/header.component';


import {HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MessageComponent} from './components/messages/message/message.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


import {SelectedTabDirective} from './shared/selected-tab.directive';

import {AuthService} from './Services/auth.service';
import {LoginGuard} from './guard/login.guard';
import {WorkerGraphicComponent} from './components/worker/workergraphic/workerstatus/worker-graphic/worker-graphic.component';
import {WorkerstatusComponent} from './components/worker/workergraphic/workerstatus/workerstatus.component';
import {MachineComponent} from './components/worker/workergraphic/machine/machine.component';
import {MachineTabComponent} from './components/worker/workergraphic/machine/machine-tab/machine-tab.component';
import {MachineGraphicComponent} from './components/worker/workergraphic/machine/machine-graphic/machine-graphic.component';
import {EquipmentComponent} from './components/worker/workergraphic/equipment/equipment.component';
import {EquipmentGraphicComponent} from './components/worker/workergraphic/equipment/equipment-graphic/equipment-graphic.component';
import {EquipmentTabComponent} from './components/worker/workergraphic/equipment/equipment-tab/equipment-tab.component';
import {AppRoutingModule} from './app-routing.module';
import {WorkergraphicComponent} from './components/worker/workergraphic/workergraphic.component';
import {WorkerComponent} from './components/worker/worker.component';
import {MachineRegisterComponent} from './components/worker/machine-register/machine-register.component';
import {MachineItemsComponent} from './components/worker/machine-register/machine-items/machine-items.component';
import {MachineStatusComponent} from './components/worker/machine-register/machine-status/machine-status.component';
import {MachineRegisterStartComponent} from './components/worker/machine-register/machine-register-start/machine-register-start.component';
import { FilterPipe } from './shared/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,

    HeaderComponent,


    MessageComponent,

    SelectedTabDirective,

    WorkerGraphicComponent,
    WorkerstatusComponent,
    MachineComponent,
    MachineTabComponent,
    MachineGraphicComponent,
    EquipmentComponent,
    EquipmentGraphicComponent,
    EquipmentTabComponent,
    WorkergraphicComponent,
    WorkerComponent,
    MachineRegisterComponent,
    MachineItemsComponent,
    MachineStatusComponent,
    MachineRegisterStartComponent,
    FilterPipe


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
    MatButtonModule,

  ],
  providers: [AuthService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
