import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TraineeList, TraineeDetail } from '.';


const Trainee = () => (
  <>
    <Switch>
      <Route exact path="/trainee" component={TraineeList} />
      <Route path="/trainee/:id" component={TraineeDetail} />
    </Switch>
  </>
);

export default Trainee;
