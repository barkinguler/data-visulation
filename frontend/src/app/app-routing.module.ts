import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {FactoryGraphicsComponent} from './components/factory/factory-graphics/factory-graphics.component';

import {WorkergraphicComponent} from './components/factory/factory-graphics/workergraphic/workergraphic.component';
import {FactoryStartComponent} from './components/factory/factory-start/factory-start.component';
import {FactoryComponent} from './components/factory/factory.component';
import {CreateWorkerComponent} from './components/worker/create-worker/create-worker.component';


import {MainpageComponent} from './components/mainpage/mainpage.component';
import {CreateEquipmentComponent} from './components/equipment/create-equipment/create-equipment.component';
import {CreateMachineComponent} from './components/machine/create-machine/create-machine.component';
import {UpdateWorkerComponent} from './components/worker/update-worker/update-worker.component';
import {UpdateEquipmentComponent} from './components/equipment/update-equipment/update-equipment.component';
import {UpdateMachineComponent} from './components/machine/update-machine/update-machine.component';
import {MachineComponent} from './components/factory/factory-graphics/workergraphic/machine/machine.component';
import {EquipmentComponent} from './components/factory/factory-graphics/workergraphic/equipment/equipment.component';
import {WorkerstatusComponent} from './components/factory/factory-graphics/workergraphic/workerstatus/workerstatus.component';
import {LoginGuard} from './guard/login.guard';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'main', component: MainpageComponent, canActivate: [LoginGuard], data: {expectedRole: ['employer', 'hr']}},
  {path: 'createWorker', component: CreateWorkerComponent, canActivate: [LoginGuard], data: {expectedRole: ['hr']}},
  {path: 'createEquipment', component: CreateEquipmentComponent, canActivate: [LoginGuard], data: {expectedRole: ['hr']}},
  {path: 'createMachine', component: CreateMachineComponent, canActivate: [LoginGuard], data: {expectedRole: ['hr']}},
  {path: 'updateWorker', component: UpdateWorkerComponent, canActivate: [LoginGuard], data: {expectedRole: ['hr']}},
  {path: 'updateEquipment', component: UpdateEquipmentComponent, canActivate: [LoginGuard], data: {expectedRole: ['hr']}},
  {path: 'updateMachine', component: UpdateMachineComponent, canActivate: [LoginGuard], data: {expectedRole: ['hr']}},
  {
    path: 'factory', component: FactoryComponent, children: [
      {path: '', component: FactoryStartComponent},
      {
        path: ':id', component: FactoryGraphicsComponent, canActivate: [LoginGuard], data: {expectedRole: ['employer', 'hr']}, children: [
          {
            path: '', component: WorkergraphicComponent, canActivate: [LoginGuard], data: {expectedRole: ['employer', 'hr']},
            children: [
              {
                path: '',
                component: MachineComponent,
                canActivate: [LoginGuard],
                data: {expectedRole: ['employer', 'hr']},
                outlet: 'machine'
              }
              , {
                path: '', component: EquipmentComponent, canActivate: [LoginGuard]
                , data: {expectedRole: ['employer', 'hr']}, outlet: 'equipment'
              }
              , {
                path: '',
                component: WorkerstatusComponent,
                canActivate: [LoginGuard],
                data: {expectedRole: ['employer', 'hr']},
                outlet: 'workerstatus'
              }
            ]
          }

        ]
      }

    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
