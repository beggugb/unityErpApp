import React from 'react';
import "./assets/css/erp.css";
import { Router , Route, Switch, Redirect } from 'react-router-dom'
import AdminLayout from './layout/Admin/Admin.jsx'
import PostLayout from './layout/Post/Post.jsx'
import { Provider } from "react-redux";
import { store, history } from "./helpers";
import { PrivateRoute } from "./PrivateRoute";
import ReduxToastr from 'react-redux-toastr'

import './assets/css/core/main.css';
import './assets/css/daygrid/main.css';
import './assets/css/timegrid/main.css'
/*import "../node_modules/react-redux-notify/dist/ReactReduxNotify.css";*/
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import "react-datepicker/dist/react-datepicker.css";


function App() {
  
  return (    
      <Provider store={store}>  
       <ReduxToastr
        timeOut={1100}
        newestOnTop={false}
        preventDuplicates
        progressBar={true}
        position="top-center"
        getState={(state) => state.toastr} // This is the default
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick/>   
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) => <PostLayout {...props} />}
            />              
            <Route
              exact
              path="/"
              render={() => <Redirect to="/admin/dashboard" />}
            />
            <Route
              exact
              path="/admin"
              render={() => <Redirect to="/admin/dashboard" />}
            />          
            <PrivateRoute path="/admin" component={AdminLayout} />
            
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
