import { useRef, React, useState, useEffect, useId, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "./PostProvider";
import { addNewPost } from "./PostProvider";
import { UserContext } from "../auth/UserProvider";
import { PostContext } from "./PostProvider";

export const CreatePost = () => {
    const { currentUser, getCurrentUser } = useContext(UserContext)
    const { getAllPosts } = useContext(PostContext)
    const [categories, setCategories] = useState([])
    const categoryId = useRef()
    const title = useRef()
    const imageUrl = useRef()
    const content = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        getAllCategories().then(data => {setCategories(data)})
    }, [])

    const handleCreatePost = (e) => {
        e.preventDefault()

        if (
            categoryId.current.value && 
            title.current.value && 
            imageUrl.current.value && 
            content.current.value) {
                const userId = localStorage.getItem("auth_token")
                const newPost = {
                    user_id: parseInt(userId),
                    category_id: parseInt(categoryId.current.value),
                    title: title.current.value,
                    image_url: imageUrl.current.value,
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
                    })
            } else {
            console.log("fill out all fields!!!")
            }
    }

    return (
        <div className="container">
            <section>
                <form>
                    <h1 className="title is-flex is-justify-content-center">Create a post</h1>
                    <div className="field">
                        <div className="is-flex is-justify-content-center p-2">
                            <label className="label mr-4">Category:</label>
                            <div className="control">
                                <select  ref={categoryId}>
                                    <option value="">Select...</option>
                                    {categories.map((category) => {
                                        return <option key={category.id} value={category.id}>{category.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="p-2">
                            <label className="label">Title:</label>
                            <div className="control">
                                <input className="input" type="text" ref={title} />
                            </div>
                        </div>
                        <div className="p-2">
                            <label className="label">Image URL:</label>
                            <div className="control">
                                <input className="input" type="text" ref={imageUrl} />
                            </div>
                        </div>
                        <div className="p-2">
                            <label className="label">Content:</label>
                            <div>
                                <textarea className="input" type="text" ref={content} />
                            </div>
                        </div>
                        <div className="is-flex is-justify-content-center p-2">
                            <button className="button" onClick={handleCreatePost}>Save</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}