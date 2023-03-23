import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Aside from "./Aside";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";

const HomePage = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalTeachers, setTotalTeachers] = useState(0);

    const countStudents = async () => {
        const response = await fetch("http://localhost:3003/students/count/all", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        setTotalStudents(data);
    };

    const countTeachers = async () => {
        const response = await fetch("http://localhost:3003/teachers/count/all", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        setTotalTeachers(data);
    }

    useEffect(() => {
        countStudents();
        countTeachers();
    }, []) // eslint-disable-line

    return(
        <div>
            <Sidebar/>
            <Aside />
            <Dashboard role={user.role} totalStudents={totalStudents} totalTeachers={totalTeachers} />
        </div>
    )
}

export default HomePage;