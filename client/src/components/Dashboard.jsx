const Dashboard = ({
  role,
  totalStudents,
  totalTeachers,
  totalGrades,
  totalCourses,
}) => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        {role !== "Admin" && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500 uppercase">
                Welcome {role}
              </p>
            </div>
          </div>
        )}

        {role === "Admin" && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500 uppercase">
                  Welcome {role}
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500 uppercase">{`${totalStudents} ${
                  totalStudents > 1 ? "Students" : "Student"
                }`}</p>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500 uppercase">{`${totalTeachers} ${
                  totalTeachers > 1 ? "Teachers" : "Teacher"
                }`}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500 uppercase">{`${totalGrades} ${
                  totalGrades > 1 ? "Grades" : "Grade"
                }`}</p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500 uppercase">{`${totalCourses} ${
                  totalCourses > 1 ? "Courses" : "Course"
                }`}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
