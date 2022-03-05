const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,    
    modalView: false,
    item:{
      id:'',
      estado: false,
      montoInicial:0,
      montoEgreso:0,
      montoIngreso:0,
      montoFinal:0,
      fechaCierre:'',
      usuarioId:0,
      usuario:{
        id:'',
        nombres:''
      }
    },
    items:[],
    indicador:0,
    estado: false    
  };
  
export function cajas(state = initialState, action) {
    switch (action.type) {
      case "CAJAS_INDICADOR":
      return {
        ...state,
        indicador: action.value,
        estado: action.estado
      };
      case "CAJAS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "CAJAS_RESUMEN":
        return {
          ...state,
          item: action.response.item,
          items: action.response.items
      }; 
    
      case "CAJAS_ADD":
        return {
          ...state,
          item: action.response.caja
        };
      case "CAJAS_VIEW":
        return {
          ...state,
          modalView: action.view
        };  
      case "CAJAS_ITEM":
        return {
          ...state,
          item: action.response

        };      
      case "CAJAS_DATA":
          return {
            ...state,            
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };            
      case "CAJAS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0,
          indicador: 0,
          estado:false
        };
      case "CAJAS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item,
          indicador: 0,
          estado:false,
        };  
      case "RESET_CAJA":
        return {
          ...state,
          item: initialState.item,
          indicador: 0,
          estado:false,
        };  
      default:
        return state;
    }
  }
  