const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    item:{
      id:'',
      nombre:''
    },   
  };
  
export function almacenes(state = initialState, action) {
    switch (action.type) {
      case "ALMACENES_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "ALMACENES_ADD":
        return {
          ...state,
          data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            item: initialState.item
        };
      case "ALMACENES_ITEM":
          return {
            ...state,
            item: action.response
          };  
      case "ALMACENES_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "ALMACENES_LISTA":
            return {
              ...state,
              data: action.response
            };                
      case "ALMACENES_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "ALMACENES_RESET_DATA":
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
  