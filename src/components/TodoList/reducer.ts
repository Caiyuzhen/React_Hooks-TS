import { ACTIONS_TYPE, IAction, IState, ITodo } from "./typings";


//🔥🔥🔥状态管理，判断不同的操作项返回的状态, 类似 Mobx 的数组操作, 分离数据层和视图层
function todoReducer (state:IState, action:IAction) : IState {
	//action 对应三个不同的 todo 操作事件（增删改）, 通过 action 中的 type 来判断
	const {type, payload} = action//🔥解构赋值出【 type 】和【 payload 】参数, 也就是什么【事件】，什么【对象】

	switch(type){
		case ACTIONS_TYPE.ADD_TODO: 
			return {	//🔥返回一个新的状态数组
				...state, //获取【原来的状态】, 平铺老的 state
				todoList: [...state.todoList, payload as ITodo],//修改为新的 state, 把【原来的状态】跟【新的状态】合并, payload 因为是联合类型, 所以需要断言下
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
					return todoInfo.id === payload ? { 
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