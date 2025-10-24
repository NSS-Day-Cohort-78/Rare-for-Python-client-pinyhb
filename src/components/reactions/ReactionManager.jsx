import React, { useContext, useEffect } from "react"
import { ReactionsContext } from "./ReactionsProvider"
import { ReactionsList } from "./ReactionsList"
import { CreateReactionsForm } from "./CreateReactionsForm"

export const ReactionManager = () => {
	const { createReaction, getReactions, reactions } =
		useContext(ReactionsContext)

	useEffect(() => {
		getReactions()
	}, [])
	return (
		<div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
			<h1 className="title mt-5">Reaction Manager</h1>
			<div className="is-flex is-align-items-center is-justify-content-space-around">
				<div>
					{reactions.map(r => (
						<ReactionsList key={r.id} reaction={r} />
					))}
				</div>
				<CreateReactionsForm
					createReaction={createReaction}
					getReactions={getReactions}
				/>
			</div>
		</div>
	)
}
