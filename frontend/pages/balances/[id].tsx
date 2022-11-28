import { gql, useQuery } from "@apollo/client";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState, useEffect, useTransition } from "react";
import Router, { useRouter } from "next/router";
import InputField from "../../components/InputField";
import { calculateOverrideValues } from "next/dist/server/font-utils";
import React from "react";

const cuid = require('cuid');

const BalanceByIdQuery = gql`
    query ($id: String!){
        balance(id: $id){
            id
            title
            balance
            fields{
                id
                name
                value
                plusOrMinus
            }
        }
    }
`;

type BalanceType = {
    id: String,
    title: String,
    balance: number
    fields: Field[]
}

type Field = {
    id: String,
    name: string,
    value: number,
    plusOrMinus: boolean
};



function BalancePage() {
    const [balance, setBalance] = useState()
    const [budget, setBudget] = useState(0);
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState<Field[]>([]);
    const [inputName, setInputName] = useState('');
    const [balanceId, setBalanceId] = useState<String>();
    const [remaining, setRemaining] = useState(0);

    const router = useRouter();
    useEffect(() => {
        if (router.query.id) {
            setBalanceId(router.query.id as String);
        }
    }, [router.query.id]);

    const { data, loading, error } = useQuery(BalanceByIdQuery, {
        variables: {
            id: balanceId
        },
        pollInterval: 5000
    });

    useEffect(() => {
        setBudget(data?.balance.balance);
        setTitle(data?.balance.title);
        setFields(data?.balance.fields);
      }, [data])

    const handleFieldSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newField: Field = {
            id: cuid(),
            name: inputName,
            value: 0,
            plusOrMinus: true
        }

        setFields([...fields, newField]);
        setInputName('');
    }

    

    const updateFields = (id: string, name: string, value: number, plusOrMinus: boolean) => {
        setFields(fields => fields.filter(field => field.id !== id));
    }

    const handeCalculation = (e: React.MouseEvent) => {
        console.log('clicked', fields);
        let newTotal = 0;
        fields.forEach(field => {
            if (field.plusOrMinus) {
                newTotal -= field.value;
            } else {
                newTotal += field.value;
            }
            setRemaining(budget - newTotal);
        });
    }

    

    if (loading) return <p>loading.....</p>

    return <div className="container">
        <div className="row justify-content-md-center mt-3">
            <div className="col-md-auto">
                <div className="shadow p-3 mb-5 bg-white rounded align-items-center">
                    <h3 className="d-flex justify-content-center">{title || ''}</h3>
                    <h1 className="d-flex justify-content-center">{remaining}</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="balance"><h6>Budget</h6></label>
                            <input type="number" 
                            className="form-control" 
                            id="balance" 
                            placeholder="Enter balance" 
                            onChange={(e) => setBudget(Number(e.target.value))}
                            value={budget || 0} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="row justify-content-md-center mt-3">
            <div className="col-md-auto">
                <div className="shadow p-3 mb-5 bg-white rounded align-items-center">
                    <form onSubmit={handleFieldSubmit}>
                        <div className="input-group">
                            <input 
                            type="text" 
                            className="form-control" 
                            name="name" 
                            placeholder="Enter name" 
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}/>
                            <div className="input-group-append">
                                <button className="btn btn-success" type="submit">Add Field</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="row justify-content-md-center mt-3">
        {fields && fields.map((field: Field, index: number) => {
            return <InputField key={index} updateFields={updateFields} {...field} />
        }
        )}
        </div>
        <div className="row justify-content-md-center mt-3">
            <div className="col-md-auto">
            <button className="btn btn-primary" onClick={handeCalculation}>Calculate</button>
            </div>
        </div>
    </div>

}


export default BalancePage;


