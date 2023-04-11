import React, { useRef } from "react";
import ReactSelect from "react-select";
import { components } from "react-select";

export const MultiSelect = (props) => {
  // isOptionSelected sees previous props.value after onChange
  const valueRef = useRef(props.value);
  valueRef.current = props.value;
  // console.log(props," inside props");
  const selectAllOption = {
    value: "<SELECT_ALL>",
    label: "Select all",
  };
  // const changeHandler = (e, props) => {
  //   let value = null;
  //   if (e) value = e.value;
  //   props.onChangeFunc(value, props.name, e);

  //   if (!props.onValidateFunc) return;

  //   let msg = null;
  //   if (!value && props.isReq) {
  //     msg = "Please select an option";
  //   }

  //   props.onValidateFunc(msg, props.name);
  // };
  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };
  const isSelectAllSelected = () =>
    valueRef.current.length === props.options.length;

  const isOptionSelected = (option) =>
    valueRef.current.some(({ value }) => value === option.value) ||
    isSelectAllSelected();

  const getOptions = () => [selectAllOption, ...props.options];

  const getValue = () =>
    isSelectAllSelected() ? [selectAllOption] : props.value;

  const onChange = (newValue, actionMeta) => {
    const { action, option, removedValue } = actionMeta;

    if (action === "select-option" && option.value === selectAllOption.value) {
      props.onChange(props.options, actionMeta);
    } else if (
      (action === "deselect-option" &&
        option.value === selectAllOption.value) ||
      (action === "remove-value" &&
        removedValue.value === selectAllOption.value)
    ) {
      props.onChange([], actionMeta);
    } else if (
      actionMeta.action === "deselect-option" &&
      isSelectAllSelected()
    ) {
      props.onChange(
        props.options.filter(({ value }) => value !== option.value),
        actionMeta
      );
    } else {
      props.onChange(newValue || [], actionMeta);
    }
  };
  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      console.log({ data, isDisabled, isFocused, isSelected });
      return {
        ...styles,
        backgroundColor: isSelected ? "white" : null,
        color: "#333333",
      };
    },
  };
  return (
    <div>
      <ReactSelect
        components={{
          Option,
        }}
        isOptionSelected={isOptionSelected}
        options={getOptions()}
        value={getValue()}
        onChange={onChange}
        hideSelectedOptions={false}
        closeMenuOnSelect={false}
        isMulti
        styles={colourStyles}
        // onChange={(e) => {
        //   changeHandler(e, props);
        //   onChange();
        // }}
      />
    </div>
  );
};
