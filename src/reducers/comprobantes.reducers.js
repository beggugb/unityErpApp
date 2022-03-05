const initialState = {
  data: [],
  pagina: 0,
  paginas: 0,
  total: 0,   
  modalView: false,
  indicador:0,
  estado: 'pendiente',
  indicadorTotal:0,
  items:[],  
  item:{
    id:'',  
    fechaComprobante: '',
    tipoComprobante: 'ingreso',
    estado: 'pendiente',
    label: '',
    numComprobante: '',
    glosaComprobante: '',
    montoImpuesto: 0,
    montoSubtotal: 0,
    montoTotal: 0,
    gestion: '2021-01-01',
    tdc: 6.90,
    tDebe: 0,
    tHaber: 0
  }   
};

export function comprobantes(state = initialState, action) {
  switch (action.type) {   
    case "COMPROBANTES_INDICADOR":
        return {
          ...state,
          indicador: action.value,
          estado: action.estado,
          indicadorTotal: action.indicadorTotal
        }; 
    case "COMPROBANTES_PLAN_RESET":
      return {
        ...state,
        plan: []
    };
    case "COMPROBANTES_PLAN":
      return {
        ...state,
        plan: action.values
      };
     case "COMPROBANTES_VIEW":
      return {
        ...state,
        modalView: action.view
      }; 
      case "COMPROBANTES_ITEM":
        return {
          ...state,
          item: action.response.item,            
          cantidadTotal: action.response.item.nroItems,
          sumaTotal: action.response.item.total,                    
          items: action.response.items

      };  
      case "COMPROBANTES_DATA":
        return {
          ...state,
          data: action.response.data,
          pagina: action.response.pagina,
          paginas: action.response.paginas,
          total: action.response.total
      }; 
      case "COMPROBANTES_CHANGE":
        return {          
        ...state,
        item:
        {...state.item,
          [action.props]: action.value
        }
      };
    case "COMPROBANTES_ADD":
      return {
        ...state,
        item: action.response,
        items: action.response.items,
        cantidadTotal: action.response.item.nroItems,
        sumaTotal: action.response.item.total 
      };       
    case "COMPROBANTES_RESET_ITEM":
      return {
        ...state,
        item: initialState.item,
        indicador: 0,
        estado:false,
        indicadorTotal: 0,
        tDebe:0,
        tHaber:0
      };
    case "COMPROBANTES_RESET":
      return {
        ...state,
        item: initialState.item,
        data: [],
        pagina: 0,
        paginas: 0,
        total: 0,
        indicador: 0,
        estado:false,
        indicadorTotal: 0,
        tDebe:0,
        tHaber:0
      };
      case "COMPROBANTES_ITEM_VIEWS":
          return {
            ...state,
            item: initialState.item,
            modalView: false
          };
      case "COMPROBANTES_ITEM_VIEW":
          return {
            ...state,
            item: action.response,
            modalView: true
          };          
      case "COMPROBANTES_LISTA":
            return {
              ...state,
              data: action.response
            };     

    case "COMPROBANTES_RESET_DATA":
        return {
          ...state,            
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0,
          indicador: 0,
          estado:false,
          indicadorTotal: 0
        };  
        
    case "COMPROBANTES_SET_ITEMS":
          return {
            ...state,
            items: action.values
      };
    case "COMPROBANTES_RESET_ITEMS":
        return {
          ...state,
          items: [],
          item: initialState.item
      }; 
    case "COMPROBANTES_RESIT":
        return {
          ...state,
          items: []
        }; 
    case "COMPROBANTES_SET_ITEM":
          return {
            ...state,
          item: action.item
       };      
      
    default:
      return state;
  }
}
