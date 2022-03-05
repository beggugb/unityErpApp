const initialState = {     
    loading: false,
    data:[]
   } 
  
  export function usuarios(state = initialState, action) {
    switch (action.type) {   
      case 'USUARIOS_LISTA':
        return {
        ...state,
        data: action.response
      };          
      case 'SET_LOADING':
        return {        
          ...state, 
            loading: action.state
        };
      case 'LOGIN_SUCCESS':
        return {        
          ...state, 
            loggingIn: true,            
        };        
      case 'LOGIN_USER':
        return {           
            ...state
        };
      case 'LOGIN_LOGOUT':
        return {           
            
        };                                          
      default:
        return state
    }
  }
  
  