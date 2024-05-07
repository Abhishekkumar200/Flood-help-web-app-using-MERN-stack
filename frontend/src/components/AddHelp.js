import React, {useContext, useState} from 'react';
import HelpContext from '../context/helps/HelpContext';

const AddHelp = () => {
    const context = useContext(HelpContext);
    const {addHelp} = context;
    const [help, setHelp] = useState({description:"", address:""});
    const handleClick = ()=>{
        addHelp(help.description, help.address);
        setHelp({description:"", address:""});
    };

    const onChange = (e)=>{
        setHelp({...help, [e.target.name]: e.target.value});
    };

  return (
    <div className='container'>
    <h2 className='my-3'>Add a Help</h2>
    <form>
    <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description" name='description' value={help.description} onChange={onChange}/>
    </div>
    <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input type="text" className="form-control" id="address" name='address' value={help.address} onChange={onChange}/>
    </div>
    <button type="button" className="btn btn-primary" onClick={handleClick}>Submit</button>
    </form>
    <h2 className='my-3'>Previous Helps</h2>
    </div>
  )
}

export default AddHelp;