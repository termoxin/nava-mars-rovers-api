import { NasaSDK, fetchRoverPhotosParams } from '../api/NasaSDK';

import RoversState from '../store/Rovers';

const defaultParams = {
  sol: `${RoversState.defaultSol}`,
  page: '1',
  camera: 'fhaz',
};

interface fetchPhotosReturn {
  hasPhotos: boolean;
}

export const fetchPhotos = async (
  name: string,
  sol: number,
  filter: string,
  params: fetchRoverPhotosParams = defaultParams
): Promise<fetchPhotosReturn> => {
  const rover = RoversState.getRoverByName(name);

  const { photos } = await NasaSDK.getInstance().fetchRoverPhotos(name, params);

  if (rover) {
    RoversState.setRoverPhotos(rover.id, sol, filter, photos);

    return { hasPhotos: !!photos.length };
  }

  return { hasPhotos: true };
};
