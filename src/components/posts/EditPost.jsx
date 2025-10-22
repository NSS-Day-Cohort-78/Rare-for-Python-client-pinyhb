import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById } from "./PostProvider"

export const EditPost = () => {
    const [postObj, setPostObj] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    const postId = parseInt(id)

    useEffect(() => {
        getPostById(postId).then((postArr) => {
            if (postArr && postArr.length > 0) {
                setPostObj(postArr[0])
            }
        })
    }, [postId])

    const handleCancel = () => navigate(`/`)

    return (
        <div>
            <form>
                <h1>Edit Post</h1>
                <div className="field">
                    <label className="label">Title</label>
                        <div className="control">
                            <input 
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
                            <select
                                value={postObj.category_id || ""}
                                onChange={(e) => {
                                    const postCopy = { ...postObj }
                                    postCopy.category_id = parseInt(e.target.value)
                                    setPostObj(postCopy)
                                }}
                            />
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
                <button>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}