import React, {useState} from "react";
import {createPost} from "../../features/postsSlice";
import {Post} from "../../features/postsSlice";
import {useAppDispatch} from "../../types/hooks";

const FormCard:React.FC = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<Post>({
        title: "",
        content: "",
        keywords: [],
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        if (name !== 'keywords')
        setFormData({
            ...formData,
            [name]: value,
        })
        else if (value){
            let array: string[] = value.split(', ')
            setFormData({
                ...formData,
                [name]: array,
            })
        } else {
            setFormData({
                ...formData,
                [name]: [],
            })
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try{
            await dispatch(createPost(formData))
        }catch(err){
            console.log(err)
            alert(err)
        }

    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                    Blog Post Submission
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Blog Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter the title"
                            required
                        />
                    </div>
                    {/* Content Input */}
                    <div>
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Blog Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your blog content here..."
                            rows={5}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="keywords"
                            className="block text-sm font-medium text-gray-600"
                        >
                            keywords(split keywords with 'comma + space')
                        </label>
                        <input
                            type="text"
                            id="keywords"
                            name="keywords"
                            value={formData.keywords.join(', ')}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter the title"
                            required
                        />
                    </div>
                    {formData.keywords ? (
                    <div className="flex flex-row flex-wrap gap-1">
                        {formData.keywords.map((str, idx) => (
                            <div key={idx} className="bg-blue-300 p-1.5 w-fit rounded-md text-white">
                                {`${idx + 1}. ${str}`}
                            </div>
                        ))}
                    </div>) : ''
                    }
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Submit Blog Post
                    </button>
                </form>
            </div>
        </div>
    )
}
export default FormCard
