import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import { useAuthState } from '../utilities/firebase'; // Import the useAuthState hook

const CourseList = ({ courses, term, courseSelection, toggleSelected, disabled }) => {
    const [user] = useAuthState();
    
    return (
        <div className="course-list gap-2">
            {Object.entries(courses)
                .filter(([_, course]) => course.term === term)
                .map(([courseId, course]) => {
                    const isDisabled = disabled.includes(courseId);
                    const cardStyle = {
                        border: courseSelection.includes(courseId) ? '2px solid red' : '2px solid black',
                        backgroundColor: isDisabled ? 'gray' : 'white'
                    };
                    return (
                        <div key={courseId}>
                            <div
                                className="card h-100"
                                style={cardStyle}
                                onClick={() => {
                                    if (!isDisabled) toggleSelected(courseId)
                                }}
                            >
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{course.term} CS {course.number}</h5>
                                    <p className="card-text flex-grow-1">{course.title}</p>
                                    <hr className="mt-auto"></hr>
                                    <div className="d-flex flex-row justify-content-between mt-auto">
                                        <p className="card-text">{course.meets}</p>
                                        {user
                                            ? <Link to={`/form/${courseId}`} onClick={(event) => event.stopPropagation()}>
                                                <i className="bi bi-pencil-square h4"></i>
                                              </Link>
                                            : <i className="bi bi-pencil-square h4"></i>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default CourseList;
