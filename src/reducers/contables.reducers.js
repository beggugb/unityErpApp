const initialState = {
    diarios:[],
    mayores:[],
    saldos:[],    
    debitoCierre: 0,
    creditoCierre: 0,
    cuenta: {
      codigo: "",
      descripcion: "",
      nivel: 0,
      tipo: ""
    },
    sumaCredito:0,
    sumaDebito: 0,
    totalAcreedor:0,
    totalDeudor:0,
    totalCreditos:0,
    totalDebitos:0,
  };
  
export function contables(state = initialState, action) {
    switch (action.type) {     
      case "CONTABLES_DIARIOS":
        return {          
          ...state,
          diarios: action.response.result,
          sumaDebito: action.response.sumaDebito,
          sumaCredito:action.response.sumaCredito

        };
      case "CONTABLES_MAYORES":
            return {          
              ...state,
         mayores: action.response.detalle,
         debitoCierre: action.response.debitoCierre,
         creditoCierre: action.response.creditoCierre,
         cuenta: action.response.result,
         sumaCredito:action.response.sumaCredito,
         sumaDebito: action.response.sumaDebito
      };  
      case "CONTABLES_SALDOS":
        return {          
          ...state,
          saldos: action.response.result2,
          totalAcreedor:action.response.result.totalAcreedor,
          totalDeudor:action.response.result.totalDeudor,
          totalCreditos: action.response.result.totalCreditos,
          totalDebitos: action.response.result.totalDebitos

      };
     case "CONTABLES_RESET":
        return {
          ...state,
          diarios:[],
          mayores:[],
          saldos:[]
        };          
        
      default:
        return state;
    }
  }
  