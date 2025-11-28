import React, { forwardRef } from "react";
import { CircleAlert } from "lucide-react";

const InputComponent = forwardRef((props, ref) => {
  const {
    Icon,
    mt = 0,
    inputType = "text",
    as = "input",
    rows,
    webkitdirectory,
    name,
    id,
    value,
    disabled = false,
    labelName,
    labelColor = "primary",
    placeholderName,
    placeholderColor = "secondary",
    borderSize = "border",
    borderColor = "border-primary",
    activeBorderColor = "blue",
    borderRadius = "xl",
    outlineSize,
    outlineColor,
    textColor = "text-primary",
    error,
    required = false,
    minLength = 200,
    maxLength = 200,
    min,
    onChange,
    onBlur,
    step = "any",
    ...rest
  } = props;

  const isControlKey = (e) => {
    const controlKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Enter",
      "Escape",
    ];
    return controlKeys.includes(e.key) || e.ctrlKey || e.metaKey || e.altKey;
  };

  const handleKeyDown = (e) => {
    if (inputType === "number") {
      if (
        e.key === "." ||
        e.key === "," ||
        e.key === "e" ||
        e.key === "E" ||
        e.key === "+" ||
        e.key === "-"
      ) {
        e.preventDefault();
      }
    }

    const currentValue = e.target.value;
    if (currentValue.length >= maxLength && !isControlKey(e)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    if (inputType === "number" && parseFloat(e.target.value) < 0) {
      return;
    }

    onChange?.(e);
  };

  return (
    <div className={`w-full mt-${mt} mb-4`}>
      <div className="flex justify-between items-center">
        <label
          htmlFor={id || name}
          className={`text-${labelColor} flex items-center`}
        >
          {labelName}
          {required && <span className="text-red-500 ml-1">*</span>}
          {Icon && (
            <span className="ml-1 inline-flex items-center justify-center">
              <img src={Icon} className="align-middle" alt="" />
            </span>
          )}
        </label>
      </div>

      <div className="relative mt-2">
        {as === "textarea" ? (
          <textarea
            ref={ref}
            name={name}
            id={id || name}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            placeholder={placeholderName}
            maxLength={maxLength}
            rows={rows}
            className={`w-full ${borderSize} rounded-${borderRadius} ${
              error
                ? "border-fadered focus:border-fadered"
                : `${borderColor} focus:border-${activeBorderColor}`
            } font-normal focus:outline-none focus:ring-0 px-2 py-2.5 ${textColor} bg-transparent placeholder:text-${placeholderColor}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${name}-error` : undefined}
            {...rest}
          />
        ) : (
          <input
            ref={ref}
            type={inputType}
            name={name}
            id={id || name}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            placeholder={placeholderName}
            maxLength={maxLength}
            min={inputType === "number" ? min ?? 0 : undefined}
            webkitdirectory={webkitdirectory ? "true" : undefined}
            className={`w-full ${borderSize} rounded-${borderRadius} ${
              error
                ? "border-fadered focus:border-fadered"
                : `${borderColor} focus:border-${activeBorderColor}`
            } font-normal focus:outline-none focus:ring-0 px-2 py-2.5 ${textColor} bg-transparent placeholder:text-${placeholderColor}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${name}-error` : undefined}
            step={inputType === "number" ? step : undefined}
            {...rest}
          />
        )}
        {error && (
          <>
            <div className="z-10 absolute right-3 top-6 transform -translate-y-1/2">
              <CircleAlert color="red" />
            </div>
            <p
              id={`${name}-error`}
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {error}
            </p>
          </>
        )}
      </div>
    </div>
  );
});

export default InputComponent;
