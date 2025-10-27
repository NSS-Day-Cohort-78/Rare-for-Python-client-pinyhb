import React, { useEffect, useState } from "react"

export const TagsCheckbox = ({
	postId,
	t,
	postTags,
	isChecked,
	setIsChecked
}) => {
	const [checked, setChecked] = useState(false)

	useEffect(() => {
		if (checked) {
			const copyIsChecked = [...isChecked]
			const found = copyIsChecked.find(f => f.tag_id === t.id)

			if (!found) {
				copyIsChecked.push({
					post_id: parseInt(postId),
					tag_id: t.id
				})
				setIsChecked(copyIsChecked)
			}
		} else {
			const copyIsChecked = [...isChecked]
			const filteredCopy = copyIsChecked.filter(f => f.tag_id !== t.id)
			setIsChecked(filteredCopy)
		}
	}, [checked, postId, t.id])

	useEffect(() => {
		const filtered = postTags.filter(p => p.tag_id === t.id)
		if (filtered?.length > 0) {
			setChecked(true)
		}
	}, [postTags, t.id])

	const handleChange = e => {
		setChecked(!checked)
	}

	return (
		<div>
			<label name="tags" htmlFor={t.id}>
				{t.label}
			</label>
			<input
				id={t.id}
				name={t.id}
				checked={checked}
				onChange={handleChange}
				type="checkbox"
			/>
		</div>
	)
}
