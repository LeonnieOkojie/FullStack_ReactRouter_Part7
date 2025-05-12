import React from "react";
import BlogList from "./Blog";

const Home = ({blogs}) => {
    return (
        <div>
            <BlogList blogs={blogs}/>
        </div>
    )
}

export default Home