import React, { useEffect, useState } from 'react';

import WidgetBody from './WidgetBody';

const Widget = props => {

    const { subscription } = props
    const [resultNumber, setResultNumber] = useState(0)

    useEffect(() => {
        let unsubscribe = null;
        if (subscription !== undefined) {
            unsubscribe = subscription(setResultNumber)
        }
        return () => unsubscribe && unsubscribe()
    }, [resultNumber, subscription])

    return (
        <div className="col-sm h-auto p-1 rounded">
            <div className="card h-100 rounded border-0 shadow-sm">
                <WidgetBody {...props} value={resultNumber > 0 ? resultNumber : props.value} />
            </div>
        </div>  
    )
}

export default Widget;