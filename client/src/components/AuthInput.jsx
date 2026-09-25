function AuthInput(props) {
  const { label, id, type, name, value, onChange, placeholder } = props;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
                w-full 
                px-2 
                py-2 
                border 
                border-slate-300 
                rounded-lg 
                focus:ring-2 
                focus:ring-cyan-500/50 
                focus:outline-none"
      ></input>
    </div>
  );
}

export default AuthInput;
