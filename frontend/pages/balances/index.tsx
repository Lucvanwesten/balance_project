import {gql, useQuery} from "@apollo/client";
import Head from 'next/head'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import React, { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, ReactEventHandler, FormEventHandler } from "react";


const AllBalancesQuery = gql`
    query{
        balances{
            id
            title
            balance
        }
    }
`;

type BalanceType = {
    id: string,
    title: string,
    balance: number
}

function BalancesPage() {
    const router = useRouter();

    const {data, loading, error} = useQuery(AllBalancesQuery);

    if(loading) return <p>loading.....</p>

    if(error) return <p>erororr {error.message}</p>


    return <div>
        {data.balances.map((balance: BalanceType) => {
            return(
                <div className="card" style={{width: '18rem'}}>
                <div className="card-body">
                  <h5 className="card-title">{balance.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Balance amount: {balance.balance}</h6>
                  <p className="card-text">Description</p>
                  <button className="btn btn-success" onClick={() => router.push(`/balances/${balance.id}`)}>Go to list</button>
                </div>
              </div>
            )
        })}
    </div>
}

export default BalancesPage;


