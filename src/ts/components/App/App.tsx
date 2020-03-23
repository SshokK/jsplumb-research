import React from 'react';
import './App.scss';
import ConfigTool from 'Components/ConfigTool/ConfigTool';
import Header from 'Components/Header/Header';

class App extends React.Component {
  render() {
    return (
      <div className={'app__container'}>
        <div className={'app__inner_content'}>
          <Header/>
          <div className={'app__config_tool_wrapper'}>
            <ConfigTool />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
