import { Switch, Route } from 'react-router-dom';
import { HomePage } from '../pages/Home';
import { AddTicket } from '../pages/AddTicket'
import './style.scss';

export const AppRouter = () => {
    return (
        <>
          <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/ticket" exact component={AddTicket} />
          </Switch>
        </>
      )
};