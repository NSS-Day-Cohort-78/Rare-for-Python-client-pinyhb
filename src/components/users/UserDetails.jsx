import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../auth/UserProvider"

export const UserDetails = () => {
	const { id } = useParams()
	const { user, getUserById } = useContext(UserContext)

	useEffect(() => {
		getUserById(id)
	}, [])

	return (
		<div className="card-container p-5">
			<div className="card is-flex is-justify-content-center is-align-items-center">
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
		</div>
	)
}
