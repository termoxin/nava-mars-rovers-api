import { keyframes } from 'styled-components';

export const shadowPopIn = keyframes`
  0% {
    box-shadow: 0 0  #fc5c7d, 0 0  #fc5c7d, 0 0  #fc5c7d, 0 0  #fc5c7d, 0 0  #fc5c7d, 0 0  #fc5c7d, 0 0  #fc5c7d, 0 0  #fc5c7d;
    transform: translateX(0) translateY(0);
  }

  100% {
    box-shadow: 1px -1px  #fc5c7d, 2px -2px  #fc5c7d, 3px -3px  #fc5c7d, 4px -4px  #fc5c7d, 5px -5px  #fc5c7d, 6px -6px  #fc5c7d, 7px -7px  #fc5c7d, 8px -8px  #fc5c7d;
    transform: translateX(-8px) translateY(8px);
  }
`;

export const shadowPopOut = keyframes`
  0% {
    box-shadow: 1px -1px  #fc5c7d, 2px -2px  #fc5c7d, 3px -3px  #fc5c7d, 4px -4px  #fc5c7d, 5px -5px  #fc5c7d, 6px -6px  #fc5c7d, 7px -7px  #fc5c7d, 8px -8px  #fc5c7d;
    transform: translateX(-8px) translateY(8px);
  }

  100% {
    box-shadow: 0 0  #fc5c7d, 0 0  #fc5c7d, 0 0  #fc5c7d, 0 0  #fc5c7d, 0 0  #fc5c7d, 0 0  #fc5c7d, 0 0  #fc5c7d, 0 0  #fc5c7d;
    transform: translateX(0) translateY(0);
  }
`;
