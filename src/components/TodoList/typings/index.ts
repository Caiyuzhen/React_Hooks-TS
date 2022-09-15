//IProps 的接口(具体的 todo)
//payload 也会继承它, 用来判断是哪个 todo
export interface ITodoInfo { 
	id: number;
	content: string;
	complete: boolean;
}


//IState 的接口（todo 的集合）
export interface IState {
	todoList: ITodoInfo[]; //🔥类型是 ITodo 的集合数组！
}


export interface IAction {
	type: ACTIONS_TYPE,
	payload: ITodoInfo | number,//payload 有可能是增加的一项 todoInfo，也有可能是删除一项 todo， 也可能是修改 id
}


//🔥🔥三个不同的 todo 操作事件的联系（增删改）
export enum ACTIONS_TYPE {
	ADD_TODO = 'addTodo',
	REMOVE_TODO = 'removeTodo',
	TOGGLE_TODO = 'toggleTodo'
}