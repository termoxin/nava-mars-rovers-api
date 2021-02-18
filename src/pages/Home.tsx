import { useEffect, FC } from 'react';
import styled from 'styled-components';
import { Row } from 'antd';

import { observer } from 'mobx-react-lite';
import { RoverCard } from '../components/RoverCard';
import RoversState from '../store/Rovers';
import { fetchRovers } from '../effects/fetchRovers';

const StyledRow = styled(Row)`
  margin-top: 50px;
`;

export const HomePage: FC = observer(() => {
  useEffect(() => {
    fetchRovers();
  }, []);

  return (
    <div>
      <StyledRow justify="space-around" align="middle">
        {RoversState.rovers?.map((rover) => (
          <RoverCard key={rover.id} {...rover} />
        ))}
      </StyledRow>
    </div>
  );
});
