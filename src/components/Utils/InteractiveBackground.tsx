import React from 'react'
import classes from './InteractiveBackground.module.css'

const InteractiveBackground: React.FC = () => {
    return (
        <section>
            <div className={classes['wave']}></div>
            <div className={classes['wave']}></div>
            <div className={classes['wave']}></div>
        </section>
    )
}

export default InteractiveBackground