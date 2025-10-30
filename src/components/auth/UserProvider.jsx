import { createContext, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [token, setTokenState] = useState(localStorage.getItem("auth_token"))

	const [users, setUsers] = useState([])
	const [user, setUser] = useState({})
	const [currentUser, setCurrentUser] = useState({})
	const [userDemotion, setUserDemotion] = useState({})

	const getUsers = () => {
		fetch(`http://localhost:8088/users`)
			.then(res => res.json())
			.then(setUsers)
	}

	const getUserById = id => {
		fetch(`http://localhost:8088/users/${id}`)
			.then(res => res.json())
			.then(setUser)
	}

	const subscribeToUser = subscription => {
		return fetch(`http://localhost:8088/subscriptions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(subscription)
		})
	}

	const getCurrentUser = id => {
		fetch(`http://localhost:8088/users/${id}`)
			.then(res => res.json())
			.then(setCurrentUser)
	}

	const updateUserInfo = (id, body) => {
		return fetch(`http://localhost:8088/users/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
	}

	const activateUser = (id, body) => {
		return fetch(`http://localhost:8088/activate-user/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
	}

	const getUserDemotionQueue = id => {
		fetch(`http://localhost:8088/demotion/${id}`)
			.then(res => res.json())
			.then(setUserDemotion)
	}

	const updateUserDemotion = (id, body) => {
		return fetch(`http://localhost:8088/demotion/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
	}

	return (
		<UserContext.Provider
			value={{
				token,
				setTokenState,
				users,
				getUsers,
				user,
				getUserById,
				subscribeToUser,
				getCurrentUser,
				currentUser,
				updateUserInfo,
				activateUser,
				getUserDemotionQueue,
				userDemotion,
				updateUserDemotion
			}}>
			{children}
		</UserContext.Provider>
	)
}
