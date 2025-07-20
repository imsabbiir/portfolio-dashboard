import React from 'react'

function StatCard({name, icon: Icon, value}) {
  return (
    <div
			className='chartBg bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700'
		>
			<div className='px-4 py-5 sm:p-6'>
				<span className='flex items-center font-medium titleText'>
					<Icon size={20} className='mr-2 activeText' />
					{name}
				</span>
				<p className='mt-1 text-3xl font-semibold subTitleText'>{value}</p>
			</div>
		</div>
  )
}

export default StatCard