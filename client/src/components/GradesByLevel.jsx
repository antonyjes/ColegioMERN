import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setGrades } from "state";
import { useEffect } from "react";
import Aside from "./Aside";
import Sidebar from "./Sidebar";
import CardGrade from "./CardGrade";

const GradesByLevel = () => {
  const dispatch = useDispatch();
  const grades = useSelector((state) => state.grades);
  const token = useSelector((state) => state.token);
  const { level } = useParams();

  const getGrades = async () => {
    const response = await fetch(`http://localhost:3003/grades/${level}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setGrades({ grades: data }));
  };

  useEffect(() => {
    getGrades();
  }, [level]); // eslint-disable-line

  return (
    <>
      <Sidebar />
      <Aside />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div>
            {grades.map((grade) => (
                <CardGrade key={grade._id} gradeId={grade._id} gradeName={grade.gradeName} level={level} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GradesByLevel;
