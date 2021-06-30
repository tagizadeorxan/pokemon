import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './components/home'
import Pokemon from './components/pokemon'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route component={Pokemon} exact path="/:id" />
      </Router>
    </div>
  );
}

export default App;
