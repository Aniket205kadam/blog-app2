import React from 'react';
import { useId } from 'react';

function Checkbox({
    label,
    type='checkbox',
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='checkbox'>
            <input
                type={type}
                ref={ref}
                {...props}
                id={id}
            />
            {label && (
                <label
                    htmlFor={id}
                >{label}</label>
            )}
        </div>
    )
}

export default React.forwardRef(Checkbox);