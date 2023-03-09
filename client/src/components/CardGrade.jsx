import { useNavigate } from "react-router-dom";

const CardGrade = ({ key, gradeId, gradeName, level }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg" key={key} role="button" onClick={() => navigate(`/studentsByGrade/${gradeId}`)}>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{gradeName}</div>
        <p className="text-gray-700 text-base">{level}</p>
      </div>
    </div>
  );
};

export default CardGrade;
