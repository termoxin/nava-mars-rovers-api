import { notification } from 'antd';

import { ArgsProps, IconType } from 'antd/lib/notification';

export const openNotificationWithIcon = (type: IconType, args: ArgsProps): void =>
  notification[type](args);
