import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"

export const TagsSearchBar = ({ setFilteredPosts, posts }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const { postTags, getAllPostTags } = useContext(PostContext)

    useEffect(() => {
        getAllPostTags()
    }, [])

    const handleChange = e => {
        setSearchTerm(e.target.value)
    }
    const handleKeyDown = () => {
            const filteredPostTags = postTags.filter(pt =>
                pt.tag.label.toLowerCase().includes(searchTerm.toLowerCase())
            )
            const postIds = [...new Set(filteredPostTags.map(pt => pt.post?.id))]

            const filteredPosts = posts.filter(p => postIds.includes(p.id))

            setFilteredPosts(filteredPosts)
    }

    return (
        <div className="field has-addons">
            <p className="control">
                <input
                    className="mx-2 input"
                    type="text"
                    placeholder="Search by tag"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </p>
            <p className="control">
            <button onClick={handleKeyDown} className="button">Search</button>
            </p>
        </div>
    )
}
