import { PageHeader, Spin, Descriptions } from 'antd';
import { FC, memo } from 'react';
import { useHistory } from 'react-router-dom';

import { Rover } from '../api/entities/Rover';

interface PageHeaderProps {
  extra: JSX.Element[];
  rover?: Rover;
}

export const RoverPageHeader: FC<PageHeaderProps> = memo(({ extra, rover }) => {
  const { push } = useHistory();

  return (
    <PageHeader
      ghost={false}
      onBack={() => push('/')}
      title={rover?.name || <Spin />}
      extra={extra}
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label="Launched">
          {rover?.launchDate || <Spin size="small" />}
        </Descriptions.Item>
        <Descriptions.Item label="Landed">
          {rover?.landingDate || <Spin size="small" />}
        </Descriptions.Item>
        <Descriptions.Item label="Total photos">
          {rover?.totalPhotos || <Spin size="small" />}
        </Descriptions.Item>
        <Descriptions.Item label="Max sol">
          {rover?.maxSol || <Spin size="small" />}
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  );
});

RoverPageHeader.displayName = 'RoverPageHeader';
