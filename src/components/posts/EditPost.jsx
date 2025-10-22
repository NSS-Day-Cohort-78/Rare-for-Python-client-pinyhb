import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "./CategoryProvider"

export const EditPost = () => {
    const { post, getPostById } = useContext(PostContext)
    const { updatedPost, updatePost } = useContext(PostContext) 
    const { categories, getAllCategories } = useContext(CategoryContext)
    const [postObj, setPostObj] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    // const postId = parseInt(id)

    useEffect(() => {
        getPostById(id)
    }, [])

    useEffect(() => {
        setPostObj(post)
    }, [post])

    useEffect(() => {
        getAllCategories()
    }, [])

    const handleSave = (e) => {
        e.preventDefault()

        const postToUpdate = {
            ...postObj,
            category_id: postObj.category.id 
        }
        
        delete postToUpdate.category
        
        updatePost(postToUpdate)
            .then(() => {
                console.log("Post updated successfully!")
                navigate(`/posts/${id}`)
            })
            .catch(error => {
                console.error("Error updating post:", error)
            })
    }

    const handleCancel = () => navigate(`/`)

    return (
        <div>
            <form>
                <div className="field">
                    <label className="label">Title</label>
                        <div className="control">
                            <input 
                                className="input"
                                type="text"
                                placeholder="Type here"
                                value={postObj.title || ""}
                                onChange={(e) => {
                                    const postCopy = { ...postObj }
                                    postCopy.title = e.target.value
                                    setPostObj(postCopy)
                                }}
                            />
                        </div>
                </div>
                <div className="field">
                    <label className="label">Category</label>
                    {/* add category options */}
                        <div className="control">
                            <div className="select">
                                <select
                                    value={postObj.category?.id || ""}
                                    onChange={(e) => {
                                        const postCopy = { ...postObj }
                                        postCopy.category.id = parseInt(e.target.value)
                                        const selectedOption = e.target.selectedOptions[0]
                                        postCopy.category.label = selectedOption.label
                                        setPostObj(postCopy)
                                    }}
                                >
                                    <option value="null">Select category</option>
                                    {categories.map((category) => (
                                        <option value={category.id} key={category.id} className="">{category.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                </div>
                <div className="field">
                    <label className="label">Content</label>
                    {/* add tags */}
                        <textarea 
                            className="textarea"
                            type="text"
                            placeholder="Type here"
                            value={postObj.content || ""}
                            onChange={(e) => {
                                const postCopy = { ...postObj }
                                postCopy.content = e.target.value
                                setPostObj(postCopy)
                            }}
                        ></textarea>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={handleSave}>Save</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}