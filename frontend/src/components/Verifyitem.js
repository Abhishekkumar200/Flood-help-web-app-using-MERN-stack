import React, {useContext, useState} from 'react';
import HelpContext from '../context/helps/HelpContext';

const Verifyitem = (props) => {
    const { help } = props;
    const context = useContext(HelpContext);
    const { verifyHelp } = context;
    const[hlp, setHlp] = useState({id: "", estatus:"", eprice:''});
    const onChange = (e)=>{
        setHlp({...hlp, [e.target.name]: e.target.value});
    };

    const handleConfirm = async () => {
        const updatedHlp = { id: help._id, estatus: "Confirmed", eprice: hlp.eprice };
        await setHlp(updatedHlp); // Await until state is updated
        verifyHelp(updatedHlp.id, updatedHlp.estatus, updatedHlp.eprice);
    };
    
    const handleDecline = async () => {
        const updatedHlp = { id: help._id, estatus: "Declined", eprice: 0 };
        await setHlp(updatedHlp); // Await until state is updated
        verifyHelp(updatedHlp.id, updatedHlp.estatus, updatedHlp.eprice);
    };

    return (
        <div className='col-md-3 my-2'>                       
            <div className="card">
                    <div className="card-body">
                        <span class= {`badge rounded-pill right-0 text-bg-${help.status==="Pending"?"warning":help.status==="Confirmed"?"success":"danger"}`}>{help.status}</span>
                        <h5 className="card-title"><i style={{ color: 'grey' }}>Description-</i> {help.description}</h5>
                        <p className="card-text"><i style={{ color: 'grey' }}>Address-</i> {help.address}</p>
                        {/* <form> */}
                            <div className="mb-3">
                                <input type="number" className="form-control"  placeholder='Enter expected price.' id='eprice' name='eprice' value={hlp.eprice} onChange={onChange}/>
                            </div>
                            {help.status==='Confirmed'?<p><i style={{ color: 'grey' }}>Cost-</i> &#8377; {help.price}</p>:help.status==='Declined'?<p><i style={{ color: 'grey' }}>Cost-</i> &#8377; 0</p>:''}
                            <button type="button" className={`btn btn-success btn-sm mx-4 ${help.status==='Pending'?'':"disabled"}` }onClick={handleConfirm}>Confirm</button>
                            <button type="button" className={`btn btn-danger btn-sm mx-4 ${help.status==='Pending'?'':"disabled"}`} onClick={handleDecline}>Decline</button>
                        {/* </form> */}
                    </div>
            </div>
        </div>
    );
}

export default Verifyitem;