import React from 'react'
import Icon from '../place/icon'
import round from '../../lib/round'

const ClickInfo = ({lngLat, point, open, features, onClick}) => {
  if (!lngLat || !open) return null
  return (
    <div className='relative pa2 br2'>
      <code style={{fontSize: '10px'}} className='db pb1 monospace bb b--white-30'>{`${round(lngLat.lng, 3)}, ${round(lngLat.lat, 3)}`}</code>
      <div style={{fontSize: '12px'}}>
        {features.map((f, i) => (
          <div className='pa2' key={`${f}-${i}`}>
            <Icon name={f} className='dib v-mid mr2' />
            <label key={i} className='dib v-mid ttc'>{f}</label>
          </div>
        ))}
      </div>
      <div className='pa2'>
        <button onClick={onClick} className='db ph3 pv2 f6 tc no-underline br2 ba b--green green' style={{backgroundColor: '#CFF09E'}}>Explore the area</button>
      </div>
    </div>
  )
}

export default ClickInfo
