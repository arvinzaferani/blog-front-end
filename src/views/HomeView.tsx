import React from "react";
import CounterComponent from "../counter";

const HomeView: React.FC = () => {
    return (
        <div>
            <header className="App-header">
                <div><CounterComponent/></div>
            </header>
        </div>
    )
}
export default HomeView
