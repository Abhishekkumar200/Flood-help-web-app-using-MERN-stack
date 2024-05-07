import React, { useState } from 'react';
import HelpContext from './HelpContext';

const HelpState = (props) =>{
    const initialHelps = [];
    const host = 'http://localhost:8000';
    const [helps, setHelps] = useState(initialHelps);


    //API CALL: 1 Add a help.
    const addHelp = async (description, address) => {
    //To do api call.

        try {
            const response = await fetch(`${host}/api/help/addhelps`, {
            method: "POST", // or 'PUT'
            headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ description, address })
        });

        const result = await response.json();
        console.log("Success:", result);
        props.handleAlert("Help added successfully.", "success");
        } catch (error) {
        console.error("Error:", error);
        props.handleAlert("Something went wrong.", "danger");

        }
        getHelp();

    };

    // API CALL: 2 Get all helps.
    const getHelp = async () => {
    //To do api call.

        try {
            const response = await fetch(`${host}/api/help/fetchhelps`, {
            method: "GET", // or 'PUT'
            headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
            }
            //   body: JSON.stringify({title, description, tag})
        });

        const result = await response.json();
        setHelps(result);
        // console.log("Success:", result);
        } catch (error) {
        console.error("Error:", error);
        }
    };

    //API CALL: 3 Delete a Help.
    const deleteHelp = async (id) => {
    //To do api delete.

        try {
            const response = await fetch(`${host}/api/help/deletehelp/user/${id}`, {
            method: "DELETE", // or 'PUT'
            headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
            }
            //   body: JSON.stringify({title, description, tag})
        });

        const result = await response.json();
        console.log("Success:", result);
        props.handleAlert("Help deleted successfully.", "warning");
        } catch (error) {
        console.error("Error:", error);
        props.handleAlert("Something went wrong.", "danger");
        }
        getHelp();
    };

     //API CALL: 4 Edit a help.
    const editHelp = async (id, description, address) => {


        try {
            const response = await fetch(`${host}/api/help/updatehelp/user/${id}`, {
            method: "PUT", // or 'PUT'
            headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ description, address })
        });

        const result = await response.json();
        console.log("Success:", result);
        props.handleAlert("Help edited successfully.", "success");
        } catch (error) {
        console.error("Error:", error);
        props.handleAlert("Something went wrong.", "danger");
        }

        let newHelps = JSON.parse(JSON.stringify(helps));
        for (let index = 0; index < newHelps.length; index++) {
        let element = newHelps[index];
        if (element._id === id) {
            newHelps[index].description = description;
            newHelps[index].address = address;
            break;
        }

        }
        setHelps(newHelps);
    };

     //API CALL: 5 verify a help.
     const verifyHelp = async (id, status, price) => {


        try {
            const response = await fetch(`${host}/api/help/verifyhelp/panchayat/${id}`, {
            method: "PUT", // or 'PUT'
            headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ status, price })
        });

        const result = await response.json();
        console.log("Success:", result);
        props.handleAlert("Help verified successfully.", "success");
        } catch (error) {
        console.error("Error:", error);
        props.handleAlert("Something went wrong.", "danger");
        }

        let newHelps = JSON.parse(JSON.stringify(helps));
        for (let index = 0; index < newHelps.length; index++) {
        let element = newHelps[index];
        if (element._id === id) {
            newHelps[index].status = status;
            newHelps[index].price = price;
            break;
        }

        }
        setHelps(newHelps);
    };    

    return (
        <HelpContext.Provider value={{ helps, addHelp, deleteHelp, editHelp, getHelp, verifyHelp }}>
          {props.children}
        </HelpContext.Provider>
      )

};

export default HelpState;