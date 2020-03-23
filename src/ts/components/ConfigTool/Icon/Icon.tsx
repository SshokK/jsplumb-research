import React, { ReactElement } from 'react';
import './Icon.scss';
import ManualTaskIcon from 'Icons/manual.svg';
import ApiTaskIcon from 'Icons/api.svg';
import NotificationTaskIcon from 'Icons/date-range.svg';
import SmsTaskIcon from 'Icons/mail.svg';
import { IconComponent, IconsList } from 'Components/ConfigTool/Icon/Icon.d.ts';

const ICONS: IconsList = {
  manual: <ManualTaskIcon/>,
  notification: <NotificationTaskIcon/>,
  api: <ApiTaskIcon/>,
  sms: <SmsTaskIcon/>
};


class Icon extends React.Component<IconComponent> {
  render() {
    const { type } = this.props;

    const icon: ReactElement = ICONS[type];

    if (ICONS[type]) {
      return (
        <span className={`task_icon ${type}`}  >
          {icon}
        </span>
      );
    }

    return null;
  }
}

export default Icon;
