import React from 'react';
import TdInput from './Input'
import TdItem from './List/item'


const MainTodoList = () => {
	return (
		<div className="todo-list">
			<TdInput />
			<TdItem />
		</div>
	)
}

export default MainTodoList