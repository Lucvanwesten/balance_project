import { handleClientScriptLoad } from "next/script";
import React, { useState } from "react";

function Test(){
    const [count, setCount] = useState(0);

    const handleClick = () => {
        let newCount = count + 1
        setCount(newCount);
        
    }

    return <>
    <button onClick={handleClick}> Click me</button>
    <h1>{count}</h1>
    </>
}

export default Test;