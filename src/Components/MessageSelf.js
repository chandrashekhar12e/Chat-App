import React from 'react'
import { useSelector } from 'react-redux'

const MessageSelf = ({props}) => {
  const isLight= useSelector((state)=>state.themeKey)
  return (
    <div className='selfMessageContainer'>
        <div className={'messageBox' + (isLight ? "" :" messageBoxDark")}>
            <p>{props.content}</p>
            {/* <p className='selfTimeStamp'>12:00am</p> */}
        </div>
    </div>
  )
}

export default MessageSelf