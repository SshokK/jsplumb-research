import React from 'react';
import './ConfigTool.scss';

import { JsPlumbToolkitSurfaceComponent }  from 'jsplumbtoolkit-react';
import { jsPlumbToolkit, Surface, SurfaceRenderParams } from 'jsplumbtoolkit';
import TasksMenu from 'Components/ConfigTool/TasksMenu/TasksMenu';

import Task from 'Components/ConfigTool/Task/Task';
import { jsPlumbToolkitEditableConnectors } from 'jsplumbtoolkit-editable-connectors';

import data from '~/static/copyright.json';
import { render } from 'react-dom';
import ZoomButtons from 'Components/ConfigTool/ZoomButtons/ZoomButtons';
import { Maybe, MaybeDOMElement } from 'utils';
import ProcessesMenu from 'Components/ConfigTool/ProcessesMenu/ProcessesMenu';
import { Provider } from 'react-redux';
import store from '~/ts/store';

const RENDER_OPTIONS = {
  layout: {
    type: 'Absolute'
  },
  zoomToFit: true,
  consumeRightClick: false
};

const DELETE_BUTTON_KEY_CODE = 46;

const renderConfigToolTasksMenu = (surface: Surface, nodeContainer: MaybeDOMElement): void => {
  if (nodeContainer) {
    render(
      <TasksMenu
        surface={surface}
        container={nodeContainer}
      />,
      nodeContainer
    );
  }
};

const renderZoomButtons = (surface: Surface, nodeContainer: MaybeDOMElement): void => {
  if (nodeContainer) {
    render(
      <ZoomButtons
        surface={surface}
      />,
      nodeContainer
    );
  }
};

const renderProcessesMenu = (surface: Surface, toolkit: jsPlumbToolkit, nodeContainer: MaybeDOMElement): void => {
  if (nodeContainer) {
    render(
      <ProcessesMenu
        surface={surface}
        toolkit={toolkit}
      />,
      nodeContainer
    );
  }
};

class ConfigTool extends React.Component {
  private readonly toolkit: jsPlumbToolkit;
  private readonly view: any;
  private readonly renderParams: SurfaceRenderParams;
  private surface: Maybe<Surface>;
  public state: any

  constructor(props: any) {
    super(props);
    this.toolkit = jsPlumbToolkit.newInstance({});

    this.state = {
      selectedTasks: []
    };

    this.view = {
      nodes: {
        'task': {
          component: Task,
          events: {
            'click': (params: any) => {
              this.handleTaskClick(params.node)
            }
          }
        }
      },
      edges: {
        'default': {
          anchor: 'Continuous',
          endpoint: 'Blank',
          cornerRadius: 5,
          connector: [ 'Flowchart', { cssClass: 'connector', hoverClass: 'connector_hover' }],
          overlays: [
            [ 'Arrow', { location: 1, width: 6, length: 3, foldback: 0.1 }]
          ],
          events: {
            'click': (params: any) => {
              if (this.surface) {

              }
            }
          }
        }
      },
      ports: {
        'source': {
          maxConnections: -1,
          edgeType: 'default',
          isSource: true
        },
        'target': {
          maxConnections: -1,
          edgeType: 'default',
          isSource: true
        }
      }
    };
    this.renderParams = RENDER_OPTIONS;
  }

  componentDidMount = (): void => {
    // Wrap into timeout to prevent rendering on empty dom (react issue)
    setTimeout(() => {
      jsPlumbToolkitEditableConnectors.init();
      this.toolkit.load({ data });

      const taskMenuContainer = document.querySelector('.config_tool__tasks_menu');
      const zoomButtonsContainer = document.querySelector('.config_tool__zoom_buttons');
      const processesMenuContainer = document.querySelector('.config_tool__processes_menu');

      if (this.surface) {
        renderConfigToolTasksMenu(this.surface, taskMenuContainer);
        renderZoomButtons(this.surface, zoomButtonsContainer);
        renderProcessesMenu(this.surface, this.toolkit, processesMenuContainer);
      }

      document.addEventListener('keyup', this.handleDocumentKeyUp);
    });
  }

  handleTaskClick = (task: any) => {
    const { selectedTasks } = this.state;

    const isTaskSelected = !!selectedTasks.find((stateTask: any) => stateTask.id === task.id);

    if (!isTaskSelected) {
      this.setState({
        selectedTasks: [...selectedTasks, task]
      });
    } else {
      this.setState({
        selectedTasks: selectedTasks.filter((stateTask: any) => stateTask.id !== task.id)
      });
    }
  }

  handleDocumentKeyUp = (e: any) => {
    if (e.keyCode === DELETE_BUTTON_KEY_CODE) {
      this.deleteSelectedTasks();
    }
  }

  deleteSelectedTasks = () => {
    try {
      const { selectedTasks } = this.state;

      console.log(selectedTasks)

      this.setState({
        selectedTasks: []
      }, () => {
        const filteredTasks = this.getSelectedTasks(selectedTasks);
        this.toolkit.remove(filteredTasks);
      });
    } catch (e) {

    }

  }

  getSelectedTasks = (selectedTasks: any) => {
    return this.toolkit.filter((obj: any) => (
      obj.objectType === 'Node' && !!selectedTasks.find((task: any) => task.data.id === obj.data.id)
    ));
  }

  setSurface = (c: any): void => this.surface = c.surface;

  render() {
    return (
      <div className={'config_tool__container'}>
        <div className={'config_tool__left_panel'}>
          <div className={'config_tool__tasks_menu'}/>
          <div className={'config_tool__zoom_buttons'}/>
        </div>
        <div className={'config_tool__top_panel'}>
          <div className={'config_tool__processes_menu'}/>
        </div>
        <JsPlumbToolkitSurfaceComponent
          renderParams={this.renderParams}
          toolkit={this.toolkit}
          view={this.view}
          ref={this.setSurface}
        />
      </div>
    );
  }
}

export default ConfigTool;
