import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import MovieDetails from './MovieDetails';
import NotFound from './404';
import Home from './Home';
import NavBar from './NavBar';
import Contact from './Contact';

/**
 * App component hosts the routing for the app.
 */
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/movies/:id">
            <MovieDetails />
          </Route>
          <Route exact path="/search">
            <Home />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Contact />
      </BrowserRouter>
    </div>
  );
}

export default App;
