import {gql, useQuery} from "@apollo/client";
import Head from 'next/head'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

const AllBalancesQuery = gql`
    query{
        balances{
            id
            title
            balance
        }
    }
`;

function BalancesPage() {
    const {data, loading, error} = useQuery(AllBalancesQuery);

    if(loading) return <p>loading.....</p>

    if(error) return <p>erororr {error.message}</p>

    

    return <div>
        {data.balances.map((balance: { id: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; balance: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => {
            return(
            <ul>
                <li>{balance.id}</li>
                <li>{balance.balance}</li>
                <li>{balance.title}</li>
            </ul>
            )
        })}
    </div>
}

export default BalancesPage;


