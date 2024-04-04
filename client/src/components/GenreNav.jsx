import { Link } from "react-router-dom";

export function GenreNav() {

    return (
        <div id="navbar">
            <Link to="/fantasy">
                Fantasy
            </Link>
            <Link to="/scifi">
                Sci-Fi
            </Link>
            <Link to="/nonfiction">
                Non-Fiction
            </Link>
            <Link to="/Historical">
               Historical
            </Link>
        </div>
    );
}