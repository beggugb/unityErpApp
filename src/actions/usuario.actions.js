import { usuarioService } from "../services";
import { history } from "../helpers";
import { toastr } from "react-redux-toastr";


export const usuarioActions = {  
  login,
  logout
};
/*---------------------------------------------------------------*/
function login(user) {
  return (dispatch) => {    
    usuarioService
      .login(user)
      .then((response) => {                    
        if(response.user.usuario){          
          dispatch({type:'LOGIN_SUCCESS'})          
          history.push("/admin");          
        }else{          
          toastr.error('Error', response.user.message)
        }              
      })
      .catch((err) => {          
        toastr.error('Error', err)
      });
  };
}

function logout() {    
  return (dispatch) => {
    usuarioService.logout();
    dispatch({type:'LOGIN_LOGOUT'})
    history.push("/admin");
  };
}



/*---------------------------------------------------------------*/
