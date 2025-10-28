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
    const handleKeyDown = e => {
        if (e.key === "Enter") {
            const filteredPostTags = postTags.filter(pt =>
                pt.tag.label.toLowerCase().includes(searchTerm.toLowerCase())
            )
            const postIds = [...new Set(filteredPostTags.map(pt => pt.post?.id))]

            const filteredPosts = posts.filter(p => postIds.includes(p.id))

            setFilteredPosts(filteredPosts)
        }
    }

    return (
        <input
            className="mx-2"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    )
}
