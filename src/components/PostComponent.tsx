import React from "react";

import {Post} from "../features/dataSlice";

interface ListProps {
    item: Post,
}

const PostComponent: React.FC<ListProps> = ({item}) => {
    return (
        <div className="row">
            <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 mx-3.5 text-black mb-2 text-xs relative color bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5  rounded-lg  ">
                <div className="mb-2">{item.title}</div>
                <div>{item.body}</div>
            </div>
        </div>
    )
}
export default PostComponent
