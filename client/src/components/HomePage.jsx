import { useSelector } from "react-redux";
import Aside from "./Aside";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";

const HomePage = () => {
    const user = useSelector((state) => state.user);
    return(
        <div>
            <Sidebar userName={`${user.firstName} ${user.lastName}`} />
            <Aside />
            <Dashboard role={user.role} />
        </div>
    )
}

export default HomePage;