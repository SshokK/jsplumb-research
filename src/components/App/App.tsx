import React from 'react';
import './App.scss';
import jsPlumbToolkit from 'jsplumbtoolkit';
import { JsPlumbToolkitSurfaceComponent, ControlsComponent, DatasetComponent } from 'jsplumbtoolkit-react';

class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.toolkit = jsPlumbToolkit.newInstance();
    this.view = {};
    this.renderParams = {};
  }

  private toolkit: any;
  private view: any;
  private renderParams: any;
  private surfaceRef: any;

  private controlsRef = React.createRef();
  private datasetRef = React.createRef();

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <JsPlumbToolkitSurfaceComponent
          renderParams={this.renderParams}
          toolkit={this.toolkit}
          view={this.view}
          ref={(c: any) => this.surfaceRef = c.surface}/>
        <ControlsComponent ref={this.controlsRef}/>
        <DatasetComponent ref={this.datasetRef}/>
        <div className="miniview"/>
      </div>
    );
  }
}

export default App;
