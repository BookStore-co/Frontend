import React from 'react'

function Cards({ title, value, icon, sidebarExpanded }) {
  return (
    <div className={`p-4 bg-white rounded-lg shadow-md transition-all duration-300 ${sidebarExpanded ? 'w-74' : 'w-83'}`}>
      <div className="flex items-center justify-center mb-4">
        {icon} {/* dynamic icon passed from parent */}
      </div>
      <h2 className="text-xl font-semibold text-center mb-2">{title}</h2>
      <p className="text-gray-600 text-center">{value}</p>
    </div>
  )
}
function Message(){
    return (
        <div className='bg-white p-4 rounded-lg'>
            <h1 className="text-gray-600 text-xl">Topic of Announcement</h1>
            <p className="text-gray-500 text-sm mt-2">This is the content of the announcement. It provides details about the topic mentioned above.</p>
            <button className="px-4 mt-4 py-2 cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            View
            </button>
        </div>
    )
}
function MessageCard() {
    return (
        <div className="p-4 mt-10 bg-white rounded-lg shadow-md w-full">
        <div className='flex items-center justify-between mb-4'>
            <h2 className="text-2xl font-semibold mb-2">Recent Announcements</h2>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition">
                View All
            </button>
        </div>
        <div className="w-full max-h-82 flex flex-col overflow-y-auto gap-4 p-4 rounded-lg bg-gray-100">
            <Message />
            <Message />
            <Message />
            <Message />
        </div>

        </div>
    )
}
export { Cards, MessageCard };
