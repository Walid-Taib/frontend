import './App.css';
import React ,{Component} from 'react';
import MainComponent from './components/MainComponent';

import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <BrowserRouter>
        <div className='App'>
        <MainComponent/>

        </div>
      </BrowserRouter>

    );
  }
}

export default App;
