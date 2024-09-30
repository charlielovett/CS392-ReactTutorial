const CourseList = ({ courses }) => (
    <div className="course-list">
        {Object.entries(courses).map(([courseId, course]) => (
            <div key={courseId}>
                <div className="card h-100 m-2">
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{course.term} CS {course.number}</h5>
                        <p className="card-text flex-grow-1">{course.title}</p>
                        <hr className="mt-auto"></hr>
                        <p className="card-text">{course.meets}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
export default CourseList;