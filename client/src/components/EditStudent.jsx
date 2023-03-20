import Sidebar from "./Sidebar";
import Aside from "./Aside";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormEditStudent from "./FormEditStudent";

const EditStudent = () => {
    const token = useSelector((state) => state.token);
    const {gradeId, studentId} = useParams();
    const [studentData, setStudentData] = useState(null);

    const getStudent = async () => {
        const response = await fetch(`http://localhost:3003/students/${studentId}/student`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        setStudentData(data);
    };

    useEffect(() => {
        getStudent();
    }, []); // eslint-disable-line

    if (!studentData) return null;

    return(
        <>
            <Sidebar />
            <Aside />
            <FormEditStudent studentData={studentData} setStudentData={setStudentData} gradeId={gradeId} />
        </>
    )
}

export default EditStudent;