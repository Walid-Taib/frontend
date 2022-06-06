import './App.css';
import React ,{Component} from 'react';
import MainComponent from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { BrowserRouter } from 'react-router-dom';

const store =ConfigureStore();

class App extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
        <MainComponent/>

        </div>
      </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
