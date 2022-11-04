import { handleClientScriptLoad } from "next/script";
import React, { ChangeEvent, FormEvent, useState } from "react";


function BalancePage() {
    const [balance, setBalance] = useState(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('this is balance' + balance);
        
        console.log(e.currentTarget.balance.value);
        
    }

    return <>
        <form action="" onSubmit={handleSubmit} >
            <input name='balance' id="balance" value={balance}  type="number" 
            onChange={(e) => setBalance(parseInt(e.target.value))} />
            <button type="submit">submit</button>
        </form>

    </>
}

export default BalancePage;

