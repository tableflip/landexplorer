import React from 'react'

const ExploreButton = () => {
  const size = 80
  return (
    <button style={{
      cursor: 'pointer',
      position: 'absolute',
      bottom: 40,
      right: 20,
      width: size,
      height: size,
      borderRadius: (size / 2),
      background: 'rgba(229,229,229,0.95)',
      boxShadow: '0 1px 4px rgba(0,0,0,0.50)',
      border: '1px solid white',
      color: 'white',
      fontSize: '13px',
      fontWeight: 'bold',
      letterSpacing: '1px',
      outline: 'none'
    }}>
      Explore
    </button>
  )
}

export default ExploreButton
