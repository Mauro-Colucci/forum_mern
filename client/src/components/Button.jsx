const Button = ({ outline, className, children, onClick }) => {
  let buttonClasses =
    "border border-neutral-300 lg:w-28 rounded-full p-1 px-3 text-sm font-semibold ";
  outline
    ? (buttonClasses += "text-neutral-300 ")
    : (buttonClasses += "bg-neutral-300 text-neutral-900 ");

  return (
    <button onClick={onClick} className={buttonClasses + className}>
      {children}
    </button>
  );
};
export default Button;

/* const Button = (props) => {
  let buttonClasses =
    "border border-neutral-300 lg:w-28 rounded-full h-8 px-3 text-sm font-semibold ";
  props.outline
    ? (buttonClasses += "text-neutral-300 ")
    : (buttonClasses += "bg-neutral-300 text-neutral-900 ");

  return <button {...props} className={buttonClasses + props.className} />;
};
export default Button; */
