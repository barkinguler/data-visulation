import { Iworker } from './Iworker';

export interface ILogs {
  id: number;
  date: Date;
  heat?: number;
  machineId?: number;
  workerId?: number;
  isActive?: boolean;
  equipmentId?: number;
  isRunnig?: boolean;
  proximity?: number;
  altitude?: number;
}
