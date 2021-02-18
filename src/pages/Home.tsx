import { useEffect, FC } from 'react';
import styled from 'styled-components';
import { Row, Spin } from 'antd';
import { observer } from 'mobx-react-lite';

import { RoverCard } from '../components/RoverCard';
import { Heading } from '../components/Heading';

import { fetchRovers } from '../effects/fetchRovers';
import RoversState from '../store/Rovers';

import { GlobalStyles } from '../GlobalStyles';

const StyledRow = styled(Row)`
  margin-top: 50px;
`;

const Container = styled.div`
  position: relative;
  top: 50px;
`;

const StyledHeading = styled(Heading)`
  span {
    color: #ea8162;
  }
`;

export const HomePage: FC = observer(() => {
  useEffect(() => {
    fetchRovers();
  }, []);

  const roverCards = RoversState.rovers.length ? (
    RoversState.rovers?.map((rover) => <RoverCard key={rover.id} {...rover} />)
  ) : (
    <Spin size="large" />
  );

  return (
    <Container>
      <Row justify="space-around" align="middle">
        <StyledHeading>
          Discover <span>Mars</span> first
        </StyledHeading>
      </Row>
      <StyledRow justify="space-around" align="middle">
        {roverCards}
      </StyledRow>
      <GlobalStyles />
    </Container>
  );
});
