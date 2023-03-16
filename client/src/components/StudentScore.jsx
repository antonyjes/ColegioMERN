import Aside from "./Aside";
import Sidebar from "./Sidebar";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setScores } from "state";

const StudentScore = () => {
  const dispatch = useDispatch();
  const scores = useSelector((state) => state.scores);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(0);

  const getScoresRecord = async () => {
    const response = await fetch(
      `http://localhost:3003/scores/${user._id}/student`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setScores({scores: data}));
  };

  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(scores.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    getScoresRecord();
  }, []); // eslint-disable-line

  const scoresToDisplay = scores
  .slice(offset, offset + PER_PAGE)
  .map((score) => (
    <tr key={score._id}>
      <td className="border px-4 py-2">{score.courseName}</td>
      <td className="border px-4 py-2">{score.studentName}</td>
      <td className="border px-4 py-2">{score.period}</td>
      <td className="border px-4 py-2">{score.score1}</td>
      <td className="border px-4 py-2">{score.score2}</td>
      <td className="border px-4 py-2">{score.score3}</td>
      <td className="border px-4 py-2">{score.score4}</td>
      <td className="border px-4 py-2">{score.promedio}</td>
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
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">Period</th>
                <th className="px-4 py-2">Score1</th>
                <th className="px-4 py-2">Score2</th>
                <th className="px-4 py-2">Score3</th>
                <th className="px-4 py-2">Score4</th>
                <th className="px-4 py-2">Promedio</th>
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

export default StudentScore;