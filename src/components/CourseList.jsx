const CourseList = ({ courses, term, courseSelection, toggleSelected }) => (
    <div className="course-list gap-2">
        {Object.entries(courses)
            .filter(([_, course]) => course.term === term)
            .map(([courseId, course]) => (
                <div key={courseId}>
                    <div
                        className="card h-100"
                        style={{ border: courseSelection.includes(courseId) ? '2px solid red' : '2px solid black' }}
                        onClick={() => toggleSelected(courseId)}
                    >
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{course.term} CS {course.number}</h5>
                            <p className="card-text flex-grow-1">{course.title}</p>
                            <hr className="mt-auto"></hr>
                            <p className="card-text mt-auto">{course.meets}</p>
                        </div>
                    </div>
                </div>
            ))}
    </div>
);
export default CourseList;