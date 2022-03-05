import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginView from "../../pages/Security/LoginView"
function Post(){
return(
    <Switch>
        <Route path="/login/" component={LoginView}/>
    </Switch>
)    
}
export default Post;
