import "./index.css";
import { Route, Router, Switch } from "wouter";
import { HomePage } from "./pages/home.page";
import { LevelPage } from "./pages/level.page";
import { LevelsSelectorPage } from "./pages/levels-selector.page";
import { useGlobalState } from "./state/global.state";
import { useEffect } from "react";

declare global {
  interface Window {
    toggleDebugMode: () => void;
  }
}

export function App() {
  const toggleDebugMode = useGlobalState(s => s.toggleDebugMode);
  
  useEffect(() => {
    window.toggleDebugMode = toggleDebugMode;
  }, [toggleDebugMode])
  
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/levels" component={LevelsSelectorPage} />
          <Route path="/level/:num" component={LevelPage} />
          <Route>404: No such page!</Route>
        </Switch>
      </div>
    </Router>
  );
}



export default App;
