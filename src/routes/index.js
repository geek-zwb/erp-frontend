/**
 * @file
 * @author Created by geekzwb on 2017/10/13.
 */
import React from 'react';
import { Switch } from 'react-router-dom';

//  components
import routes from './routes';
import PrivateRoute from './Private';
import PublicRoute from './Public';


const Routes = () => (
    <Switch>
      {routes.map((route, i) => {
        if (route.auth) {
          return <PrivateRoute key={i} {...route} />
        }
        return <PublicRoute key={i} {...route} />
      })}
    </Switch>
);

export default Routes;