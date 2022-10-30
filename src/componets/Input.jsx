import React from "react";

export default props =>{
    
return(
<>  
    <form>
        <p className="ajust">
            {props.inputName}
        </p>
        <input placeholder={props.placeholder} name={props.name} className="format" maxLength={props.maxLength} type={props.type} value={props.value} 
        onChange={e => props.handleChange(e)}
    />
    </form>
</>
)

}