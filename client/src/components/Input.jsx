const Input = (props) => {
  return (
    <input
      {...props}
      className={
        "bg-neutral-800 text-neutral-300 py-2 px-4 border border-neutral-700 rounded-full block " +
        props.className
      }
    />
  );
};
export default Input;
