import { createContext, useState } from "react"

export const SubscriptionContext = createContext()

export const SubscriptionProvider = ({ children }) => {
	const [subscriptions, setSubscriptions] = useState([])
	const getSubscriptions = () => {
		fetch(`http://localhost:8088/subscriptions`)
			.then(res => res.json())
			.then(setSubscriptions)
	}

	return (
		<SubscriptionContext.Provider
			value={{ subscriptions, getSubscriptions }}>
			{children}
		</SubscriptionContext.Provider>
	)
}
