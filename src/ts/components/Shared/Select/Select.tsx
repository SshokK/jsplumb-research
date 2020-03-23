import React, { ReactElement } from 'react';
import ReactSelect, { components, OptionProps, ValueContainerProps } from 'react-select';
import { Checkbox } from '@material-ui/core';
import './Select.scss';

const Option = ({ children, ...props }: OptionProps<any>): ReactElement => {
  return (
    <components.Option {...props}>
      <Checkbox
        checked={props.isSelected}
        color='default'
      />
      {props.label}
    </components.Option>
  );
};

interface CustomMultiValueContainerProps extends ValueContainerProps<any> {
  showJustNumber: boolean;
  setDisplayNumberLabel: Function;
}

const ValueContainer = ({ children, showJustNumber, setDisplayNumberLabel, ...props }: CustomMultiValueContainerProps): ReactElement => {
  if (showJustNumber && props.options) {
    const selectedItemsCount = props.selectProps.value.length;
    let value: string;

    if (setDisplayNumberLabel) {
      value = setDisplayNumberLabel(selectedItemsCount);
    } else {
      value = `${selectedItemsCount} items selected`;
    }

    return (
      <components.ValueContainer {...props}>
        <div>
          {value}
        </div>
      </components.ValueContainer>
    );
  }

  return (
    <components.ValueContainer {...props}>
      {children}
    </components.ValueContainer>
  );
};

const Select: React.FC<any> = (props: any): ReactElement => {
  const {
    value,
    isMulti,
    options,
    showJustNumber,
    setDisplayNumberLabel,
    onChange
  } = props;

  const handleChange = (options: any): Function => {
    return onChange(!options && isMulti ? [] : options);
  };

  const components: any = {
    Option: Option,
    ValueContainer: (props: any) => ValueContainer({ showJustNumber, setDisplayNumberLabel, ...props })
  };

  return (
    <ReactSelect
      className='select__container'
      classNamePrefix={'select'}
      value={value}
      isMulti={isMulti}
      options={options}
      components={components}
      closeMenuOnSelect={!isMulti}
      hideSelectedOptions={false}
      onChange={handleChange}
    />
  );
};

export default Select;
