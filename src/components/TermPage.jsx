import { useState } from "react";
import CourseList from "./CourseList";

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
    const [courseSelection, setCourseSelection] = useState([])

    const toggleSelected = (courseId) => {
        console.log(courseSelection)
        setCourseSelection(
            courseSelection.includes(courseId)
                ? courseSelection.filter(x => x !== courseId)
                : [...courseSelection, courseId]
        );
    }

    return (
        <div>
            <TermSelector termSelection={termSelection} setTermSelection={setTermSelection} />
            <p className="my-2">Term: {termSelection}</p>
            <CourseList courses={courses} term={termSelection} courseSelection={courseSelection} toggleSelected={toggleSelected} />
        </div>
    );
}

export default TermPage;