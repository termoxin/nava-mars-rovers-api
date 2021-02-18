import { Button, Card, Col } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Rover, roverStatus } from '../api/entities/Rover';

const StyledColumn = styled(Col)`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: #fff;
`;

const getEmojiByStatus = (status: roverStatus) => (status === 'active' ? '⏳' : '✅');

type RoverCardProps = Rover;

export const RoverCard: FC<RoverCardProps> = ({ name, status, launchDate, landingDate }) => (
  <StyledColumn span={8}>
    <Card
      title={
        <p>
          {name} is {status} {getEmojiByStatus(status)}
        </p>
      }
      style={{ width: 300 }}
    >
      <p>Launch date: {launchDate}</p>
      <p>Landing date: {landingDate}</p>
      <Button>
        <StyledLink to={`/${name.toLowerCase()}`}>View photos &rarr;</StyledLink>
      </Button>
    </Card>
  </StyledColumn>
);
