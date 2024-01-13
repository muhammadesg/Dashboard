import React from 'react'

const Button = ({children, className, openMenu}) => {
    return (
        <button className={className} onClick={openMenu}>{children}</button>
    )
}

export default Button