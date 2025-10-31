import { useRef, React, useState, useEffect, useId, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../auth/UserProvider";
import { PostContext } from "./PostProvider";

export const CreatePost = () => {
    const { currentUser, getCurrentUser } = useContext(UserContext)
    const { getAllPosts, uploadImage, getAllCategories, addNewPost } = useContext(PostContext)
    const [categories, setCategories] = useState([])
    const [ image, setImage ] = useState()
    const [ imageUrl, setImageUrl] = useState("")
    const categoryId = useRef()
    const title = useRef()
    const content = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        getAllCategories().then(data => {setCategories(data)})
    }, [])

    const handleUploadImage = async (img) => {
            const data = new FormData()
            data.append("image", img)
            const response = await uploadImage(data)
            setImageUrl(response.data.image.url)
    }

    const handleCreatePost = async (e) => {
        e.preventDefault()

       

        if (
            categoryId.current.value && 
            title.current.value &&  
            content.current.value) {
                if (imageUrl) {
                const userId = localStorage.getItem("auth_token")
                const newPost = {
                    user_id: parseInt(userId),
                    category_id: parseInt(categoryId.current.value),
                    title: title.current.value,
                    image_url: imageUrl,
                    content: content.current.value,
                    approved: currentUser.admin === 1 ? 1 : 0,
                }

                addNewPost(newPost).then(res => {
                    getAllPosts()
                    if (res && res.id) {
                        navigate(`/posts/${res.id}`)
                    } else {
                        navigate("posts/")
                    }
                    })}
            } else {
            console.log("fill out all fields!!!")
            }
    }

    return (
        <>
            <section>
                <form>
                    <h1 className="title">Create a post</h1>
                    <div className="field">
                        <label className="label">Category:</label>
                        <div className="control">
                            <select  ref={categoryId}>
                                <option value="">Select...</option>
                                {categories.map((category) => {
                                    return <option key={category.id} value={category.id}>{category.label}</option>
                                })}
                            </select>
                        </div>
                        <label className="label">Title:</label>
                        <div className="control">
                            <input className="input" type="text" ref={title} />
                        </div>
                        <label className="label">Image URL:</label>
                        <div className="control">
                            <input className="input" type="file" onChange={(e) => handleUploadImage(e.target.files[0])}/>
                        </div>
                        <label className="label">Content:</label>
                        <div>
                            <input className="input" type="text" ref={content} />
                        </div>
                        <div>
                            <button onClick={async (e) => {
                                await handleCreatePost(e)}}>Save</button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}