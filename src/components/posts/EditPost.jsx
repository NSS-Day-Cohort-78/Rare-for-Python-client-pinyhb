import { useState } from "react"

export const EditPost = () => {
    const [postObj, setPostObj] = useState({})

    return (
        <div>
            <form>
                <h1>Edit Post</h1>
                <div class="field">
                    <label class="label">Title</label>
                        <div class="control">
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
                <div class="field">
                    <label class="label">Category</label>
                    {/* add category options */}
                        <div class="control">
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
                <div class="field">
                    <label class="label">Content</label>
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
                <button>Cancel</button>
            </form>
        </div>
    )
}