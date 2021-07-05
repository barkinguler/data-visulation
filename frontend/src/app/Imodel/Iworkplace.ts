import { Iworker } from './Iworker';

export interface Iworkplace
{

id: number;
name?: string;
eposta?: string;
tel_no?: string;
worker_id?: Array<Iworker>;

}
