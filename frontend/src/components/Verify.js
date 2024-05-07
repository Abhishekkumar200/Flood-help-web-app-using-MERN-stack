import React, { useContext, useEffect } from 'react';
import Verifyitem from './Verifyitem';
import HelpContext from '../context/helps/HelpContext';
import { useNavigate } from 'react-router-dom';

const Verify = (props) => {
    const context = useContext(HelpContext);
    const { helps, getHelp } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getHelp();
        }
        else
        {
            navigate('/login');
        }
        // getNote();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className='container text-center' style={{ color: 'grey' }}><h1>Panchayat verification</h1></div>

            <div className='row my-3'>
                <div className='container text-center' style={{color: "red"}}>
                    {helps.length===0 && 'No records are available.'}
                </div>
                {helps.map((help) => {
                    return (
                        <Verifyitem key={help._id} help={help} />
                    );
                })}
            </div>
        </>
    );
}

export default Verify;