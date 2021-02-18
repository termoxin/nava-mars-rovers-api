import { Rover } from './Rover';
import { Camera } from './Camera';

export interface Photo {
  id: number;
  sol: number;
  camera: Camera;
  imgSrc: string;
  earthDate: string;
  rover: Omit<Rover, 'maxSol' | 'maxDate' | 'totalPhotos' | 'cameras'>;
}
