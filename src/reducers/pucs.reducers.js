const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
   
    item:{
       id: 0,
       codigo: "",
       descripcion: "",
       nivel: 0,
       tipo: "Activo",
    },   
  };
  
export function pucs(state = initialState, action) {
    switch (action.type) {
      case "PUCS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "PUCS_ADD":
        return {
          ...state,
          data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            item: initialState.item
        };
      case "PUCS_ITEM":
          return {
            ...state,
            item: action.response
          };  
      case "PUCS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "PUCS_LISTA":
            return {
              ...state,
              data: action.response
            };                
      case "PUCS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "PUCS_RESET_DATA":
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
  