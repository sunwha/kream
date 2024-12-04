type Props = {
  name: string;
  label: string;
  placeholder: string;
  input: React.ReactNode;
  required?: boolean;
};
export default function InputBox({
  name,
  label,
  placeholder,
  input,
  required,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {input}
    </div>
  );
}
