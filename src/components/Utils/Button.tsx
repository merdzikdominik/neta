import React from 'react'
import classes from './Button.module.scss'

interface IButtonProps {
    type: 'submit' | 'button' | 'reset' | undefined
    text: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => void
    disabled?: boolean
    background?: string
}

const Button: React.FC<IButtonProps> = ({ type, text, onClick, disabled, background }) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event)
        }
      };

    return (
        <button type={type} className={`${classes['button']} ${background === 'white' ? classes['button__background'] : ''} `} onClick={handleClick} disabled={disabled}>
            <span className={classes['buttonText']}>{text}</span>
            <div className={classes['fillContainer']}></div>
        </button>
    )
}

export default Button