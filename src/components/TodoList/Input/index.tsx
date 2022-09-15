import React, { useRef, FC, ReactElement } from 'react';
import { ITodoInfo } from '../typings';

/*
	🧪 Api:
		hooks:
			useRef<HTMLInputElement>(null)   useRef 用于保存元素的🌟实例, 然后便可以获取实例上的 value 数据(记得在 input 内绑定 ref={ inputRef }), <HTMLInputElement> 表示范型, (null) 为默认值, 一般为固定写法
			useCallback                     🌟用来把函数【缓存】起来, 便于子组件调用, 一般用于父组件传递给子组件的方法, 避免子组件频繁跟着父组件更新
			useState<ITodoInfo>([])				声明状态数据的钩子函数, 相当于同时定义了 【参数】跟【函数】, 【后一个参数为函数】, 能够直接改变第【一个参数的值】
			useEffect() 					定一个副效应函数，组件每渲染一次，该函数就自动执行一次，可以【🌟自定义依赖项】，当依赖项有变动才执行此函数！
				使用场景: 					 发送请求，获取数据、监听订阅事件、设置定时器、console.log、手动更改 DOM 等
			useReducer()					用于【状态管理】，相当于 useState 的【升级版】, 会返回 
				使用场景: 					有很多方法回去操作一个状态, 或下一个 state 依赖上一个 state 的复杂情况时, 用 useReducer 会更加方便

		Ts:
			FC<IProps>: 				 	用于定义【函数组件】的类型, IProps 为传入的参数<范型>
			({a,b}):ReactElement =>{}		ReactElement 为返回值类型


		props:
			外界传入函数的【属性参数】集合, 需要用 Interface 来定义 (固定的写法)

*/




//🔥🔥一: 定义参数的接口(⚡️⚡️也表明了这个子函数需要传入接口所定义的数据！！），继承全局接口
interface IProps { //定义 TdInput 参数的类型接口, 然后用 ITodoInfo 这个全局接口来定义类型（相当于继承了全局接口？）
	addTodo: (todoInfo: ITodoInfo) => void //定义一个函数类型, 参数为 todoInfo, 引用 typings 的接口
	todoList: ITodoInfo[]  //表示从外界传入的 todoList 数组, 类型为 ITodoInfo[]】
}




//🔥🔥二: 函数传入的参数 (🔥addTodo, todoList 需要在【父组件内】来【🔥定义并传入】【addTodo 方法】跟【todoList 数组】这两个参数），也就是 props 属性集合
//ReactElement 表示 react 函数有返回的都是 jsx 的 【ReactElement 类型】的元素
const TdInput:FC<IProps> = ({ addTodo, todoList }): ReactElement => {


	const inputRef = useRef<HTMLInputElement>(null)  //用于获取 input 元素的实例, 再获取实例上的 value


	const addItem = ():void =>{//定义一个函数, 用于【添加新 todoInfo】

		const value:string = inputRef.current!.value.trim() // current! 断言为肯定能取到值, trim() 为去掉输入框内前后的空格

		if(value.length){ //判断是否为【空值】: 不是空值则为 true , 然后执行下面的代码

			const isExist = todoList.find(item => item.content === value )  //find 为寻找出某一个值, 判断是否为【重复】的 todo 内容
			if(isExist){ //如果有值, 则表示已经存在(重复了), 则不添加
				alert('This todo is already exist!') 
				return
			}

			addTodo({ //🔥🔥三: 执行【addTodo】 函数并传入参数
				id: new Date().getTime(), //当前时间戳
				content: value,  //输入框内的值
				complete: false, //是否完成，默认为 false
			})

			inputRef.current!.value = '' //清空输入框 
		}
	}




	//渲染
	return (
		<div className="todo-input">
			{/* 记得在 input 内绑定 ref={ inputRef }*/}
			<input type="text" placeholder="Input something..." ref={ inputRef }/>
			<button onClick={ addItem }>Add</button>
		</div>
	)

}


export default TdInput