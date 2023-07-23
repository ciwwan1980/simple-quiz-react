import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './component/Home';
import Quiz from './component/Quiz';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/quiz/:amount/:category/:difficulty/:type"
          render={(props) => (
            <Quiz
              amount={props.match.params.amount}
              category={props.match.params.category}
              difficulty={props.match.params.difficulty}
              type={props.match.params.type}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
