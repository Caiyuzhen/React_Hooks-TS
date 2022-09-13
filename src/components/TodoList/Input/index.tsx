import React, { useRef, FC, ReactElement } from 'react';
import { ITodo } from '../typings';

/*
	hooks:
		useRef<HTMLInputElement>(null)     useRef 用于保存元素的🌟实例, 然后便可以获取实例上的 value 数据, <HTMLInputElement> 表示范型, (null) 为默认值, 一般为固定写法

	Ts:
		FC<IProps>: 						用于定义【函数组件】的类型, IProps 为传入的参数<范型>
		({}):ReactElement 				    ReactElement 为返回值类型


	props:
		外界传入函数的【属性参数】集合, 需要用 Interface 来定义 (固定写法)

*/


interface IProps { //接口继承接口
	addTodo: (todo: ITodo) => void //函数的【参数 todo 】的接口类型为 【ITodo】, 类型统一在 typings 内进行声明
	todoList: ITodo[]  //表示从外界传入的 todoList 数组, 类型为 【ITodo[]】
}




const TdInput:FC<IProps> = ({ addTodo,todoList }):ReactElement => {

	const inputRef = useRef<HTMLInputElement>(null)  //用于获取 input 元素的实例, 再获取实例上的 value

	const addItem = ():void =>{//定义一个函数, 用于【添加新 todo】
		const value:string = inputRef.current!.value.trim() // current! 断言为肯定能取到值, trim() 为去掉输入框内前后的空格

		if(value.length){ //判断是否为【空值】: 有值则 true , 无值则 false

			const isExist = todoList.find(item => item.content === value )  //判断是否为【重复】的 todo 内容
			if(isExist){ //如果有值, 则表示已经存在(重复了), 则不添加
				alert('This todo is already exist!') 
				return
			}

			addTodo({ //执行【addTodo】 函数, 传入参数为 【ITodo】 类型的对象！
				id: new Date().getTime() ,
				content: value,
				complete: false,
			})

			inputRef.current!.value = '' //清空输入框 
		}
	}


	//渲染
	return (
		<div className="todo-input">
			<input type="text" placeholder="Input something..." ref={ inputRef }/>
			<button onClick={ addItem }>Add</button>
		</div>
	)
}


export default TdInput