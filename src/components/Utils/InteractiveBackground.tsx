import React from 'react'
import classes from './InteractiveBackground.module.scss'

const InteractiveBackground: React.FC = () => {
    return (
        <div className={classes['hero']}>
            <div className={classes['stroke']}></div> 
            {/* <div className={classes['cube']}></div>
            <div className={classes['cube']}></div>
            <div className={classes['cube']}></div>
            <div className={classes['cube']}></div>
            <div className={classes['cube']}></div>
            <div className={classes['cube']}></div> */}
        </div>
    )
}

export default InteractiveBackground