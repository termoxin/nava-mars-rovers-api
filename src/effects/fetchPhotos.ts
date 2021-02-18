import { NasaSDK, fetchRoverPhotosParams } from '../api/NasaSDK';

import RoversState from '../store/Rovers';

const defaultParams = {
  sol: `${RoversState.defaultSol}`,
  page: '1',
};

export const fetchPhotos = async (
  name: string,
  params: fetchRoverPhotosParams = defaultParams
): Promise<void> => {
  const { photos } = await NasaSDK.getInstance().fetchRoverPhotos(name, params);

  const rover = RoversState.getRoverByName(name);

  if (rover) {
    RoversState.setRoverPhotos(rover.id, photos);
  }
};
