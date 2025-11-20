
const Button = (props) => {
    const { onClick, children, color, hoverColor } = props;

    let btnColor = color ? color : "bg-lime-500";
    let btnHoverColor = hoverColor ? hoverColor : "bg-lime-400";

    return(
        <div onClick={onClick} className={`${btnColor} ${btnHoverColor} w-fit flex justify-center text-white rounded-full p-4`}>
            {children}
        </div>
    );
};

export default Button;