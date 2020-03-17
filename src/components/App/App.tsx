import React from 'react';
import './App.scss';
import jsPlumbToolkit from "jsplumbtoolkit";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toolkit = jsPlumbToolkit.newInstance();

    this.view = {
      ...
    }

    this.renderParams = {
      ...
    }
  }

  render() {
    return <div style={{width:"100%",height:"100%"}}>
      <JsPlumbToolkitSurfaceComponent renderParams={this.renderParams} toolkit={this.toolkit} view={this.view} ref={ (c) => this.surface = c.surface }/>
      <ControlsComponent ref={(c) => this.controls = c }/>
      <DatasetComponent ref={(d) => this.dataset = d }/>
      <div className="miniview"/>
    </div>
  }

}

export default App;
