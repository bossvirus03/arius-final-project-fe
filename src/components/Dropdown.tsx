import { ReactNode, useState, useEffect, useRef } from "react";

interface DropdownProps {
  menu: {
    items: { label?: ReactNode; divider?: boolean }[]; // Thêm trường divider
  };
  placement: "bottom" | "top";
  trigger: ("click" | "hover")[];
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  menu,
  placement,
  trigger,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Hàm để mở/đóng dropdown khi click
  const handleClick = () => {
    if (trigger.includes("click")) {
      setIsOpen(!isOpen);
    }
  };

  // Hàm để mở dropdown khi hover
  const handleMouseEnter = () => {
    if (trigger.includes("hover")) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger.includes("hover")) {
      setIsOpen(false);
    }
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger element */}
      <div>{children}</div>

      {/* Dropdown Menu */}
      <div
        ref={dropdownRef}
        className={`absolute ${
          placement === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
        } w-48 bg-white border border-gray-300 rounded-md shadow-lg ${
          isOpen ? "opacity-100 max-h-96" : "max-h-0 opacity-0"
        } transition-all duration-300 overflow-hidden`}
      >
        <ul>
          {menu.items.map((item, index) => (
            <li
              key={index}
              className={item.divider ? "" : "px-4 py-2 hover:bg-gray-100"}
            >
              {item.divider && <hr className="my-1 border-t border-gray-300" />}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
