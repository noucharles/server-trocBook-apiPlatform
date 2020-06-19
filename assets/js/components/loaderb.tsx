import React, { FunctionComponent } from 'react';
import './loader.css';

const Loaderb: FunctionComponent = () => {

    return (
        <div className="loader text-center " style={{position: "absolute",
            top: "40%", left: "45%",
            transform: "translate(-50%, -50%)"}}>
        </div>
    );
}

export default Loaderb;