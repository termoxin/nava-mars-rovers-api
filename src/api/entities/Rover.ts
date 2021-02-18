import { Camera } from './Camera';

export type roverStatus = 'active' | 'complete';

export interface Rover {
  id: number;
  name: string;
  landingDate: string;
  launchDate: string;
  status: roverStatus;
  maxSol: number;
  maxDate: string;
  totalPhotos: number;
  cameras: Camera[];
}
