import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../auth/UserProvider"
import { SubscriptionContext } from "../subscriptions/SubscriptionProvider"

export const UserDetails = ({ token }) => {
	const { id } = useParams()
	const { user, getUserById, subscribeToUser } = useContext(UserContext)
	const [subscribed, setSubscribed] = useState(false)
	const [subscription, setSubscription] = useState(null)
	const {
		getSubscriptionByFollowerId,
		unsubscribeToUser,
		resubscribeToUser
	} = useContext(SubscriptionContext)

	useEffect(() => {
		getUserById(id)

		getSubscriptionByFollowerId(token, id).then(setSubscription)
	}, [token, id])

	useEffect(() => {
		if (subscription && subscription.ended_on === null) {
			setSubscribed(true)
		} else if (
			subscription &&
			subscription.ended_on < subscription.created_on
		) {
			setSubscribed(true)
		} else {
			setSubscribed(false)
		}
	}, [subscription])

	const handleSubscribe = () => {
		if (subscription) {
			resubscribeToUser(subscription.id, subscription)
				.then(() => getSubscriptionByFollowerId(token, id))
				.then(setSubscription)
		} else {
			const data = {
				follower_id: parseInt(token),
				author_id: parseInt(id)
			}
			subscribeToUser(data)
				.then(() => getSubscriptionByFollowerId(token, id))
				.then(setSubscription)
		}
	}

	const handleUnsubscribe = () => {
		// add end date to db
		unsubscribeToUser(subscription.id, subscription)
			.then(() => getSubscriptionByFollowerId(token, id))
			.then(setSubscription)
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
						<h2>{user.admin ? "Admin" : "Author"}</h2>
						{token === id && user.subscribers > 0 ? (
							<h2>
								{user.subscribers} Subscriber
								{user.subscribers > 1 ? "s" : ""}
							</h2>
						) : (
							""
						)}
					</div>
				</div>
				{token !== id ? (
					<div className="card-content">
						<div className="content is-flex is-justify-content-center">
							{subscribed ? (
								<button
									onClick={handleUnsubscribe}
									className="button is-link">
									Unsubscribe
								</button>
							) : (
								<button
									onClick={handleSubscribe}
									className="button is-link">
									Subscribe
								</button>
							)}
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	)
}
