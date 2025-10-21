import { useContext, useEffect, useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { UserContext } from "./components/auth/UserProvider"

export const Rare = () => {
	// const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
	const { token, setTokenState } = useContext(UserContext)

	useEffect(() => {
		setTokenState(localStorage.getItem("auth_token"))
	}, [])

	const setToken = newToken => {
		localStorage.setItem("auth_token", newToken)
		setTokenState(newToken)
	}

	return (
		<>
			<NavBar token={token} setToken={setToken} />
			<ApplicationViews token={token} setToken={setToken} />
		</>
	)
}
