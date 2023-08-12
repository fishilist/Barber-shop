import "./Input.scss";

function Input({title = 'title', placeholder = 'placeholder'}) {

    function clickHandler(event) {
        const input = event.target
        if (input.value === '') {
            event.target.placeholder = ''
        }
    }

    function blurHandler(event) {
        const input = event.target
        if (input.value === '') {
            input.placeholder = placeholder
        }
    }

    return (
        <div className="input-field error">
            <div className="input-field__title h5">
                <p>{title}</p>
            </div>
            <div className="input-field__input">
                <input onBlur={(event) => blurHandler(event)} onClick={(event) => clickHandler(event)}
                       className={'input-field__input_input h5'} type="text" placeholder={placeholder}/>
            </div>
        </div>
    );
}

export default Input;