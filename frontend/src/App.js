
import './App.css';
import AddItemForm from './form'
import { Provider } from "react-redux";
import { store } from './redux/store';
import {MainFile} from './mainFile'
import LoginForm from './loginForm'

function App() {
  const token = localStorage.getItem("token")
  return (
    <div className="App">
      <Provider store={store}>
        {token?
      <MainFile/>:<LoginForm/>}
      </Provider>
      
    </div>
  );
}

export default App;
