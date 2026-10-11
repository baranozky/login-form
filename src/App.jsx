
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Success from './components/Success';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="container mt-5">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/success" component={Success} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
