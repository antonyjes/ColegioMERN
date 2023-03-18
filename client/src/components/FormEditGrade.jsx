import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FormEditGrade = ({gradeData, setGradeData, level}) => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    const [gradeName, setGradeName] = useState("");
    const [levelName, setLevelName] = useState(level);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3003/grades/${gradeData._id}/edit`, {
            method: "PATCH",
            headers: {Authorization: `Bearer ${token}`},
            body: JSON.stringify({gradeName: gradeName, level: level}),
        });
        const updatedGrade = await response.json();
        setGradeData(updatedGrade);
        console.log("Grade updated");
        navigate(`/grades/${level}`);
    }
    return(
        <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex flex-row justify-between mb-4">
            <h1 className="text-3xl font-bold mb-4">New Grade</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Grade Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1° A"
                  required
                  value={gradeName}
                  onChange={(e) => setGradeName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Level
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                  required
                  value={levelName}
                  onChange={(e) => setLevelName(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
}

export default FormEditGrade;