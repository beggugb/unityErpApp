const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    item:{
      id:'',
      nombre:'',
      direccion:'',
      web:'',
      email:'',
      filename:'',
      nit:''
    },   
  };
  
export function empresas(state = initialState, action) {
    switch (action.type) {
      case "EMPRESAS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "EMPRESAS_ADD":
        return {
          ...state,
          data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            item: initialState.item
        };
      case "EMPRESAS_ITEM":
          return {
            ...state,
            item: action.response
          };  
      case "EMPRESAS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "EMPRESAS_LISTA":
            return {
              ...state,
              data: action.response
            };                
      case "EMPRESAS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "EMPRESAS_RESET_DATA":
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
  