import { useNavigate } from "react-router-dom";

const CardGrade = ({ gradeId, gradeName, level, action }) => {
  const navigate = useNavigate();

  const redirectByAction = (action) => {
    if (action === "student") {
      navigate(`/studentsByGrade/${gradeId}`);
    } else if (action === "score") {
      navigate(`/studentsByGradeScore/${gradeId}`);
    } else if (action === "attendance") {
      navigate(`/studentsByGradeAttendance/${gradeId}`);
    } else if (action === "course") {
      navigate(`/coursesByGrade/${gradeId}`);
    }
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg"
      key={gradeId}
      role="button"
      onClick={() => redirectByAction(action)}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{gradeName}</div>
        <p className="text-gray-700 text-base">{level}</p>
      </div>
    </div>
  );
};

export default CardGrade;
