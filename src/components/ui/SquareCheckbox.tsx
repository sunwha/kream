import { Tick02Icon } from "hugeicons-react";
import {
  Dispatch,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type Props = {
  id: string;
  name?: string;
  label: string;
  checkValue: Record<string, boolean>;
  setCheckValue: Dispatch<SetStateAction<Record<string, boolean>>>;
  allCheck?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;
export const SquareCheckbox = forwardRef(
  (
    { id, name, label, checkValue, setCheckValue, allCheck, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [allCheckId, setAllCheckId] = useState("");
    const updateValues = (prev: Record<string, boolean>, value: boolean) =>
      Object.keys(prev).reduce((acc: Record<string, boolean>, key: string) => {
        acc[key] = value;
        return acc;
      }, {});

    useEffect(() => {
      if (allCheck) {
        setAllCheckId(Object.keys(checkValue)[0]);
      }
    }, []);

    return (
      <div className="relative pl-8">
        <input
          type="checkbox"
          id={id}
          name={name}
          ref={ref}
          checked={checkValue[id]}
          {...props}
          onChange={() => {
            setCheckValue((prev) => {
              if (allCheck && id === allCheckId) {
                if (!prev[id] === true) {
                  setCheckValue((prev) => updateValues(prev, true));
                } else {
                  setCheckValue((prev) => updateValues(prev, false));
                }
              }
              return {
                ...prev,
                [id]: !prev[id],
              };
            });
          }}
          className="peer appearance-none"
        />
        <label
          htmlFor={id}
          className="text-sm before:bg-white before:contents-[''] before:absolute before:left-0 before:top-0 before:w-6 before:h-6 before:border before:border-gray-300 before:rounded-[2px] peer-checked:before:border-black peer-checked:before:bg-black"
        >
          <Tick02Icon className="text-white absolute left-0 top-0 w-6 h-6" />
          {label}
        </label>
      </div>
    );
  }
);
