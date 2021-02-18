import { Image } from 'antd';
import { FC } from 'react';

import marsGif from './spinner/mars.webp';
import roverGif from './spinner/rover.webp';

const spinners = {
  mars: marsGif,
  rover: roverGif,
};

interface SpinnerProps {
  type: keyof typeof spinners;
}

export const Spinner: FC<SpinnerProps> = ({ type }) => (
  <Image src={spinners[type]} width={900} height={500} />
);
