import { Imachine } from './Imachine';
import { Iworkplace } from './Iworkplace';

export interface Iworker {
  id: number;
  firstName?: string;
  lastName?: string;
  age?: number;
  weight?: string;
  length?: string;
  email: string;
  phoneNumber: string;
  disease: string;
  bloodGroup?: string;
  workplaceId?: Iworkplace;
  machineId?: Array<Imachine>;
}
