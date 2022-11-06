import {gql, useQuery} from "@apollo/client";
import Head from 'next/head'

const AllBalancesQuery = gql`
    query{
        balances{
            id
            balance
        }
    }
`;

function BalancePage() {
    const {data, loading, error} = useQuery(AllBalancesQuery);

    if(loading) return <p>loading.....</p>

    if(error) return <p>erororr {error.message}</p>

    

    return <div>
        {data.balances.map(balance => {
            return(
            <ul>
                <li>{balance.id}</li>
                <li>{balance.balance}</li>
            </ul>
            )
        })}
    </div>
}

export default BalancePage;


