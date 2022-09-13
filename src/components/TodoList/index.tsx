import React, { FC, ReactElement, useCallback } from 'react';
import TdInput from './Input'
import TdList from './List'
import { ITodo } from './typings';


// 不传值就不用写 <props> 范型
const MainTodoList:FC = ():ReactElement => {


	//定义具体（子组件内）的方法
	//建议如果【子组件的方法】是【父组件传递进来的话】, 尽量用 【🔥🔥useCallback】来包裹
	const addTodo = useCallback((todo: ITodo) => {  //接收 ITodo 类型的参数

	},[])


	



	return (
		<div className="todo-list">
			<TdInput addTodo={ addTodo } todoList={ todoList }/>
			<TdList />
		</div>
	)
}

export default MainTodoList