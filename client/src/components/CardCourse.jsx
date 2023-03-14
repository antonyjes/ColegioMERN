import { useNavigate } from "react-router-dom";

const CardCourse = ({ courseId, courseName, teacherName, gradeId }) => {
  const navigate = useNavigate();

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg"
      key={courseId}
      role="button"
      onClick={() => navigate(`/scoresByCourse/${courseId}/${gradeId}`)}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{courseName}</div>
        <p className="text-gray-700 text-base">{teacherName}</p>
      </div>
    </div>
  );
};

export default CardCourse;