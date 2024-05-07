import React from 'react';
import Helps from './Helps';
import Verify from './Verify';
import Viewdata from './Viewdata';


const Home = (props) => {
    const role = localStorage.getItem('role');
    return (
        <>
        {role==='user'?<div>
            <Helps handleAlert={props.handleAlert} />
        </div>:role==='panchayat'?<div>
            <Verify handleAlert={props.handleAlert} />
        </div>:<Viewdata handleAlert={props.handleAlert}/>}

        </>
    )
};

export default Home;