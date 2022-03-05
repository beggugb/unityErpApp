const initialState = {
  data: [],
  pagina: 0,
  paginas: 0,
  total: 0,
  modalView: false,
  item:{      
    id:'',
    nombre:'',
    codigo:''           
  }    
};

export function categorias(state = initialState, action) {
  switch (action.type) {
     case "CATEGORIAS_VIEW":
      return {
        ...state,
        modalView: action.view
      }; 
      case "CATEGORIAS_LISTA":
        return {
        ...state,
        data: action.response
      };
      case "CATEGORIAS_ITEM":
        return {
          ...state,
          item: action.response
      };  
      case "CATEGORIAS_DATA":
        return {
          ...state,
          data: action.response.data,
          pagina: action.response.pagina,
          paginas: action.response.paginas,
          total: action.response.total,
          item: initialState.item
      }; 
      case "CATEGORIAS_CHANGE":
        return {          
        ...state,
        item:
        {...state.item,
          [action.props]: action.value
        }
      };
    case "CATEGORIAS_ADD":
      return {
        ...state,
        item: action.response
      };       
    case "CATEGORIAS_RESET_ITEM":
      return {
        ...state,
        item: initialState.item
      };
    case "CATEGORIAS_RESET":
      return {
        ...state,
        item: initialState.item,
        data: [],
        pagina: 0,
        paginas: 0,
        total: 0
      };  

    case "CATEGORIAS_RESET_DATA":
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
