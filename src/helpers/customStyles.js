export const customStyles = {
  container: (provided) => ({
    ...provided,    
    height: 30,
    textAlign: 'left',
    border: 'none',    
    fontSize: '0.65rem',          
    width:90,
    padding: 0    
  }),
    control: (provider) => ({
      // none of react-select's styles are passed to <Control />
      ...provider,
      minHeight: 25,
      width: 85,
      border: '1px solid #c1c1c1',            
      height: 27,      
      margin: 0,
      padding: 0
    }),
    input: (provided) => ({
      ...provided,      
      color: '#4d4d4d',    
      borderRadius: '0.5rem',       
      width: 60,
      height:15
    }),
    singleValue: (provided) => ({
      ...provided,
      minHeight: '1px',
      paddingBottom: '0px',
      color: '#4d4d4d',
      fontSize: '0.65rem'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      height: '28px',
      width: '28px',
      paddingTop: '5px',
      paddingBottom: '0',
      color: '#4d4d4d'      
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      width:'1px'
    }),
    valueContainer: (provided) => ({
      ...provided,
      minHeight: '1px',
      height:'20px',
      paddingTop: '0',
      paddingBottom: '0',          
      color: '#000'
    }),
    
    clearIndicator: (provided) => ({
      ...provided,
      minHeight: '0.4px',
      color: '#c1c1c1',

    }),
  }

  export const customs = {
    container: (provided) => ({
      ...provided,    
      height: 30,
      textAlign: 'left',
      border: 'none',    
      fontSize: '0.65rem',          
      width:90,
      padding: 0
    }),
      control: (provider) => ({
        // none of react-select's styles are passed to <Control />
        ...provider,
        minHeight: 27,
        width: 100,
        border: '1px solid #c1c1c1',            
        height: 28,      
        margin: 0,
        padding: 0
      }),
      input: (provided) => ({
        ...provided,      
        color: '#4d4d4d',    
        borderRadius: '0.5rem',       
        width: 60,
        height:15
      }),
      singleValue: (provided) => ({
        ...provided,
        minHeight: '1px',
        paddingBottom: '0px',
        color: '#4d4d4d',
        fontSize: '0.65rem'
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        height: '28px',
        width: '28px',
        paddingTop: '5px',
        paddingBottom: '0',
        color: '#4d4d4d'      
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        width:'1px'
      }),
      valueContainer: (provided) => ({
        ...provided,
        minHeight: '1px',
        height:'20px',
        paddingTop: '0',
        paddingBottom: '0',          
        color: '#000'
      }),
      
      clearIndicator: (provided) => ({
        ...provided,
        minHeight: '0.4px',
        color: '#c1c1c1',
  
      }),
    }

    export const custom = {
      container: (provided) => ({
        ...provided,    
        height: 30,
        textAlign: 'left',
        border: 'none',    
        fontSize: '0.65rem',                  
        padding: 0
      }),
        control: (provider) => ({
          // none of react-select's styles are passed to <Control />
          ...provider,
          minHeight: 29,                    
          height: 29,      
          margin: 0,
          padding: 0          
        }),
        input: (provided) => ({
          ...provided,      
          color: '#4d4d4d',    
          borderRadius: '0.5rem',       
          width: 60,
          height:15               
        }),
        singleValue: (provided) => ({
          ...provided,
          minHeight: '1px',
          paddingBottom: '0px',
          color: '#4d4d4d',
          fontSize: '0.65rem',          
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          height: '28px',
          width: '28px',
          paddingTop: '2px',
          paddingBottom: '0',
          color: '#4d4d4d' 
               
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          width:'1px',          
          margin:0,
          padding:0          
        }),
        valueContainer: (provided) => ({
          ...provided,
          minHeight: '1px',
          height:'20px',
          paddingTop: '0',
          paddingBottom: '0',          
          color: '#000',          
          
        }),
        
        clearIndicator: (provided) => ({
          ...provided,
          height: 10,
          color: '#c1c1c1',          
          padding:0,
          margin:0
        }),
      }

      export const customi= {
        container: (provided) => ({
          ...provided,    
          height: 30,
          textAlign: 'left',
          border: 'none',    
          fontSize: '0.65rem',                  
          padding: 0,
          width: '100%',
        }),
          control: (provider) => ({
            // none of react-select's styles are passed to <Control />
            ...provider,
            minHeight: 29,                    
            height: 29,      
            margin: 0,
            padding: 0,
            
                      
          }),
          input: (provided) => ({
            ...provided,      
            color: '#4d4d4d',    
            borderRadius: '0.5rem',       
            width: 60,
            height:15               
          }),
          singleValue: (provided) => ({
            ...provided,
            minHeight: '1px',
            paddingBottom: '0px',
            color: '#4d4d4d',
            fontSize: '0.65rem',          
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            height: '28px',
            width: '28px',
            paddingTop: '2px',
            paddingBottom: '0',
            color: '#4d4d4d' 
                 
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            width:'1px',          
            margin:0,
            padding:0          
          }),
          valueContainer: (provided) => ({
            ...provided,
            minHeight: '1px',
            height:'20px',
            paddingTop: '0',
            paddingBottom: '0',          
            color: '#000',          
            
          }),
          
          clearIndicator: (provided) => ({
            ...provided,
            height: 10,
            color: '#c1c1c1',          
            padding:0,
            margin:0
          }),
        }
  
