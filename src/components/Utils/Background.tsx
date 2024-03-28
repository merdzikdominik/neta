import React from 'react'
import classes from './Background.module.scss'

const Background: React.FC = () => {
    return (
        <div className={classes['hero']}>
            <div className={classes['stroke']}></div> 
        </div>
    )
}

export default Background