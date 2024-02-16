// ButtonElement component definition
function ButtonElement({ disabled, text }) {
  return (
    // Button with conditional styling based on the 'disabled' prop
    <button
      type="submit"
      className={`w-full text-white bg-slate-600 hover:bg-slate-500 disabled:cursor-not-allowed disabled:text-gray-400 disabled:bg-slate-600 focus:outline-none font-medium rounded-lg text-sm p-2 text-center`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

// Exporting the ButtonElement component as default
export default ButtonElement;
