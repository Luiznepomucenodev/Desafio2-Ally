import React from "react";
import Select from "react-select";

export default props =>{
    return(
    <>  
        <p>
            {props.name}
        </p>
        <Select className="multi" isMulti options={props.options}></Select>
    </>
    )
}