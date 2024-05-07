import React, { useContext, useEffect } from 'react';
import HelpContext from '../context/helps/HelpContext';
import { useNavigate } from 'react-router-dom';

const Viewdata = (props) => {
    const context = useContext(HelpContext);
    const { helps, getHelp } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')) {
            getHelp();
        } else {
            navigate('/login');
        }
        // getNote();
        // eslint-disable-next-line
    }, []);

    let cost = 0;
    helps.forEach((help) => {
        cost += help.price;
    });

    let totalCost = cost;
    
    return (
        <>
            <div className='container text-center' style={{ color: 'grey' }}><h1>DDMA verification</h1></div>

            <div className='row my-3'>
                <div className='container text-center' style={{ color: "red" }}>
                    {helps.length === 0 && 'No records are available.'}
                </div>
                {helps.length === 0 ? '':<table className="table">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Id</th>
                            <th scope="col">Description</th>
                            <th scope="col">Address</th>
                            <th scope="col">Status</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {helps.map((help, index) => (
                            <tr key={help._id}>
                                <td>{index + 1}</td>
                                <td>{help._id}</td>
                                <td>{help.description}</td>
                                <td>{help.address}</td>
                                <td>{help.status}</td>
                                <td>{help.price}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><b>Total cost- </b>{totalCost}</td>
                            </tr>
                    </tfoot>
                </table>}
            </div>
        </>
    );
}

export default Viewdata;
