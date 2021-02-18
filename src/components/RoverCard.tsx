import { Button, Card, Col } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Rover, roverStatus } from '../api/entities/Rover';
import { shadowPopIn, shadowPopOut } from '../styled/animation';

const StyledColumn = styled(Col)`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: #fff;
`;

const Header = styled.p`
  font-size: 20px;
`;

const StyledCard = styled(Card)`
  border-radius: 3px;
  background: red;
  border: none;
  background: linear-gradient(to left, #fc5c7d, #6a82fb);
  width: 350px;

  * {
    border: none;
  }

  *:not(button) {
    color: #fff;
  }

  animation: ${shadowPopOut} 0.3s cubic-bezier(0.47, 0, 0.745, 0.715) both;

  &:hover {
    animation: ${shadowPopIn} 0.3s cubic-bezier(0.47, 0, 0.745, 0.715) both;
  }
`;

const getEmojiByStatus = (status: roverStatus) => (status === 'active' ? '⏳' : '✅');

type RoverCardProps = Rover;

export const RoverCard: FC<RoverCardProps> = ({ name, status, launchDate, landingDate }) => (
  <StyledColumn span={8}>
    <StyledCard
      hoverable
      title={
        <Header>
          {name} is {status} {getEmojiByStatus(status)}
        </Header>
      }
    >
      <p>Launch date: {launchDate}</p>
      <p>Landing date: {landingDate}</p>
      <Button>
        <StyledLink to={`/${name.toLowerCase()}`}>View photos &rarr;</StyledLink>
      </Button>
    </StyledCard>
  </StyledColumn>
);
