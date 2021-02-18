import camelCaseRecursive from 'camelcase-keys-recursive';

import { Photo } from './entities/Photo';
import { Rover } from './entities/Rover';

interface NasaSDKConfig {
  url: string;
  apiKey: string;
}

export type fetchRoverPhotosParams = {
  sol: string;
  camera: string;
};

export class NasaSDK {
  url?: string;

  apiKey?: string;

  private static instance: NasaSDK;

  static getInstance(config?: NasaSDKConfig): NasaSDK {
    if (!NasaSDK.instance) {
      if (!config) {
        throw new Error('You need to config settings in the first time');
      }

      NasaSDK.instance = new NasaSDK(config);
    }

    return NasaSDK.instance;
  }

  constructor(config: NasaSDKConfig) {
    this.url = config.url;
    this.apiKey = config.apiKey;
  }

  private fetch = async <T>(endpoint: string, queryParams?: string): Promise<T> => {
    const query = queryParams ? `&${queryParams}` : '';
    const response = await fetch(`${this.url}${endpoint}?api_key=${this.apiKey}${query}`);

    const data = await response.json();

    return camelCaseRecursive(data);
  };

  private buildQueryParams = (params: Record<string, string>) =>
    new URLSearchParams(params).toString();

  fetchRovers = async (): Promise<{ rovers: Rover[] }> =>
    this.fetch<{ rovers: Rover[] }>('/rovers');

  fetchRover = async (roverName: string): Promise<{ rovers: Rover[] }> =>
    this.fetch<{ rovers: Rover[] }>(`/rovers/${roverName}`);

  fetchRoverPhotos = async (
    roverName: string,
    params: fetchRoverPhotosParams
  ): Promise<{ photos: Photo[] }> =>
    this.fetch<{ photos: Photo[] }>(
      `/rovers/${roverName.toLowerCase()}/photos`,
      this.buildQueryParams(params)
    );
}
