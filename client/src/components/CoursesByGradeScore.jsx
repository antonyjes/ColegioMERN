import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCourses } from "state";
import Aside from "./Aside";
import Sidebar from "./Sidebar";
import CardCourse from "./CardCourse";

const CoursesByGradeScore = () => {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses);
    const token = useSelector((state) => state.token);
    const {gradeId} = useParams();

    const getCourses = async () => {
        const response = await fetch(`http://localhost:3003/courses/${gradeId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setCourses({courses: data}));
    };

    useEffect(() => {
        getCourses();
    }, [gradeId]); // eslint-disable-line

    return (
        <>
          <Sidebar />
          <Aside />
          <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
              <div>
                {courses.map((course) => (
                    <CardCourse key={course._id} courseId={course._id} courseName={course.nameCourse} teacherName={course.teacherName} />
                ))}
              </div>
            </div>
          </div>
        </>
      );
};

export default CoursesByGradeScore;