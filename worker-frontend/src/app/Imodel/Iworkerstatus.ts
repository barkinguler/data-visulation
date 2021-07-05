import { Iworker } from './Iworker';

export interface Iworkerstatus
{

id: number;
heat: number;
bloodPressure: number;
bloodSugar: number;
healthStatus?: string;
date: Date;
workerId?: Iworker;

}
