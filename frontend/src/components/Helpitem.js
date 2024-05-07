import React, {useContext} from 'react';
import HelpContext from '../context/helps/HelpContext';

const Helpitem = (props) => {
    const { help, updateHelp } = props;
    const context = useContext(HelpContext);
    const {deleteHelp} = context;
    return (
        <>
        <div className='col-md-3 my-2'>                       
            <div className="card">
                    <div className="card-body">
                        <span class= {`badge rounded-pill text-bg-${help.status==="Pending"?"warning":help.status==="Confirmed"?"success":"danger"}`}>{help.status}</span>
                        <h5 className="card-title"><i style={{ color: 'grey' }}>Description-</i> {help.description}</h5>
                        <p className="card-text"><i style={{ color: 'grey' }}>Address-</i> {help.address}</p>
                        <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteHelp(help._id)}} />
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateHelp(help)}}></i>
                    </div>
            </div>
        </div>
        </>
    );
}

export default Helpitem;