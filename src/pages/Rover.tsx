import { Button, Carousel, Descriptions, Image, InputNumber, PageHeader, Select, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { debounce } from 'lodash';
import RoversState from '../store/Rovers';

import { fetchPhotos } from '../effects/fetchPhotos';
import { fetchRovers } from '../effects/fetchRovers';
import { Spinner } from '../components/Spinner';
import { Heading } from '../components/Heading';

interface Params {
  name: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #374e78;
  height: 100vh;
  width: 100vw;
`;

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

const StyledHeading = styled(Heading)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const RoverPage = observer(() => {
  const [sol, setSol] = useState(RoversState.defaultSol);
  const [filter, setFilter] = useState(RoversState.defaultFilter);
  const [hasPhotos, setHasPhotos] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const carouselRef = useRef<any>();

  const { name } = useParams<Params>();
  const { push } = useHistory();

  const fetchData = async (roverName: string, selectedSol: number, camera: string) => {
    setLoading(true);

    await fetchRovers();

    const response = await fetchPhotos(roverName, selectedSol, camera, {
      sol: `${selectedSol}`,
      camera,
    });

    setHasPhotos(response.hasPhotos);
    setLoading(false);
  };

  const debouncedFetchRovers = useCallback(debounce(fetchData, 300), []);

  useEffect(() => {
    if (initialLoading) {
      setInitialLoading(false);
    }

    debouncedFetchRovers(name, sol, filter);
  }, [name, sol, filter, debouncedFetchRovers, initialLoading]);

  const onChangeSol = (value: string | number | null | undefined) => {
    if (value) {
      setSol(+value);
      debouncedFetchRovers(name, +value, filter);
    }
  };

  const onSelectCamera = (value: string) => {
    setFilter(value);
    debouncedFetchRovers(name, sol, value);
  };

  const nextPhoto = () => carouselRef.current.next();
  const prevPhoto = () => carouselRef.current.prev();

  const rover = RoversState.getRoverByName(name);
  const photos = rover?.id ? RoversState.photosByRover?.[rover.id]?.[filter]?.[sol] : [];

  return (
    <Container>
      <PageHeader
        ghost={false}
        onBack={() => push('/')}
        title={rover?.name || <Spin />}
        extra={[
          <Text key="4">Filter</Text>,
          <Select
            value={rover?.cameras.length ? filter : undefined}
            style={{ width: 500 }}
            key="3"
            onSelect={onSelectCamera}
            loading={!rover?.cameras.length}
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
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Launched">{rover?.launchDate || <Spin />}</Descriptions.Item>
          <Descriptions.Item label="Landed">{rover?.landingDate || <Spin />}</Descriptions.Item>
          <Descriptions.Item label="Total photos">
            {rover?.totalPhotos || <Spin />}
          </Descriptions.Item>
          <Descriptions.Item label="Max sol">{rover?.maxSol || <Spin />}</Descriptions.Item>
        </Descriptions>
      </PageHeader>

      <Carousel ref={carouselRef}>
        {!isLoading &&
          photos?.length &&
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
      {!hasPhotos && !isLoading && !initialLoading && <StyledHeading>No Photos! </StyledHeading>}
      {isLoading && <StyledHeading>Loading...</StyledHeading>}

      {!!photos?.length && (
        <ButtonsContainer>
          <Button type="primary" onClick={prevPhoto}>
            Prev photo
          </Button>
          <Button type="primary" onClick={nextPhoto}>
            Next photo
          </Button>
        </ButtonsContainer>
      )}
    </Container>
  );
});
