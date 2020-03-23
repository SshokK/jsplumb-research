import Palette from 'Components/ConfigTool/TasksMenu/Palette/Palette';
import './TasksMenu.scss';
import React from 'react';
import { ConfigToolTasksMenu } from 'Components/ConfigTool/TasksMenu/TasksMenu.d.ts';

class TasksMenu extends React.Component<ConfigToolTasksMenu> {
  dataGenerator = (el: Element) => {
    const taskType = el.getAttribute('data-node-taskType');
    const nodeType = el.getAttribute('data-node-type');

    return {
      id: `${Math.random()}`,
      type: nodeType,
      taskType: taskType,
      text: 'Task',
      w: 120,
      h: 120
    };
  }

  typeGenerator = (nodeType: string) => {
    console.log(nodeType);
  }

  render() {
    const { surface, container } = this.props;

    return (
      <div className={'task_menu__container'}>
        <p className={'task_menu__caption'}>Tasks</p>
        <Palette
          allowDropOnCanvas
          allowDropOnEdge
          allowDropOnGroup
          surface={surface}
          selector={'div'}
          dataGenerator={this.dataGenerator}
          container={container}
          groupIdentifier={() => false}
          typeGenerator={this.typeGenerator}/>
      </div>
    );
  }
}

export default TasksMenu;
