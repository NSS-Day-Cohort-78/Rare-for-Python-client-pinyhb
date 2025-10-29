import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { PostList } from "./PostList"
import { SearchBar } from "./SearchBar"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { FilterCategory } from "./FilterCategory"
import { TagsSearchBar } from "./TagsSearchBar"
import { UserContext } from "../auth/UserProvider"

export const SubscribedPosts = () => {
   const { posts, getAllPosts } = useContext(PostContext)
    const token = useContext(UserContext).token
    const { user } = useParams()
    const [filteredPosts, setFilteredPosts] = useState()
    const navigate = useNavigate()
    const [ subscribedTo, setSubscribedTo ] = useState([])
   
    const navCreatePost = () => {
        navigate("/create-post")
    }
   
    useEffect(() => {
        getAllPosts()
    }, [])	
    
    useEffect(() => {
        fetch(`http://localhost:8088/subscriptions`)
            .then(res => res.json())
            .then(data => {
                const subscribedUsers = data.filter(sub => sub.follower_id === parseInt(token) && (sub.ended_on === null || sub.ended_on < sub.created_on))
                setSubscribedTo(subscribedUsers)
            }
        )
    }, [token])
   
    useEffect(() => {
        if (subscribedTo.length > 0) {
            const subscribedPosts = posts.filter(post => 
                subscribedTo.some(sub => sub.author_id === post.user.id)
            )
            setFilteredPosts(subscribedPosts)
        } else {
            setFilteredPosts(posts)
        }
    }, [posts, user, subscribedTo])
   
    return (
        <>
            <div className="container is-flex is-flex-direction-row is-justify-content-space-evenly p-5">
                <div className="is-grouped is-flex is-flex-direction-row">
                    <p>Search by title:</p>
                    <SearchBar setFilteredPosts={setFilteredPosts} posts={posts} />
                </div>
                <div className="is-grouped is-flex is-flex-direction-row">
                    <p>Search by tag:</p>
                    <TagsSearchBar setFilteredPosts={setFilteredPosts} posts={posts} />
                </div>
                <FilterCategory
                    setFilteredPosts={setFilteredPosts}
                    posts={posts}
                />
            </div>
            <div className="buttons has-addons is-right">
                <button className="button is-link is-focused" onClick={navCreatePost}>Create Post</button>
            </div>
            <div className="p-5 container">
                <table className=" table is-bordered is-fullwidth">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts &&
                            filteredPosts.map(post =>
                                post.approved ? (
                                    <PostList key={post.id} post={post} />
                                ) : (
                                    ""
                                )
                            )}
                    </tbody>
                </table>
            </div>
        </>
    )
   }
   