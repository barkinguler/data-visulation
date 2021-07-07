export interface Iequipment {
  authorityLevel: number;
  id: number;
  isActive: boolean;
  job: string;
  name: string;
  newMaintenanceDate: Date;
  oldMaintenanceDate: Date;
  status?: boolean;
  workplaceId: number;
  workerId: number;
}
