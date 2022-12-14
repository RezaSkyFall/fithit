import React from "react";
import NumberFormat from "react-number-format";

const NumericTextFeild = React.forwardRef(function NumericTextFeild(props, ref) {
    const { onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        
      />
    );
  });

  export {NumericTextFeild}