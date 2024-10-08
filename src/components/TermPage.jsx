import { useState, useEffect } from "react";
import CourseList from "./CourseList";
import ScheduleModal from "./ScheduleModal";
import { isConflict } from "../utilities/timeConflicts";

const terms = {
    Fall: 'Fall',
    Winter: 'Winter',
    Spring: 'Spring'
};

const TermButton = ({ term, termSelection, setTermSelection }) => (
    <div>
        <input type="radio" id={term} className="btn-check" checked={term === termSelection} autoComplete="off"
            onChange={() => setTermSelection(term)} />
        <label className="btn btn-success mb-1 p-2" htmlFor={term}>
            {term}
        </label>
    </div>
);

const TermSelector = ({ termSelection, setTermSelection }) => (
    <div className="btn-group gap-2">
        {
            Object.keys(terms).map(term =>
                <TermButton key={term} term={term} termSelection={termSelection} setTermSelection={setTermSelection} />
            )
        }
    </div>
);

const TermPage = ({ courses }) => {
    const [termSelection, setTermSelection] = useState(() => Object.keys(terms)[0]);
    const [courseSelection, setCourseSelection] = useState([]);
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState([]);

    const toggleSelected = (courseId) => {
        setCourseSelection(
            courseSelection.includes(courseId)
                ? courseSelection.filter(x => x !== courseId)
                : [...courseSelection, courseId]
        );
    }

    useEffect(() => {
        const scheduleTimes = courseSelection.map(courseId => `${courses[courseId].term},${courses[courseId].meets}`);
        const newDisabled = [];
    
        for (const [courseKey, course] of Object.entries(courses)) {
            const courseTime = `${course.term},${course.meets}`
            if (!courseSelection.includes(courseKey) && isConflict(courseTime, scheduleTimes)) {
                newDisabled.push(courseKey);
            }
        }
    
        setDisabled(newDisabled);
    
    }, [courseSelection, courses]);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    return (
        <div>
            <ScheduleModal open={open} close={closeModal}>
                <h1>Schedule</h1>
                <div>
                    {
                        Object.entries(courses)
                            .filter(([courseId]) => courseSelection.includes(courseId))
                            .length === 0
                            ? <p>You have not selected any courses. First, select your desired term, then click on your courses.</p> :
                            (
                                Object.entries(courses)
                                    .filter(([courseId]) => courseSelection.includes(courseId))
                                    .map(([courseId, course]) => (
                                        <div key={courseId}>
                                            <p>{course.term} CS {course.number}: {course.title} -- {course.meets}</p>
                                        </div>
                                    ))
                            )
                    }
                </div>

            </ScheduleModal>
            <div className="d-flex justify-content-between align-items-center">
                <TermSelector termSelection={termSelection} setTermSelection={setTermSelection} />
                <button className="btn btn-outline-dark" onClick={openModal}>Class Schedule</button>
            </div>
            <p className="my-2">Term: {termSelection}</p>
            <CourseList courses={courses} term={termSelection} courseSelection={courseSelection} toggleSelected={toggleSelected} disabled={disabled}/>
        </div>
    );
}

export default TermPage;