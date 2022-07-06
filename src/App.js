import './App.css';
import Home from './Home'
import Header from './Header'
import Footer from './Footer'
import SearchPage from './SearchPage'
import AddHouse from './AddHouse/AddHouse'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Conexion from './Conexion'
function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/addHouse">
            <AddHouse />
          </Route>
          <Route path="/conexion">
            <Conexion />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        
        <Footer />
      </ Router>

    </div>
  );
}

export default App;
