import React from "react";
import CounterComponent from "../counter";
import PostsComponent from "../components/PostsComponent";

const HomeView: React.FC = () => {
    return (
        <div>
            <header className="App-header">
                <div><CounterComponent/></div>
            </header>
            <div className="bg-slate-700"><PostsComponent/></div>
        </div>
    )
}
export default HomeView
