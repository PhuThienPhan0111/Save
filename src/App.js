import logo from './logo.svg';
import './App.css';
import {Orders} from './components/Orders';
import {Customers} from './components/Customers';
import {Shop} from './components/Shop';
import {Products} from './components/Products';
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import { Navigation } from './components/Navigation';

function App() {
  return (
    <Router>
      <div className='container'>
      <Navigation />
      <Switch>
            <Route path="/" component={Orders} exact/>
            <Route path="/customers" component={Customers}/>
            <Route path="/shop"><Shop /></Route>
            <Route path="/products"><Products/></Route>
        </Switch>
      </div>     
    </Router>
  );
}

export default App;
