import React, { FC, ReactElement } from 'react';
import { ITodoInfo } from '../typings';
import Item from './item'




//ð¯å­ç»ä»¶ï¼itemï¼éè¦çåæ°ï¼ç¶ç»ä»¶ï¼listï¼ä¹è¦å®ä¹åæ°ç±»åç¶åä¼ å¥
interface IProps {
	todoList: ITodoInfo[],
	toggleTodo: (id: number) => void,
	removeTodo: (id: number) => void //ä¼ å¥ idï¼ç±»åä¸º number
}


const TdList :FC<IProps> = ({
	todoList,
	toggleTodo,
	removeTodo
}): ReactElement=> {



	return(
		<div className="td-list">
			{/* ð¥ð¥ å¤è¯»æ¯å¦ä¼ å¥äº todoList  */}
			{
				todoList && todoList.map((todoInfo: ITodoInfo) => {
					return (
						//ð¡ð¡ð¡è¿ä¸é¢åªæ¯å½ä½ä¸ä¸ªåæ°ç®¡é, æçå®çå¼è¿æ¯éè¿æé¡¶å±ç index.tsx, éè¿ state.todoList ä¼ å¥åæ°ï¼ï¼æçå®çå½æ°ä¹ä¸æ ·ï¼éè¿æé¡¶å±å½æ°æ¥ä¼ å¥ï¼ðð
						<Item 
							// ðè¦å åè¡¨é¦åè¦å ä¸ª keyï¼
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