import React, { ReactElement } from 'react';
import { SurfaceDropComponent } from 'jsplumbtoolkit-react-drop';
import Icon from 'Components/ConfigTool/Icon/Icon';
import { TaskType, TaskTypes } from 'Components/ConfigTool/TasksMenu/Palette/Palette.d.ts';
import './Palette.scss';

const taskTypes: TaskTypes = [
  {
    type: 'manual',
    label: 'Manual'
  },
  {
    type: 'notification',
    label: 'Notification'
  },
  {
    type: 'sms',
    label: 'SMS'
  },
  {
    type: 'api',
    label: 'API'
  }
];

class Palette extends SurfaceDropComponent {
  renderTasksPalette = (): Array<ReactElement> => {
    const tasks: Array<ReactElement> = [];

    taskTypes.forEach((taskType: TaskType, i: number) => {
      tasks.push(
        <div
          key={i}
          data-node-type='task'
          data-node-taskType={taskType.type}
          className='palette__item'
        >
          <Icon type={taskType.type}/>
          <p className={'palette__item__name'}>{taskType.label}</p>
        </div>
      );
    });

    return tasks;
  };

  render = () => {
    return this.renderTasksPalette();
  }
}

export default Palette;
