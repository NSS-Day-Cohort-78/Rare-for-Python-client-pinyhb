import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../auth/UserProvider"

export const UserDetails = ({ token }) => {
	const { id } = useParams()
	const { user, getUserById, subscribeToUser } = useContext(UserContext)
	const [ subscribed, setSubscribed ] = useState(false)
	const [ subscription, setSubscription ] = useState({
		follower_id: parseInt(token),
		author_id: parseInt(id),
		created_on: new Date().toISOString()
	})

	useEffect(() => {
		getUserById(id)
	}, [])

	useEffect(() => {
		fetch(`http://localhost:8088/subscriptions`).then(res => res.json()).then(data => {
			const isSubscribed = data.some(sub => sub.follower_id === parseInt(token) && sub.author_id === parseInt(id))
			setSubscribed(isSubscribed)
		})
	}, [])

	const handleSubscribe = () => {
		subscribeToUser(subscription).then(() => 
			setSubscribed(!subscribed)
		)
	}

	return (
		<div className="card-container p-5">
			<div className="card">
				<div className="is-flex is-justify-content-center is-align-items-center">
					<div className="card-content">
						<div className="card-image">
							<img
								className="image"
								src={user.profile_image_url}
								alt={user.first_name}
							/>
						</div>
						<p>
							{user.first_name} {user.last_name}
						</p>
					</div>
					<div className="card-content">
						<h2>{user.username}</h2>
						<h2>{user.email}</h2>
						<h2>{user.created_on}</h2>
						<h2>Profile Type?</h2>
					</div>
				</div>	
				{token !== id ? 
					<div className="card-content">
						<div className="content is-flex is-justify-content-center">
							{subscribed ? <button className="button">Subscribed</button> : <button onClick={handleSubscribe} className="button is-link">Subscribe</button>}
						</div>
					</div> 
				: ""}
			</div>
		</div>
	)
}
