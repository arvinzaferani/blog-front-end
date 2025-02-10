import React, {useEffect, useState} from "react";
import {createPost, updatePost} from "../../features/postsSlice";
import {Post} from "../../features/postsSlice";
import {useAppDispatch} from "../../types/hooks";
import LoadingUi from "../ui/LoadingUi";
import {useNavigate} from "react-router-dom";
interface FormProps  {
    initialData?: Post| null
    loading?: boolean
}
const FormCard:React.FC<FormProps> = ({initialData, loading}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [variant, setVariant] = useState <'create' | 'update'>('create')
    useEffect(() => {
        if (initialData) {
            setVariant('update')
            setFormData({
                title: initialData.title,
                content: initialData.content,
                keywords: initialData.keywords,
            })
        }
        else
            setVariant('create')
    }, [initialData]);
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
            if (variant === 'create')
                await dispatch(createPost(formData)).unwrap()
            if (variant === 'update')
                await dispatch(updatePost({...formData, _id: initialData?._id})).unwrap()
            navigate('/posts')
            setFormData({
                title: "",
                content: "",
                keywords: [],
            })
        } catch(err){
        }

    }
    return(
        <div className="min-h-screen flex items-center justify-center ">
            <div
                className="bg-white dark:bg-black border shadow-md shadow-gray-400 rounded p-6 max-w-md flex flex-col justify-start items-center w-full gap-6">

            { loading &&
                    (
                        <div className="absolute h-full w-full flex flex-row justify-center items-center backdrop-blur z-10">
                            <LoadingUi/>
                        </div>
                    )
                }
                <div className='relative w-full h-full p-6 z-0'>
                    { variant === 'create' &&
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4 text-center  ">
                        Blog Post Submission
                    </h2> }
                    { variant === 'update' &&
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4 text-center  ">
                        Update Blog Post
                    </h2> }
                    <form onSubmit={handleSubmit} className="space-y-4  ">
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
                                className="w-full bg-white dark:bg-black text-black dark:text-white px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter the title"
                                required
                            />
                        </div>
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
                                className="w-full bg-white dark:bg-black text-black dark:text-white px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="w-full bg-white dark:bg-black text-black dark:text-white px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter the title"
                                required
                            />
                        </div>
                        {formData.keywords ? (
                            <div className="flex flex-row flex-wrap gap-1">
                                {formData.keywords.map((str, idx) => (
                                    <div key={idx} className="bg-gray-300 dark:bg-gray-700 p-1.5 w-fit rounded text-black dark:text-white">
                                        {`${idx + 1}. ${str}`}
                                    </div>
                                ))}
                            </div>) : ''
                        }
                        {variant === 'create' &&
                            <button
                                type="submit"
                                className="px-6 py-2 bg-white dark:bg-black text-black dark:text-white border rounded hover:bg-white hover:text-black duration-300"
                            >
                                Submit Blog Post
                            </button>
                        }
                        {
                            variant === 'update' &&
                            <button
                                type="submit"
                                className="px-6 py-2 bg-white dark:bg-black text-black dark:text-white border rounded hover:bg-white hover:text-black duration-300"
                            >
                                Update Blog Post
                            </button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
export default FormCard
