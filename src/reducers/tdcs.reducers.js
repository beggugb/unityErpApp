const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
   
    item:{
       id: 0,
       monto: 0,
       gestion: 0,
       fechaRegistro: ""
    },   
  };
  
export function tdcs(state = initialState, action) {
    switch (action.type) {
      case "TDCS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "TDCS_ADD":
        return {
          ...state,
          data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            item: initialState.item
        };
      case "TDCS_ITEM":
          return {
            ...state,
            item: action.response
          };  
      case "TDCS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "TDCS_LISTA":
            return {
              ...state,
              data: action.response
            };                
      case "TDCS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "TDCS_RESET_DATA":
          return {
            ...state,
            data: [],
            pagina: 0,
            paginas: 0,
            total: 0
        };  
      default:
        return state;
    }
  }
  