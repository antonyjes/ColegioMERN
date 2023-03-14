import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScores } from "state";
import ReactPaginate from "react-paginate";
import Sidebar from "./Sidebar";
import Aside from "./Aside";
import { useNavigate, useParams } from "react-router-dom";

const ScoresByCourse = () => {
  const dispatch = useDispatch();
  const scores = useSelector((state) => state.scores);
  const token = useSelector((state) => state.token);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const { courseId } = useParams();

  const getScores = async () => {
    const response = await fetch(`http://localhost:3003/scores/${courseId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setScores({ scores: data }));
  };

  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(scores.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const handleDelete = async (scoreId) => {
    const response = await fetch(
      `http://localhost:3003/scores/${scoreId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    console.log("Score deleted");
    getScores();
  };

  useEffect(() => {
    getScores();
  }, [courseId]); // eslint-disable-line

  const scoresToDisplay = scores
    .slice(offset, offset + PER_PAGE)
    .map((score) => (
      <tr key={score._id}>
        <td className="border px-4 py-2">{score.studentName}</td>
        <td className="border px-4 py-2">{score.courseName}</td>
        <td className="border px-4 py-2">{score.score1}</td>
        <td className="border px-4 py-2">{score.score2}</td>
        <td className="border px-4 py-2">{score.score3}</td>
        <td className="border px-4 py-2">{score.score4}</td>
        <td className="border px-4 py-2">{score.promedio}</td>
        <td className="border px-4 py-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(score._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <>
      <Sidebar />
      <Aside />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex flex-row justify-between mb-4">
            <h1 className="text-3xl font-bold mb-4">Scores</h1>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => navigate(`/newScore/${courseId}`)}
            >
              New Score
            </button>
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Student Name</th>
                <th className="px-4 py-2">Course Name</th>
                <th className="px-4 py-2">Score 1</th>
                <th className="px-4 py-2">Score 2</th>
                <th className="px-4 py-2">Score 3</th>
                <th className="px-4 py-2">Score 4</th>
                <th className="px-4 py-2">Promedio</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>{scoresToDisplay}</tbody>
          </table>
          <div className="flex justify-center mt-4">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoresByCourse;