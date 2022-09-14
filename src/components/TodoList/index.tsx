import React, { FC, ReactElement, useCallback, useEffect, useReducer, useState } from 'react';
import TdInput from './Input'
import TdList from './List'
import { ACTIONS_TYPE, IState, ITodo } from './typings';
import { todoReducer } from './reducer';



// 【不传值】就不用写 <props> 范型
const MainTodoList:FC = ():ReactElement => {


	/*方法一: useState 方法: 定义 todo 以及添加 todo 到数组的方法, 返回值为 <ITodo[]> 数组类型的范型 */
	// const [todoList, setTodoList] = useState<ITodo[]>([])

	/*方法二: useReducer 方法: 会返回【函数】如todoReducer、 【初始化的 state】如 initState*/
	const initState: IState = {
		todoList: [],//初始值为空数组
	}

	const [state, dispatch2] = useReducer(todoReducer, initState)


	/*定义具体（子组件函数）的方法, 相当于获得子组件函数的引用 
		建议如果下层【子组件的方法】如果是【父组件传递过去的话】, 尽量用 【🔥🔥useCallback】来包裹, 避免父组件一更新子组件就更新, 会有性能问题
	*/

	// 方法一: 结合上面 useState 方法: 
	// const addTodoFatherFn = useCallback((todoInfo: ITodo) => {  // ITodo 类型
	// 	setTodoList(todoList => [...todoList, todoInfo]) //🌟先把 todoList 在一个新的数组用扩展运算符展开 [...todoList] , ⚡️然后再把新的 todoInfo 放到这个数组内
	// 	console.log(todoInfo)
	// },[])//没有依赖项

	/*方法二: 结合上面 useReducer 方法:*/
	const addTodoFatherFn = useCallback((todoInfo: ITodo) => {
		//用 reducer 的方法来添加 todo， 用🔥🔥 dispatch 来触发 reducer 的方法去【改变状态】
		dispatch2({
			type: ACTIONS_TYPE.ADD_TODO,
			payload: todoInfo,
		})
	},[])



	useEffect(()=>{
		// console.log(todoList);
		console.log(state.todoList);
	},[state.todoList])



	return (
		<div className="todo-list">
			{/* // 方法一: 结合上面 useState 方法, 传入上方的 【todoList 数组】跟 【addTodoFatherFn 函数】*/}
			{/* <TdInput  todoList={ todoList } addTodo={ addTodoFatherFn }/> */}

			{/* // 方法二: 结合上面 useReducer 方法, 传入上方的 【todoList 数组】跟 【addTodoFatherFn 函数】*/}
			<TdInput  todoList={ state.todoList } addTodo={ addTodoFatherFn }/>
			<TdList />
		</div>
	)
}

export default MainTodoList