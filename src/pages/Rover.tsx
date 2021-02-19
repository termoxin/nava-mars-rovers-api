import { InputNumber, Select } from 'antd';
import Text from 'antd/lib/typography/Text';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CarouselRef } from 'antd/lib/carousel';
import { isEmpty } from 'lodash';

import RoversState from '../store/Rovers';

import { fetchPhotos } from '../effects/fetchPhotos';
import { fetchRovers } from '../effects/fetchRovers';

import { Heading } from '../components/Heading';
import { RoversCarousel } from '../components/RoversCarousel';
import { RoverPageHeader } from '../components/RoverPageHeader';

import { useDebounce } from '../hooks/useDebounce';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #374e78;
  height: 100vh;
  width: 100vw;
`;

const StyledHeading = styled(Heading)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

interface Params {
  name: string;
}

export const RoverPage = observer(() => {
  const [sol, setSol] = useState(RoversState.defaultSol);
  const [filter, setFilter] = useState(RoversState.defaultFilter);
  const [hasPhotos, setHasPhotos] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const carouselRef = useRef<CarouselRef>(null);
  const { name } = useParams<Params>();

  const fetchRoversData = async (roverName: string, selectedSol: number, camera: string) => {
    setLoading(true);

    if (!RoversState.rovers.length) {
      await fetchRovers();
    }

    const response = await fetchPhotos(roverName, selectedSol, camera, {
      sol: `${selectedSol}`,
      camera,
    });

    setHasPhotos(response.hasPhotos);
    setLoading(false);
  };

  const debouncedSol = useDebounce(sol, 300);
  const debouncedFilter = useDebounce(filter, 300);

  useEffect(() => {
    fetchRoversData(name, debouncedSol, debouncedFilter);
  }, [name, debouncedSol, debouncedFilter]);

  useEffect(() => {
    if (initialLoading) {
      setInitialLoading(false);
    }
  }, [initialLoading]);

  const onChangeSol = (value: string | number | null | undefined) => {
    if (value) {
      setSol(+value);
    }
  };

  const onSelectCamera = (value: string) => setFilter(value);

  const nextPhoto = () => carouselRef.current?.next();
  const prevPhoto = () => carouselRef.current?.prev();

  const rover = RoversState.getRoverByName(name);

  const photos = rover?.id
    ? RoversState.photosByRover?.[rover.id]?.[debouncedFilter]?.[debouncedSol]
    : [];

  const noPhotos = !hasPhotos && !isLoading && !initialLoading;

  const extraComponent = [
    <Text key="4">Filter</Text>,
    <Select
      value={isEmpty(rover?.cameras) ? undefined : filter}
      style={{ width: 500 }}
      key="3"
      onSelect={onSelectCamera}
      loading={isEmpty(rover?.cameras)}
    >
      <>
        {rover?.cameras.map((camera) => (
          <Select.Option key={camera.name} value={camera.name.toLowerCase()}>
            {camera?.fullName}
          </Select.Option>
        ))}
      </>
    </Select>,
    <InputNumber
      min={1}
      max={rover?.maxSol}
      value={sol}
      key="2"
      placeholder="Sol"
      onChange={onChangeSol}
    />,
  ];

  return (
    <Container>
      <RoverPageHeader extra={extraComponent} rover={rover} />
      <RoversCarousel
        isLoading={isLoading}
        photos={photos}
        carouselRef={carouselRef}
        onNext={nextPhoto}
        onPrev={prevPhoto}
      />
      {noPhotos && <StyledHeading>No Photos! </StyledHeading>}
      {isLoading && <StyledHeading>Loading...</StyledHeading>}
    </Container>
  );
});
