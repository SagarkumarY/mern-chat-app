import React from 'react'
import Conversation from './Conversation'

function Conversations() {
  return (
    <div className="flex py-2 flex-col overflow-auto">
      <Conversation/>
      <Conversation/>
      <Conversation/>
      <Conversation/>
      <Conversation/>
      <Conversation/>
    </div>
  )
}

export default Conversations