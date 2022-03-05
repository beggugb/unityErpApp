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
  
export function procesos(state = initialState, action) {
    switch (action.type) {
      case "PROCESOS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "PROCESOS_ADD":
        return {
          ...state,
          data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            item: initialState.item
        };
      case "PROCESOS_ITEM":
          return {
            ...state,
            item: action.response
          };  
      case "PROCESOS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "PROCESOS_LISTA":
            return {
              ...state,
              data: action.response
            };                
      case "PROCESOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "PROCESOS_RESET_DATA":
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
  