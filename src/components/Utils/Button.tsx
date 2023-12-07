import React from 'react'
import classes from './Button.module.scss'

interface ButtonProps {
    type: 'submit' | 'button' | 'reset' | undefined,
    text: string
}

const Button: React.FC<ButtonProps> = ({ type, text }) => {
    return (
        <button type={type} className={classes['button']}>
            <span className={classes['buttonText']}>{text}</span>
            <div className={classes['fillContainer']}></div>
        </button>
    )
}

export default Button