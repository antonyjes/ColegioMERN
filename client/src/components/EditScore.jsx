import Sidebar from "./Sidebar";
import Aside from "./Aside";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FormEditScore from "./FormEditScore";

const EditScore = () => {
    const token = useSelector((state) => state.token);
    const {courseId, gradeId, scoreId} = useParams();
    const [scoreData, setScoreData] = useState(null);

    const getScore = async () => {
        const response = await fetch(`http://localhost:3003/scores/${scoreId}/score`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        setScoreData(data);
    };

    useEffect(() => {
        getScore();
    }, []); // eslint-disable-line

    if (!scoreData) return null;

    return(
        <>
            <Sidebar />
            <Aside />
            <FormEditScore scoreData={scoreData} setScoreData={setScoreData} courseId={courseId} gradeId={gradeId} />
        </>
    )
};

export default EditScore;