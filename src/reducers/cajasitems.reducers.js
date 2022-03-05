const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,    
    modalView: false,
    item:{
      id:'',
      monto: 0,
      tipo:"ingreso",
      label:"",
      estado:true,
      cajaId:0
    }    
  };
  
export function cajasitems(state = initialState, action) {
    switch (action.type) {
      case "CAJAS_ITEMS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "CAJAS_ITEMS_ADD":
        return {
          ...state,
          item: action.response.caja
        }; 
      case "CAJAS_ITEMS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item
        };        
       case "CAJAS_ITEMS_VIEW":
        return {
          ...state,
          modalView: action.view
        };  
      case "CAJAS_ITEMS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "CAJAS_ITEMS_DATAS":
          return {
            ...state,
            data: action.response
          };                
      case "CAJAS_ITEMS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };        
      case "RESET_CAJA":
        return {
          ...state,
          item: initialState.item
        };  
      default:
        return state;
    }
  }
  