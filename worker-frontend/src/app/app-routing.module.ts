import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';




import { EquipmentService } from './Services/equipment.service';

import { LoginGuard } from './guard/login.guard';
import { WorkergraphicComponent } from './components/worker/workergraphic/workergraphic.component';
import { WorkerstatusComponent } from './components/worker/workergraphic/workerstatus/workerstatus.component';
import { MachineComponent } from './components/worker/workergraphic/machine/machine.component';
import { EquipmentComponent } from './components/worker/workergraphic/equipment/equipment.component';
import { WorkerComponent } from './components/worker/worker.component';
import { WorkerGraphicComponent } from './components/worker/workergraphic/workerstatus/worker-graphic/worker-graphic.component';
import { MachineRegisterComponent } from './components/worker/machine-register/machine-register.component';
import { MachineRegisterStartComponent } from './components/worker/machine-register/machine-register-start/machine-register-start.component';
import { MachineStatusComponent } from './components/worker/machine-register/machine-status/machine-status.component';


const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },

  {
    path: ':id', component: WorkerComponent, canActivate: [LoginGuard], data: { expectedRole: ['worker'] },
    children: [{ path: '', redirectTo: 'graphic', pathMatch: 'full', canActivate: [LoginGuard], data: { expectedRole: ['worker'] } },
    {
      path: 'graphic', component: WorkergraphicComponent, canActivate: [LoginGuard], data: { expectedRole: ['worker'] },
      children: [{
        path: '', component: MachineComponent,
        canActivate: [LoginGuard], data: { expectedRole: ['worker'] }, outlet: 'machine'
      },

      { path: '', component: EquipmentComponent, canActivate: [LoginGuard], data: { expectedRole: ['worker'] }, outlet: 'equipment' },

      {
        path: '', component: WorkerstatusComponent, canActivate: [LoginGuard],
        data: { expectedRole: ['worker'] }, outlet: 'workerstatus'
      }]
    }, {
      path: 'register', component: MachineRegisterComponent, canActivate: [LoginGuard],
      data: { expectedRole: ['worker'] }, children: [{ path: '', component: MachineRegisterStartComponent }, { path: ':machineid', component: MachineStatusComponent }]
    }
    ]
  }];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
