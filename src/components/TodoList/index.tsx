import React, { FC, ReactElement, useCallback, useEffect, useReducer, useState } from 'react';
import TdInput from './Input'
import TdList from './List'
import { ACTIONS_TYPE, IState, ITodoInfo } from './typings';
import { todoReducer } from './reducer';






// 🔥这个顶层组件【不传值】就不用写 <props> 范型
const MainTodoList:FC = ():ReactElement => {

	/*方法一: useState 方法: 定义 todo 以及添加 todo 到数组的方法, 返回值为 <ITodoInfo[]> 数组类型的范型 */
	// const [todoList, setTodoList] = useState<ITodoInfo[]>([])


	
	/*方法二: useReducer 方法: 会返回【函数】如 todoReducer、 【初始化的 state】如 initState*/
	// const initState: IState = {
	// 	todoList: [],//初始值为空数组
	// }

	// 惰性初始化, 用到的时候才会初始化, 因此可以替代上面这个 const initState 的方法
	function init (initTodoList : ITodoInfo[]): IState{//用函数来创造 state, 如果函数不执行，就没有 state
		return {
			todoList: initTodoList//初始化的参数，类型是 ITodoInfo[]
		}
	}

	// const [state, dispatch2] = useReducer(todoReducer, initState)
	const [state, dispatch2] = useReducer(todoReducer, [], init)//惰性初始化，初始 state 是 [], 当 useReducer 执行时才会执行 init 函数, 把 [] 变成 init 函数的返回值
	/*  
		state 为 todoReducer 返回的【最终状态】
		dispatch2 为给【增删改函数】传入参数的方法, 负责发送信号给 Reducer 开始处理状态！ ！【类似 useState 的 setTodoList！】
		todoReducer 为独立的一个做状态管理的文件，单独写
		initState 为初始值

		//🔥🔥todoReducer(state, action), 包含两个参数，action 包含 {type，payload} 两个对象！
	*/


	useEffect(()=>{
		// console.log(todoList);
		console.log(state.todoList)
	},[state.todoList])




	//获取最新的本地存储，如果本地存储没有 todoList, 就取空数组
	useEffect(()=>{
		const todoList = JSON.parse(localStorage.getItem('todolist') ?? '[]' )//?? 为【空值合并运算符】，在左侧的值是【 null 或 undefined 时】会【返回 ?? 问号右边的表达式】

		dispatch2({
			type: ACTIONS_TYPE.INIT_TODOLIST,
			payload: todoList//设置 todoList 的值
		})
	},[])

	


	//每次进行 remove、add、toggle 等操作时，都会触发这个 useEffect(因为state.todoList会改变), 用来更新本地存储
	useEffect(()=>{
		localStorage.setItem('todolist', JSON.stringify(state.todoList)) //每次 todoList 有改变的时候，把数据保存到 localStorage
	},[state.todoList])



	
	/*定义具体（子组件函数）的方法, 相当于获得子组件函数的引用 
		建议如果下层【子组件的方法】如果是【父组件传递过去的话】, 尽量用 【🔥🔥useCallback】来包裹, 避免父组件一更新子组件就更新, 会有性能问题
	*/

	// 方法一: 结合上面 useState 方法: 
	// const addTodoFatherFn = useCallback((todoInfo: ITodoInfo) => {  // ITodoInfo 类型
	// 	setTodoList(todoList => [...todoList, todoInfo]) //🌟先把 todoList 在一个新的数组用扩展运算符展开 [...todoList] , ⚡️然后再把新的 todoInfo 放到这个数组内
	// 	console.log(todoInfo)
	// },[])//没有依赖项



	/*方法二: useReducer 方法:*/
	//⚡️⚡️一：定义添加 todo 的方法，结合 useReducer 
	const addTodoFatherFn = useCallback((todoInfo: ITodoInfo): void => {
		//用 reducer 的方法来添加 todo， 用🔥🔥 dispatch 来触发 reducer 的方法去【改变状态】
		dispatch2({
			type: ACTIONS_TYPE.ADD_TODO,
			payload: todoInfo,
		})
	},[])


	const toggleTodoFn = useCallback((id: number): void=>{
		dispatch2({
			type: ACTIONS_TYPE.TOGGLE_TODO,
			payload: id
		})
	},[])


	const removeTodoFn = useCallback((id: number): void=>{
		dispatch2({
			type: ACTIONS_TYPE.REMOVE_TODO,
			payload: id
		})
	},[])




	return (
		<div className="todo-list">
			{/* // 方法一: 结合上面 useState 方法, 传入上方的 【todoList 数组】跟 【addTodoFatherFn 函数】*/}
			{/* <TdInput  todoList={ todoList } addTodo={ addTodoFatherFn }/> */}


			{/* // 方法二: 结合上面 useReducer 方法, 传入上方的 【todoList 数组】跟 【addTodoFatherFn 函数】*/}
			{/* ⚡️⚡️二：将函数方法传给【子组件】 */}
			<TdInput  todoList={ state.todoList } addTodo={ addTodoFatherFn }/>


			{/* 👇💡💡💡这个最顶层的组件就是用来传递【最真实的值、最真实的函数】给底下的子组件的🌟🌟 */}
			<TdList 
				todoList={ state.todoList }
				toggleTodo={ toggleTodoFn }
				removeTodo={ removeTodoFn }
			/>
		</div>
	)
}

export default MainTodoList