import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTeachers } from "state";
import ReactPaginate from "react-paginate";
import Sidebar from "./Sidebar";
import Aside from "./Aside";
import { useNavigate } from "react-router-dom";

const Teachers = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers);
  const token = useSelector((state) => state.token);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const getTeachers = async () => {
    const response = await fetch("http://localhost:3003/teachers", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setTeachers({ teachers: data }));
  };

  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(teachers.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const handleDelete = async (teacherId) => {
    const response = await fetch(
      `http://localhost:3003/teachers/${teacherId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    console.log("Teacher deleted");
    getTeachers();
  };

  useEffect(() => {
    getTeachers();
  }, []); // eslint-disable-line

  const teachersToDisplay = teachers
    .slice(offset, offset + PER_PAGE)
    .map((teacher) => (
      <tr key={teacher._id}>
        <td className="border px-4 py-2">{teacher.firstName}</td>
        <td className="border px-4 py-2">{teacher.lastName}</td>
        <td className="border px-4 py-2">{teacher.email}</td>
        <td className="border px-4 py-2">{teacher.phone}</td>
        <td className="border px-4 py-2"><img className="w-16 h-16 mx-auto rounded-full object-cover" src={`http://localhost:3003/assets/teachers/${teacher.picturePath}`} alt={`${teacher.firstName} pict`} /></td>
        <td className="border px-4 py-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Edit
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(teacher._id)}>
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
            <h1 className="text-3xl font-bold mb-4">Teachers</h1>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => navigate("/newTeacher")}>
              New teacher
            </button>
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Image Teacher</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>{teachersToDisplay}</tbody>
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

export default Teachers;
