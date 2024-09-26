const CourseList = ({ courses }) => (
    <div>
        {Object.entries(courses).map(([courseId, course]) => (
            <div key={courseId}>
                <p>{course.term} CS {course.number}: {course.title}</p>
            </div>
        ))}
    </div>
);
export default CourseList;