const initialState = {
    data: [],
    items: [],    
    artId: -1,
    pagina: 0,
    paginas: 0,
    total: 0,
    cantidadTotal:0,
    sumaTotal:0,
    modalView: false,
    modalViews: false,
    indicador:0,
    estado: 'pendiente',
    indicadorTotal:0,
    plan:[],
    nota:{},
    item:{
      id:'',      
      nro: '',
      fechaVenta:'',
      tipo:'contado',
      nroItems:'',
      total:0,
      observaciones:'',
      estado:false,
      usuarioId:0,
      clienteId:0,
      clients:'',
      nit:'',
      cliente:{
        id:'',
        nombres:''
      },
      usuario:{
        id:'',
        nombres:''
      }
    }    
  };
  
export function ventas(state = initialState, action) {
    switch (action.type) {
       case "VENTAS_INDICADOR":
        return {
          ...state,
          indicador: action.value,
          estado: action.estado,
          indicadorTotal: action.indicadorTotal
        };
       case "VENTAS_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
        case "VENTAS_VIEWS":
        return {
          ...state,
          modalViews: action.view
        };
       case "VENTAS_SET_ART":
        return {
          ...state,
          artId: action.id
        };  
     
      case "VENTAS_ADD":
        return {
          ...state,
          item: action.response.item,
          items: action.response.items,
          cantidadTotal: action.response.item.nroItems,
          sumaTotal: action.response.item.total          
        };
      case "VENTAS_ITEM":
          return {
            ...state,
            item: action.response.item,
            items: action.response.items,
            nota: action.response.nota,
            plan: action.response.plan,
            cantidadTotal: action.response.item.nroItems,
            sumaTotal: action.response.item.total
          };
      case "VENTAS_ITEM_VIEWS":
          return {
            ...state,
            item: initialState.item,
            modalView: false
          };
      case "VENTAS_ITEM_VIEW":
          return {
            ...state,
            item: action.response,
            modalView: true
          };          
      case "VENTAS_LISTA":
            return {
              ...state,
              data: action.response
            }; 
            

      case "VENTAS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            indicador: 0,
            estado:false,
            indicadorTotal: 0
          };            
      case "VENTAS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item,
          items: [],
          indicador: 0,
          estado:false,
          indicadorTotal: 0
         };
      case "VENTAS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0,
          indicador: 0,
          estado:false,
          indicadorTotal: 0
        };
      case "VENTAS_SET_ITEMS":
          return {
            ...state,
            items: action.values,
            cantidadTotal: action.cantidad,
            sumaTotal: action.suma
      };
      case "VENTAS_RESET_PAGOS":
          return {
            ...state,
            items: [],
            item: initialState.item,
            cantidadTotal: 0,
            sumaTotal: 0
      };
      case "VENTAS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };

      case "VENTAS_CODIGO_BARRAS":                                 
          let newItem = action.response
          newItem.cantidad = 1
          newItem.subTotal = action.response.valor 
          let iok = state.items.filter(item => item.articuloId === action.response.articuloId)                                                                       
          return {
            ...state,                                                        
            items: iok.length > 0 ? [...state.items]: [...state.items, newItem],
            cantidadTotal: iok.length > 0 ? state.cantidadTotal : state.cantidadTotal + 1,
            sumaTotal: iok.length > 0 ? state.sumaTotal : parseInt(state.sumaTotal) + parseInt(action.response.valor)
      };
      case "VENTAS_RESET_ITEMS":
        return {
          ...state,
          items: [],
          cantidadTotal: 0,
          sumaTotal: 0, 
          artId: -1
      }; 
      case "VENTAS_DIRECTAS":
          return {
            ...state,
            modalView: false,
            items:[],
            item: initialState.item,
            cantidadTotal:0,
            sumaTotal:0
      };       
      
      default:
        return state;
    }
  }
  
