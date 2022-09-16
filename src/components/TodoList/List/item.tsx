import React, { FC, ReactElement } from 'react';
import { ITodoInfo } from '../typings'




//定义接口继承接口(⚡️⚡️也表明了这个子函数需要传入接口所定义的数据！！），IProps 本身是个对象
interface IProps {
	// 🔥第一步: 定义各种参数的类型
	todoInfo: ITodoInfo,
	toggleTodo: (id: number) => void, //函数类型，参数是 number 类型，返回值是 void
	removeTodo: (id: number) => void //函数类型，也是通过 id 找到对应的 todo 并删除
}



// 🔥第二步: 传入 todoInfo, toggleTodo, removeTodoL 三个参数
const Item:FC<IProps> = ( {todoInfo, toggleTodo, removeTodo} ): ReactElement => {



	const {id, content, complete} = todoInfo//解构 todoInfo 这个 Props 里的 id 跟 complete




	return(
		<div className="todo-item">
			{/* 🔥第三步: 添加事件 */}
			<input 
				type="checkbox" 
				checked={ complete } 
				onChange={ () => toggleTodo(id) }
			/>

			{/* 判断是否为 complete，如果是 complete，就添加删除线 */}
			<span 
				style={{textDecoration: complete ? 'line-through' : 'none'}}
				> {content}
			</span>

			{/*  🔥第三步: 添加 todo 事件 */}
			<button onClick={ ()=> removeTodo(id) }>移除</button>
		</div>
	)
}

export default Item