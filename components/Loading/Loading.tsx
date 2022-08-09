import React from 'react'

export default function Loading() {
  return (
    <div className="fixed flex inset-0 w-full h-full items-center bg-[#ffffffa6] z-30">
      <div className="dot-spinner mx-auto">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
    </div>
  )
}
