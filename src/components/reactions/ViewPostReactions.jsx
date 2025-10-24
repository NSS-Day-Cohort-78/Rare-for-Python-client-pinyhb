import React, { useContext, useEffect } from "react"
import { ReactionsContext } from "./ReactionsProvider"

export const ViewPostReactions = () => {
	const { postReactions, getReactionsByPostId } = useContext(ReactionsContext)

	useEffect(() => {
		getReactionsByPostId(1)
	}, [])
	return <div>ViewPostReactions</div>
}
