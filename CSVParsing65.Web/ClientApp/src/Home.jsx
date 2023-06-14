import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [people, setPeople] = useState([]);

    useEffect(() => {

        getPeople();
    }, [])
    const getPeople = async () => {
        const { data } = await axios.get('/api/people/getpeople')
        setPeople(data);
    }

    const onDelete = async () => {
        console.log('delete')
        await axios.post('/api/people/delete')
        setPeople([]);
    }

    return (
        <div>

            <div className="container" style={{ marginTop: 60 }}>
                <div className="row">
                    <div className="col-md-6 offset-md-3 mt-5">
                        <button className="btn btn-danger btn-lg w-100" onClick={onDelete}>Delete All</button>
                    </div>
                </div>
                <table className="table table-hover table-striped table-bordered mt-5">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(p =>
                            <tr>
                                <td>{p.id}</td>
                                <td>{p.firstName}</td>
                                <td>{p.lastName}</td>
                                <td>{p.age}</td>
                                <td>{p.address}</td>
                                <td>{p.email}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default Home