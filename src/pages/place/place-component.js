import React from 'react'
import { ThreeBounce } from 'better-react-spinkit'

export default class extends React.Component {
  render () {
    const { address, postcode, place } = this.props.placeData
    const wikiEntry = this.props.wikiEntry
    const { latitude, longitude } = this.props.viewport
    return (
      <section className='bg-white'>
        <div className='bb b--black-05 pa4' style={{minHeight: '4rem'}}>
          <label className='f6 black-40'>Selected Area</label>
          <div className='f4 mt1'>{place}</div>
        </div>
        <div className='bb b--black-05 pa4'>
          <div className='dib w-70'>
            <label className='f4'>About this land</label>
            <div style={{minHeight: '4rem'}}>
              {wikiEntry ? <p className='mt1 measure-wide lh-copy black-80'>{wikiEntry}</p> : <span className='dib mt4'><ThreeBounce color='lightgray' size={30} duration='3s' /></span>}
            </div>
          </div>
          <div className='dib w-30 v-top f6 pl3'>
            {address &&
              <span>
                <label className='black-40'>Address</label>
                <div className='mb2 pt1'>{address}</div>
              </span>
            }
            {postcode &&
              <span>
                <label className='black-40'>Postcode</label>
                <div className='mb2 pt1'>{postcode}</div>
              </span>
            }
            <label className='black-40'>Coordinates</label>
            <div className='pt1'>{longitude}, {latitude}</div>
          </div>
        </div>
      </section>
    )
  }
}
