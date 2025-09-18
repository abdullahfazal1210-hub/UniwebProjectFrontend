import React from 'react'

function Card({icon, heading , desc,}) {
  return (
    <div>
         <div className="upper-sec px-3  flex gap-3">
        <div className="icon w-12 h-12 bg-blue-600 rounded-full flex items-center text-amber-50 justify-center">
          {icon}
        </div>
        <div className="Heading flex text-amber-50 items-center justify-center">
          {heading}
        </div>
      </div>
      <div className="description mt-4 px-3 text-sm">{desc}</div>

    </div>
  )
}

export default Card