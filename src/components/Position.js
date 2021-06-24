import React , {useEffect}from 'react'
import clsx from "clsx"
import "../App.css"

export default function Position({number,selectedNumber}) {
    const elements = [];

    for(let i = 0 ; i < number ; i++){
        const checked = selectedNumber === i;
        elements.push(<div className = {clsx("hole" ,{ "filled-hole" : checked})}>
        </div>);
    }

    return (
        <div className = "hole-container">
            {elements}
        </div>
    )
}
