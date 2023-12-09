import React from 'react'
import classes from './Button.module.scss'

interface ButtonProps {
    type: 'submit' | 'button' | 'reset' | undefined,
    text: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void 
}

const Button: React.FC<ButtonProps> = ({ type, text, onClick }) => {
    return (
        <button type={type} className={classes['button']} onClick={onClick}>
            <span className={classes['buttonText']}>{text}</span>
            <div className={classes['fillContainer']}></div>
        </button>
    )
}

export default Button