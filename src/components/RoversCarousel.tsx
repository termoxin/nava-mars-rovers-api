import { Button, Carousel, Image } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { isEmpty } from 'lodash';
import { FC, RefObject } from 'react';
import styled from 'styled-components';

import { Photo } from '../api/entities/Photo';
import { Spinner } from './Spinner';

const CarouselItem = styled.div`
  display: flex !important;
  justify-content: center;
  margin: 50px 0 50px 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;

  button {
    margin: 0 5px 0 5px;
  }
`;

interface RoversCarouselProps {
  photos: Photo[];
  isLoading: boolean;
  onNext: () => void;
  onPrev: () => void;
  carouselRef: RefObject<CarouselRef>;
}

export const RoversCarousel: FC<RoversCarouselProps> = ({
  isLoading,
  photos,
  carouselRef,
  onNext,
  onPrev,
}) => (
  <div>
    <Carousel ref={carouselRef}>
      {!isLoading &&
        !isEmpty(photos) &&
        photos?.map((photo) => (
          <CarouselItem key={photo.id}>
            <Image
              src={photo.imgSrc}
              key={photo.imgSrc}
              width={900}
              height={500}
              placeholder={<Spinner type="rover" />}
            />
          </CarouselItem>
        ))}
    </Carousel>
    {!!isEmpty(photos) && (
      <ButtonsContainer>
        <Button type="primary" onClick={onPrev}>
          Prev photo
        </Button>
        <Button type="primary" onClick={onNext}>
          Next photo
        </Button>
      </ButtonsContainer>
    )}
  </div>
);
