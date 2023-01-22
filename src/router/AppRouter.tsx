import { Switch, Route } from 'react-router-dom';
import { HomePage } from '../pages/Home';
import { AddTicket } from '../pages/AddTicket'
import './style.scss';
import { SearchTickets } from '../pages/SearchTickets/SearchTickets';

export const AppRouter = () => {
    return (
        <>
          <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/ticket" exact component={AddTicket} />
              <Route path="/consult" exact component={SearchTickets} />
          </Switch>
        </>
      )
};