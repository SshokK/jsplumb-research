import React, {ReactElement, Ref, RefObject} from 'react';
import { DragPointComponent } from 'Components/ConfigTool/Task/DragPoint/DragPoint.d.ts';
import './DragPoint.scss';

class DragPoint extends React.Component<DragPointComponent> {
  dotRef: RefObject<HTMLDivElement> = React.createRef();
  state = {
    isEventsPopupVisible: false
  }

  componentDidMount = (): void => {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount = (): void => {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (e: Event): void => {
    if (this.dotRef && this.dotRef.current && !this.dotRef.current.contains(e.target as Node)) {
      this.setState({
        isEventsPopupVisible: false
      });
    }
  }

  handleEventClick = (e: any): void => {
  }

  renderEventsPopup = (): ReactElement => {
    return (
      <div className={'task__events_popup__container'}>
        <p className={'task__events_popup__header'}>Events: Exists</p>
        <ul className={'task__events_popup__events_list'}>
          <li onClick={this.handleEventClick}>
            Event A
          </li>
          <li>
            Event B
          </li>
          <li>
            Event C
          </li>
        </ul>
      </div>
    );
  }

  handleDotClick = (): void => {
    this.setState({
      isEventsPopupVisible: true
    });
  };

  render() {
    const { position, dotClassName } = this.props;
    const { isEventsPopupVisible } = this.state;

    const dotClassNames = `
      task__drag_point
      ${isEventsPopupVisible ? 'active' : ''} 
      ${dotClassName}
    `

    return (
      <div className={`task__drag_point__aligner_${position}`}>
        <div ref={this.dotRef}  className={dotClassNames} onClick={this.handleDotClick}>
          {isEventsPopupVisible && this.renderEventsPopup()}
        </div>
      </div>
    );
  }
}

export default DragPoint;
