import { useState } from 'react';

const useToggle = (initial_state = false) => {

    const [isCollapsed, setCollapsed] = useState(initial_state)
    const toggle = () => setCollapsed(!isCollapsed);
    return { isCollapsed, toggle }
}

export default useToggle;