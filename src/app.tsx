import "./index.css";
import { Route, Router, Switch } from "wouter";
import { HomePage } from "./pages/home.page";
import { LevelPage } from "./pages/level.page";
import { LevelsSelectorPage } from "./pages/levels-selector.page";


export function App() {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/levels" component={LevelsSelectorPage} />
          <Route path="/level/:num" component={LevelPage} />
          
        </Switch>
      </div>
    </Router>
  );
}



export default App;
