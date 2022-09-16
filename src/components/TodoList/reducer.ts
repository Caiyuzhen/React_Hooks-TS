import { ACTIONS_TYPE, IAction, IState, ITodoInfo } from "./typings";


//https://juejin.cn/post/6844903869604986888

//🔥🔥🔥状态管理，判断不同的操作项返回的状态, 类似 Mobx 的数组操作, 分离数据层和视图层
//这里的reducer函数本身会接受两个参数，第一个是 state，第二个是 action，这个 action 会被 dispatch执行，
//根据不同的action ，reducer 函数会带来不同的 state 的变化, 是一组钩子
function todoReducer ( state: IState, action: IAction ) : IState {
	//action 对应三个不同的 todo 操作事件（增删改）, 通过 action 中的 type 来判断
	//payload 可能是  ITodoInfo、ITodoInfo[]、number
	const {type, payload} = action//🔥解构赋值出【 type 】和【 payload 】参数, 也就是什么【事件】，什么【对象】


	switch(type){//或者通过 action.type 来判断
		case ACTIONS_TYPE.INIT_TODOLIST:
			return {
				...state,
				todoList: payload as ITodoInfo[]//重新赋值
			}

		case ACTIONS_TYPE.ADD_TODO: 
			return {	//🔥返回一个新的状态数组
				...state, //获取【原来的状态】, 平铺老的 state
				todoList: [...state.todoList, payload as ITodoInfo],//修改为新的 state, 把【原来的状态】跟【新的状态】合并, payload 因为是联合类型, 所以需要断言下
			}

		case ACTIONS_TYPE.REMOVE_TODO:
			return {
				...state,
				todoList: state.todoList.filter(todoInfo => todoInfo.id !== payload)//过滤掉出不属于此时我们传入的 payload，此时 payload 为 id
			}

		case ACTIONS_TYPE.TOGGLE_TODO: //todo 是否完成
			return {
				...state,
				todoList: state.todoList.map(todoInfo => {
					return todoInfo.id === payload ? {  //现有的 todoInfo.id 与 payload 对比看是否相等
						...todoInfo,
						complete: !todoInfo.complete, //🔥🔥选中态取反
					 } : { ...todoInfo }
				})
			}

		default:
			return state
	}
}


export {
	todoReducer
}