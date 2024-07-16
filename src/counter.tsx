import React, {useState} from "react";
const CounterComponent: React.FC = () =>  {
    const [counter, setCounter] = useState(0)
    const increment = () => {
        setCounter( counter => counter + 1)
    }
    return(
        <div>
            value: {counter}<button onClick={increment}>increment</button>
        </div>
    )
}
export default CounterComponent
