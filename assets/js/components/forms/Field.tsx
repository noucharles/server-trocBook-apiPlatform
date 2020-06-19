import React from 'react';

type Params = {
    name: string,
    label: string,
    value: string,
    onChange: any,
    placeholder: any,
    type: string,
    error: string
};

const Field: React.FC<Params> = ({ name, label, value, onChange, placeholder = "" || label, type="text", error="" }: Params) => {

    return (
        <>
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input type={type} onChange={onChange} className={"form-control" + (error && " is-invalid") } value={value} placeholder={placeholder} id={name} name={name}/>
                {error && <p className="invalid-feedback">{error}</p>}
            </div>
        </>
    )
};

export default Field;