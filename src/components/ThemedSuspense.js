import React from 'react'
import spinner from "../assets/img/loading.gif"
function ThemedSuspense() {
  return (
    <div className="w-full h-screen p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900 flex align-center">
      <img src={spinner} className="w-32 h-32 m-auto" />
    </div>
  )
}

export default ThemedSuspense
