import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/home";
import Pokemon from "./components/pokemon";
import { Provider } from "react-redux";
import generateStore from "./redux/store";

function App() {
  const store = generateStore();
  return (
    <div className="App Container">
      <Provider store={store}>
        <Router>
          <Switch>  
            <Route exact path="/pokemon">
              <Pokemon />
            </Route>
            <Route path="/">
              <Home />
            </Route>

          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
