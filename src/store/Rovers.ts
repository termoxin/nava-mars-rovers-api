import { makeAutoObservable } from 'mobx';

import { Photo } from '../api/entities/Photo';
import { Rover } from '../api/entities/Rover';

type RoverSol = Record<number, Photo[]>;
type RoverCameras = Record<string, RoverSol>;
type RoverPhotos = Record<string, RoverCameras>;

class RoverList {
  rovers: Rover[] = [];

  defaultSol: number;

  defaultFilter: string;

  photosByRover: RoverPhotos;

  constructor(rovers: Rover[]) {
    makeAutoObservable(this);
    this.rovers = rovers;
    this.photosByRover = {};
    this.defaultSol = 1;
    this.defaultFilter = 'fhaz';
  }

  setRovers(rovers: Rover[]) {
    this.rovers = rovers;
  }

  setRoverPhotos(id: number, sol: number, filter: string, photos: Photo[]) {
    if (this.photosByRover?.[id]?.[filter]?.[sol]) {
      this.photosByRover[id][filter][sol] = photos;
    } else {
      this.photosByRover[id] = { ...this.photosByRover[id] };
      this.photosByRover[id][filter] = { ...this.photosByRover[id][filter] };
      this.photosByRover[id][filter][sol] = [...photos];
    }
  }

  getRoverByName = (name: string) =>
    this.rovers.find((rover) => rover.name.toLowerCase() === name.toLowerCase());
}

export default new RoverList([]);
