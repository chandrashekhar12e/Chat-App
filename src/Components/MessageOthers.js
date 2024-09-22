import React from 'react'
import { useSelector } from 'react-redux'

const MessageOthers = ({props}) => {
  const isLight = useSelector((state)=>state.themeKey)
  
  return (
    <div className={'otherMessageContainer ' }>
      <div className={"convo" + (isLight ? "" :" conDark")}>
      <p className="conIcon">{props.sender.name[0]}</p>
      <div className={'otherTextContent'  + (isLight ? "" :" otherTextContentDark")}>

        <p className="conTitle">{props.sender.name}</p>
        <p className="conlastMessage">{props.content}</p>
        {/* <p className='selfTimeStamp'>12:00am</p> */}
      </div>

    </div>
    </div>
  )
}

export default MessageOthers