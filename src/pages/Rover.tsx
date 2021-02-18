import { Button, Carousel, Descriptions, Image, InputNumber, PageHeader, Select, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import RoversState from '../store/Rovers';

import { fetchPhotos } from '../effects/fetchPhotos';
import { fetchRovers } from '../effects/fetchRovers';
import { Spinner } from '../components/Spinner';

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

export const RoverPage = observer(() => {
  const [sol, setSol] = useState(RoversState.defaultSol);
  const [filter, setFilter] = useState(RoversState.defaultFilter);
  const carouselRef = useRef<any>();

  const { name } = useParams<Params>();
  const { push } = useHistory();

  useEffect(() => {
    fetchRovers().then(() => fetchPhotos(name, { sol: `${sol}` }));
  }, [name, sol]);

  const onChangeSol = (value: string | number | null | undefined) => {
    if (value) {
      setSol(+value);
    }
  };

  const onSelectCamera = (value: string) => setFilter(value);

  const nextPhoto = () => carouselRef.current.next();
  const prevPhoto = () => carouselRef.current.prev();

  const rover = RoversState.getRoverByName(name);
  const photos = rover?.id ? RoversState.photosByRover[rover?.id] : [];

  const filteredPhotos = useMemo(
    () => (filter === 'all' ? photos : photos.filter((photo) => photo.camera.name === filter)),
    [filter, photos]
  );

  return (
    <Container>
      <PageHeader
        ghost={false}
        onBack={() => push('/')}
        title={rover?.name || <Spin />}
        extra={[
          <Text key="4">Filter</Text>,
          <Select value={filter} style={{ width: 500 }} key="3" onSelect={onSelectCamera}>
            <>
              <Select.Option key="all" value="all">
                All
              </Select.Option>
              {rover?.cameras.map((camera) => (
                <Select.Option key={camera.name} value={camera.name}>
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
          <Button key="1" type="primary">
            Ok
          </Button>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Launched">{rover?.launchDate || <Spin />}</Descriptions.Item>
          <Descriptions.Item label="Landed">{rover?.landingDate || <Spin />}</Descriptions.Item>
          <Descriptions.Item label="Total photos">
            {rover?.totalPhotos || <Spin />}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>

      <Carousel ref={carouselRef}>
        {filteredPhotos?.map((photo) => (
          <CarouselItem key={photo.id}>
            <Image
              src={photo.imgSrc}
              key={photo.imgSrc}
              width={400}
              height={300}
              placeholder={<Spinner />}
            />
          </CarouselItem>
        ))}
      </Carousel>
      {!!filteredPhotos?.length && (
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
