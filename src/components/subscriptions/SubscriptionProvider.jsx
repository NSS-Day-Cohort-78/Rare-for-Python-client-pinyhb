import { createContext, useState } from "react"

export const SubscriptionContext = createContext()

export const SubscriptionProvider = ({ children }) => {
	const [subscriptions, setSubscriptions] = useState([])

	const getSubscriptions = () => {
		fetch(`http://localhost:8088/subscriptions`)
			.then(res => res.json())
			.then(setSubscriptions)
	}

	const getSubscriptionByFollowerId = (follower, author) => {
		return fetch(
			`http://localhost:8088/subscriptions/${follower}?author=${author}`
		).then(res => res.json())
	}

	const unsubscribeToUser = (id, body) => {
		return fetch(`http://localhost:8088/unsubscribe/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
	}

	const resubscribeToUser = (id, body) => {
		return fetch(`http://localhost:8088/resubscribe/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
	}

	return (
		<SubscriptionContext.Provider
			value={{
				subscriptions,
				getSubscriptions,
				getSubscriptionByFollowerId,
				unsubscribeToUser,
				resubscribeToUser
			}}>
			{children}
		</SubscriptionContext.Provider>
	)
}
