import { NasaSDK } from '../api/NasaSDK';

import RoversState from '../store/Rovers';

export const fetchRovers = async (): Promise<void> => {
  const { rovers } = await NasaSDK.getInstance().fetchRovers();

  RoversState.setRovers(rovers);
};
