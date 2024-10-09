import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../utilities/useFormData';


const validateUserData = (key, val) => {
    switch (key) {
        case 'title':
            return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
        case 'meetingTimes':
            return /^(?:(M|Tu|W|Th|F)(?!.*\1))+ \d{2}:\d{2}-\d{2}:\d{2}$/.test(val) ? '' : 'must match DAY HH:MM-HH:MM';
        default: return '';
    }
};


const InputField = ({ name, text, state, change }) => (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">{text}</label>
        <input className="form-control" id={name} name={name}
            defaultValue={state.values?.[name]} onChange={change} />
        <div className="invalid-feedback">{state.errors?.[name]}</div>
    </div>
);

const ButtonBar = ({ disabled }) => {
    const navigate = useNavigate();
    return (
        <div className="d-flex">
            <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
        </div>
    );
};

const CourseForm = ({ course }) => {
    const initialValues = {
        title: course.title || '',
        meetingTimes: course.meets || '',
    };

    const [state, change] = useFormData(validateUserData, initialValues);
    const submit = (evt) => {
        evt.preventDefault();
        if (!state.errors) {
            update(state.values);
        }
    };

    return (
        <div>
            <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
                <InputField name="title" text="Class Title" state={state} change={change}/>
                <InputField name="meetingTimes" text="Meeting Times" state={state} change={change}/>
                <ButtonBar />
            </form>
        </div>
    );
};

export default CourseForm;