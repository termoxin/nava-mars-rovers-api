import { makeAutoObservable } from 'mobx';

import { Photo } from '../api/entities/Photo';
import { Rover } from '../api/entities/Rover';

class RoverList {
  rovers: Rover[] = [];

  defaultSol: number;

  defaultFilter: string;

  photosByRover: Record<number, Photo[]>;

  constructor(rovers: Rover[]) {
    makeAutoObservable(this);
    this.rovers = rovers;
    this.photosByRover = {};
    this.defaultSol = 365;
    this.defaultFilter = 'all';
  }

  setRovers(rovers: Rover[]) {
    this.rovers = rovers;
  }

  setRoverPhotos(id: number, photos: Photo[]) {
    this.photosByRover[id] = photos;
  }

  getRoverByName = (name: string) =>
    this.rovers.find((rover) => rover.name.toLowerCase() === name.toLowerCase());
}

export default new RoverList([]);
