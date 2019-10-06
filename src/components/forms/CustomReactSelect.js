import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const CustomReactSelect = ({ options, isMulti, onChange, onBlur, value }) => {
    
    // this is going to call setFieldValue and manually update values.somefield
    const handleChange = (value) => onChange('sizes', value);
  
    // this is going to call setFieldTouched and manually update touched.somefield
    const handleBlur = () => onBlur('sizes', true);
    
    return (
        <Select
            options={options}
            isMulti={isMulti}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            components={animatedComponents} />
    );
  }

  export default CustomReactSelect;