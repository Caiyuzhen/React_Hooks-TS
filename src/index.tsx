import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
//   <React.StrictMode>
    <App />
//   </React.StrictMode>
);


reportWebVitals();


/*
	🧪 Api:
		hooks:
			useRef<HTMLInputElement>(null)   useRef 用于保存元素的🌟实例, 然后便可以获取实例上的 value 数据(记得在 input 内绑定 ref={ inputRef }), <HTMLInputElement> 表示范型, (null) 为默认值, 一般为固定写法
			useCallback                     🌟用来把函数【缓存】起来, 便于子组件调用, 一般用于父组件传递给子组件的方法, 避免子组件频繁跟着父组件更新
			useState<ITodoInfo>([])				声明状态数据的钩子函数, 相当于同时定义了 【参数】跟【函数】, 【后一个参数为函数】, 能够直接改变第【一个参数的值】
			useEffect() 					定一个副效应函数，组件每渲染一次，该函数就自动执行一次，可以【🌟自定义依赖项】，当依赖项有变动才执行此函数！
				使用场景: 					 发送请求获取数据、把数据存入 localStorage, 监听订阅事件、设置定时器、console.log、手动更改 DOM 等
			useReducer()					用于【状态管理】，相当于 useState 的【升级版】, 会返回 
				使用场景: 					有很多方法回去操作一个状态, 或下一个 state 依赖上一个 state 的复杂情况时, 用 useReducer 会更加方便

		Ts:
			FC<IProps>: 				 	用于定义【函数组件】的类型, IProps 为传入的参数<范型>
			({a,b}):ReactElement =>{}		ReactElement 为返回值类型


		props:
			外界传入函数的【属性参数】集合, 需要用 Interface 来定义 (固定的写法)

*/
