import React from "react";
import "./card.css"



export default props =>

    <div className="card">
        <h2>{props.titulo}</h2>
        {props.children}

    </div>