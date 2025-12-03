
const Button = (props) => {
    const { onClick, children, label, color, hoverColor } = props;

    let btnColor = color ? color : "bg-lime-500";
    let btnHoverColor = hoverColor ? hoverColor : "bg-lime-400";

    return(
        <button onClick={onClick} className={`${btnColor} ${btnHoverColor} w-fit flex justify-center text-white rounded-full p-4 px-8 transition duration-200`}>
            {label}
        </button>
    );
};

export default Button;