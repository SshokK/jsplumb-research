import React, { ReactElement, RefObject, ChangeEvent } from 'react';
import Icon from 'Components/ConfigTool/Icon/Icon';
import DragPoint from './DragPoint/DragPoint';
import './Task.scss';
import BaseEditableComponent from 'Components/ConfigTool/BaseEditableNode/BaseEditableNode';

const DRAG_DOT_CLASSNAME = 'drag_dot';

class Task extends BaseEditableComponent {
  private editableCaptionRef: RefObject<HTMLTextAreaElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      isMouseOverTask: false,
      isCaptionEditModeEnabled: false,
      isTaskSelected: false,
      caption: props.data.text
    };
    this.editableCaptionRef = React.createRef();
  }

  componentDidMount(): void {
    document.addEventListener('click', this.handleClickOutsideEditableCaption);
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.handleClickOutsideEditableCaption);
  }

  handleClickOutsideEditableCaption = (e: Event): void => {
    if (this.editableCaptionRef && this.editableCaptionRef.current && !this.editableCaptionRef.current.contains(e.target as Node)) {
      this.setState({
        isCaptionEditModeEnabled: false
      });
    }
  };

  handleTaskClick = (e: any): void => {
    this.setState({
      isTaskSelected: !this.state.isTaskSelected
    });
  };

  handleMouseEnter = (): void => {
    this.setState({
      isMouseOverTask: true
    });
  };

  handleMouseLeave = (): void => {
    this.setState({
      isMouseOverTask: false
    });
  };

  handleCaptionDoubleClick = (): void => {
    this.setState({
      isCaptionEditModeEnabled: true
    });
  };

  handleCaptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({
      caption: e.target.value
    });
  }

  renderDragPoints = () => {
    return (
      <>
        <DragPoint position={'top'} dotClassName={DRAG_DOT_CLASSNAME}/>
        <DragPoint position={'right'} dotClassName={DRAG_DOT_CLASSNAME}/>
        <DragPoint position={'bottom'} dotClassName={DRAG_DOT_CLASSNAME}/>
        <DragPoint position={'left'} dotClassName={DRAG_DOT_CLASSNAME}/>
      </>
    );
  };

  renderPorts = (): ReactElement => {
    return (
      <>
        {/*
          // @ts-ignore */}
        <jtk-target port-type='target' filter={`.${DRAG_DOT_CLASSNAME}`}/>
        {/*
          // @ts-ignore */}
        <jtk-source port-type='source' filter={`.${DRAG_DOT_CLASSNAME}`}/>
      </>
    );
  };

  renderCaption = (): ReactElement => {
    const { isCaptionEditModeEnabled, caption } = this.state;

    if (isCaptionEditModeEnabled) {
      return (
        <textarea
          ref={this.editableCaptionRef}
          autoFocus
          className={'task__caption_editable'}
          onChange={this.handleCaptionChange}
          value={caption}
        />
      );
    }

    return (
      <p
        onDoubleClick={this.handleCaptionDoubleClick}
        className={'task__caption'}
      >
        {caption}
      </p>
    );
  };

  render() {
    const { data } = this.props;
    const { isMouseOverTask, isTaskSelected } = this.state;

    console.log('render');

    return (
      <div
        onClick={this.handleTaskClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={`task__container${isTaskSelected ? '_selected' : ''}`}>
          <Icon type={data.taskType} />
          {this.renderCaption()}
          {isMouseOverTask && this.renderDragPoints()}
          {this.renderPorts()}
        </div>
      </div>
    );
  }
}

export default Task;
