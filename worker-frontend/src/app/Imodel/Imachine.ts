import { Iworker } from './Iworker';

export interface Imachine {
  id: number;
  job?: string;
  isRunning?: boolean;
  workerId?: Iworker;
  name?: string;
  oldMaintenanceDate?: Date;
  newMaintenanceDate?: Date;
  authorityLevel?: number;
}
