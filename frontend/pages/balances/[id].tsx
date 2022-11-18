import { gql, useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import Head from 'next/head'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState } from "react";
import Router, { useRouter } from "next/router";
import apolloClient from "../../lib/apollo";


const BalanceByIdQuery = gql`
    query ($id: String!){
        balance(id: $id){
            id
            title
            balance
        }
    }
`;

type BalanceType = {
    id: String,
    title: String,
    balance: number
}

function BalancePage() {

    const [balance, setBalance] = useState(0);
    const [title, setTitle] = useState();

    const router = useRouter();
    const { id } = router.query;

    const { data, loading, error } = useQuery(BalanceByIdQuery, {
        variables: {
            id: id
        }
    });

    if (loading) return <p>loading.....</p>

    return <div>
        <div className="container">
            <div className="row justify-content-md-center mt-3">
                <div className="col-md-auto">
                    <div className="shadow p-3 mb-5 bg-white rounded align-items-center">
                        <h3 className="d-flex justify-content-center">{data.balance.title}</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="balance"><h6>Balance</h6></label>
                                <input type="number" className="form-control" id="balance" placeholder="Enter balance" value={data.balance.balance} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row justify-content-md-center mt-3">
                <div className="col-md-auto">
                    <div className="shadow p-3 mb-5 bg-white rounded align-items-center">
                        <form>
                            <div className="form-group">
                                <input type="number" className="form-control" placeholder="Enter title" />
                                <div className="pull-right">
                                <button className="btn btn-success">Add Field</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default BalancePage;


