import React from 'react'
import classes from './Button.module.scss'

interface IButtonProps {
    type: 'submit' | 'button' | 'reset' | undefined
    text: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => void
}

const Button: React.FC<IButtonProps> = ({ type, text, onClick }) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event)
        }
      };

    return (
        <button type={type} className={classes['button']} onClick={handleClick}>
            <span className={classes['buttonText']}>{text}</span>
            <div className={classes['fillContainer']}></div>
        </button>
    )
}

export default Button