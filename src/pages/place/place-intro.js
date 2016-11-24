import React from 'react'
import { ThreeBounce } from 'better-react-spinkit'
import round from '../../lib/round'

export default class extends React.Component {
  render () {
    const { address, postcode, place } = this.props.placeData
    const wikiEntry = this.props.wikiEntry
    const { latitude, longitude } = this.props.viewport
    return (
      <section className='bg-white'>
        <div className='pa4' style={{minHeight: '4rem'}}>
          <label className='f6 black-40'>Title of address</label>
          <div className='f4 mt1 black-40'>{address} {postcode && `, ${postcode}`}</div>
        </div>
        <div className='dt dt--fixed w-100 pa4 f6'>
          <div className='dtc'>
            <label className='black-40'>Location</label>
            <div className='pt1'>{round(longitude, 3)}, {round(latitude, 3)}</div>
          </div>
          <div className='dtc'>
            {address &&
              <span>
                <label className='black-40'>County</label>
                <div className='pv1'>{place}</div>
              </span>
            }
          </div>
          <div className='dtc'>
            <span>
              <label className='black-40'>Elevation</label>
              <div className='pt1'>57.7m 87ft</div>
            </span>
          </div>
        </div>
        <div className='pa4'>
          <div className='dib w-70'>
            <label className='f6 black-40'>About this land</label>
            <div style={{minHeight: '4rem'}}>
              {wikiEntry ? <p className='mt1 measure-wide lh-copy black-80'>{wikiEntry}</p> : <span className='dib mt4'><ThreeBounce color='lightgray' size={30} duration='3s' /></span>}
            </div>
          </div>
        </div>
        <div className='dt dt--fixed w-100 pa4'>
          <div className='dtc'>
            <label className='f6 black-40'>Land use</label>
          </div>
          <div className='dtc'>
            <label className='f6 black-40'>Land cover</label>
          </div>
        </div>
      </section>
    )
  }
}
