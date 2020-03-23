import React from 'react';
import './ZoomButtons.scss';

const ZOOM_INCREMENT = 0.1

class ZoomButtons extends React.Component<any> {
  handleZoomButtonClick = (shouldIncrease: boolean): void => {
    const { surface } = this.props
    const currentZoom: number = surface.getZoom()
    surface.setZoom(shouldIncrease ? currentZoom + ZOOM_INCREMENT : currentZoom - ZOOM_INCREMENT);
  }

  render() {
    return (
      <div className={'zoom_buttons__container'}>
        <button className={'zoom_buttons__button'} onClick={() => this.handleZoomButtonClick(true)}>
          +
        </button>
        <button className={'zoom_buttons__button'} onClick={() => this.handleZoomButtonClick(false)}>
          -
        </button>
      </div>
    );
  }
}

export default ZoomButtons
