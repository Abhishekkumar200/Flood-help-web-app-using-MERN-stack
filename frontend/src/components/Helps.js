import React, { useContext, useEffect, useRef, useState } from 'react';
import Helpitem from './Helpitem';
import AddHelp from './AddHelp';
import HelpContext from '../context/helps/HelpContext';
import { useNavigate } from 'react-router-dom';

const Helps = (props) => {
    const context = useContext(HelpContext);
    const { helps, getHelp, editHelp } = context;
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

    const ref = useRef(null);
    const refClose = useRef(null);

    const [help, setHelp] = useState({id: "", edescription:"", eaddress:""});
    const handleClick = ()=>{
        editHelp(help.id, help.edescription, help.eaddress)
        refClose.current.click();
        // setNote({id: "", etitle:"", edescription:"", etag:""});
    };

    const onChange = (e)=>{
        setHelp({...help, [e.target.name]: e.target.value});
    };

    const updateHelp = (currentHelp) => {
        ref.current.click();
        setHelp({id: currentHelp._id, edescription: currentHelp.description, eaddress: currentHelp.address});
    };
    const role = localStorage.getItem('role');
    return (
        <>
            {role==='user'?<AddHelp />:role==='panchayat'?<div className='container text-center' style={{ color: 'grey' }}><h1>Panchayat verification</h1></div>:<div className='container text-center' style={{ color: 'grey' }}><h1>DDMA Records</h1></div>}

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} value={help.edescription}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="eaddress" className="form-label">Address</label>
                                <input type="text" className="form-control" id="eaddress" name='eaddress' onChange={onChange} value={help.eaddress}/>
                            </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <div className='container mx-3 my-3' style={{color: "red"}}>
                    {helps.length===0 && 'No records are available.'}
                </div>
                {helps.map((help) => {
                    return (
                        <Helpitem key={help._id} updateHelp={updateHelp} help={help} />
                    );
                })}
            </div>
        </>
    );
}

export default Helps;