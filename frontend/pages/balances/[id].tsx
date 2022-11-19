import { gql, useQuery } from "@apollo/client";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState } from "react";
import Router, { useRouter } from "next/router";
import InputField from "../../components/InputField";


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

type field = {
    name: string,
    value: number,
    plusOrMinus: boolean
};

const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("clicked");
}

function BalancePage() {

    const [balance, setBalance] = useState(0);
    const [title, setTitle] = useState();
    const [fields, setFields] = useState([]);

    const router = useRouter();
    const { id } = router.query;

    const { data, loading, error } = useQuery(BalanceByIdQuery, {
        variables: {
            id: id
        }
    });

    if (loading) return <p>loading.....</p>

    return <div className="container">
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
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Enter title" />
                            <div className="input-group-append">
                                <button className="btn btn-success" type="submit" onClick={handleClick}>Add Field</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        {fields? fields.map((field: field, index) => {
            <InputField key={index} {...field} />
        }
        ): null}
    </div>

}


export default BalancePage;


