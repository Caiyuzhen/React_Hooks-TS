import React, { FC, ReactElement } from 'react';
import { ITodoInfo } from '../typings';
import Item from './item'




//🍯子组件（item）需要的参数，父组件（list）也要定义参数类型然后传入
interface IProps {
	todoList: ITodoInfo[],
	toggleTodo: (id: number) => void,
	removeTodo: (id: number) => void //传入 id，类型为 number
}


const TdList :FC<IProps> = ({
	todoList,
	toggleTodo,
	removeTodo
}): ReactElement=> {



	return(
		<div className="td-list">
			{/* 🔥🔥 判读是否传入了 todoList  */}
			{
				todoList && todoList.map((todoInfo: ITodoInfo) => {
					return (
						//💡💡💡这下面只是当作一个参数管道, 最真实的值还是通过最顶层的 index.tsx, 通过 state.todoList 传入参数！！最真实的函数也一样，通过最顶层函数来传入！🌟🌟
						<Item 
							// 🍉要加列表首先要加个 key！
							key={ todoInfo.id }
							todoInfo={ todoInfo }
							toggleTodo={ toggleTodo }
							removeTodo={ removeTodo }
						/>
					)
				})
			}
		</div>
	)
}

export default TdList