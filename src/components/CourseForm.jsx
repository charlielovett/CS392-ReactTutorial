import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseForm = ({ course }) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState(course.title);
    const [meetingTimes, setMeetingTimes] = useState(course.meets);

    const handleCancel = () => {
        navigate('/')
    };

    const handleSubmit = (event) => {
        // nothing
    };

    return (
        <div>
            <form className="d-flex flex-column gap-4 align-items-start" onSubmit={handleSubmit}>
                <label className="d-flex align-items-center gap-3">
                    Class Title:
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Update state when user types
                    />
                </label>
                <label className="d-flex align-items-center gap-3">
                    Meeting Times:
                    <input
                        type="text"
                        name="meetingTimes"
                        value={meetingTimes}
                        onChange={(e) => setMeetingTimes(e.target.value)} // Update state when user types
                    />
                </label>
                <button onClick={handleCancel} className='btn btn-secondary'>Cancel</button>
            </form>
        </div>
    );
};

export default CourseForm;
