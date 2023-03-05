import { useSelector } from "react-redux";

const HomePage = () => {
    const user = useSelector((state) => state.user);
    return(
        <div>
            <p>Welcome {user.role}</p>
        </div>
    )
}

export default HomePage;