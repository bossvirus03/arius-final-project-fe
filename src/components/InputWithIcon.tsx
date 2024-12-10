import React, { useRef, useState } from "react";

interface InputTypeProp {
  className?: string;
  type?: "text" | "password" | "number" | "checkbox";
  value?: string | number;
  placeholder?: string;
  name?: string;
  onChange?: (e: any) => void;
  icon?: any;
  checked?: boolean;
}

const InputWithIcon = ({
  checked = false,
  className = "",
  type = "text",
  value,
  placeholder = "",
  name = "",
  onChange,
  icon,
}: InputTypeProp) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [numberValue, setNumberValue] = useState<number | string | undefined>(
    value
  );

  const handleIncrement = () => {
    const newValue = Number(numberValue) + 1;
    setNumberValue(newValue);
    onChange &&
      onChange({
        target: { value: String(newValue) },
      });
  };

  const handleDecrement = () => {
    const newValue = Math.max(Number(numberValue) - 1, 1);
    setNumberValue(newValue);
    onChange &&
      onChange({
        target: { value: String(newValue) },
      });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNumberValue(newValue);
    onChange && onChange(e);
  };
  return (
    <div className="">
      {(type == "text" || type == "password") && (
        <div
          className={`bg-transparent flex justify-between items-center w-full h-[50px] border border-solid rounded-[10px] px-[16px] overflow-hidden border-[#D2D1D6] text-[18px] ${className}`}
        >
          <>
            <input
              className="outline-none border-none w-[calc(100%-32px)] h-full placeholder:text-[#D2D1D6] placeholder:text-[16px] font-[400] dark:text-[#fff]"
              type={
                type === "password" && !isPasswordVisible ? "password" : "text"
              }
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              name={name}
              ref={inputRef}
              onFocus={() => setIsFocused(true)}
              style={{ background: "transparent" }}
            />
            {type === "password" &&
              (!isFocused ? (
                icon
              ) : (
                <>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="flex items-center justify-center w-[24px] h-[24px] ml-[8px] outline-none border-none bg-transparent"
                  >
                    {icon}
                  </button>
                </>
              ))}
            {type !== "password" && icon}
          </>
        </div>
      )}
      {type == "number" && (
        <>
          <div className="relative flex items-center max-w-[8rem] border-[0.5px] dark:border-dark-secondary border-gray-dark py-[10px] px-[20px] rounded-[10px] h-[44px]">
            <button
              type="button"
              id="decrement-button"
              data-input-counter-decrement="quantity-input"
              className="p-1 border-2 rounded-md dark:border-gray-dark border-black-primary"
              onClick={handleDecrement}
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-gray-dark"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              id="quantity-input"
              value={value}
              data-input-counter
              aria-describedby="helper-text-explanation"
              className="w-full text-center bg-transparent outline-none dark:text-gray-dark text-black-primary"
              required
              onChange={handleNumberChange}
            />
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="quantity-input"
              className="p-1 border-2 rounded-md dark:border-gray-dark border-black-primary"
              onClick={handleIncrement}
            >
              <svg
                className="w-3 h-3 text-black-primary dark:text-gray-dark"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </>
      )}
      {type == "checkbox" && (
        <>
          {/* <label className="block cursor-pointer size-[30px] border-[3px] rounded-[10px] relative overflow-hidden shadow-sm">
            <input
              className={[
                className,
                " absolute invisible left-[50px] checkbox",
              ].join(" ")}
              type="checkbox"
              checked={checked}
              onChange={onChange}
            />
            <div className="group checkbox size-[60px] bg-white -top-[52px] -left-[52px] absolute rotate-45 z-30 group-checked:-left-[10px] group-checked:-top-[10px] "></div>
          </label> */}
          <label
            className={[
              `group block cursor-pointer w-[18.5px] h-[18.5px] border-[1.5px] ${
                !checked
                  ? "border-black-primary dark:border-gray-dark"
                  : "border-green-primary"
              } rounded-[6px] relative overflow-hidden shadow-sm`,
              className,
            ].join(" ")}
          >
            <input
              type="checkbox"
              className="absolute w-full h-full opacity-0 peer"
              checked={checked}
              onChange={onChange}
            />
            <div
              className={`w-full h-full flex items-center justify-center transition-all duration-300 ${
                !checked && "bg-transparent"
              } peer-checked:bg-green-primary`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-full h-full text-white ${
                  !checked ? "opacity-0" : "opacity-100"
                } transition-opacity rotate-12 duration-300`}
                viewBox="0 0 20 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L15 7"
                />
              </svg>
            </div>
          </label>
        </>
      )}
    </div>
  );
};

export default InputWithIcon;
