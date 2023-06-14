import React, { useState } from "react";

const Generate = () => {

    const [amount, setAmount] = useState('');

    const onGenerate = () => {
        window.location.href = `/api/people/generatepeople?amount=${amount}`;
    }

    return (
        <div className="d-flex vh-100" style={{ marginTop: "-70px" }}>
            <div className="d-flex w-100 justify-content-center align-self-center">
                <div className="row">
                    <input type="text" value={amount} onChange={e => setAmount(e.target.value)} className="form-control-lg" placeholder="Amount" />
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-2">
                        <button className="btn btn-primary btn-lg" onClick={onGenerate}>Generate</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Generate;