import React from 'react'
import { ThreeBounce } from 'better-react-spinkit'

export default class extends React.Component {
  render () {
    const { address, postcode, place } = this.props.placeData
    const wikiEntry = this.props.wikiEntry
    return (
      <section className='bg-white pa3'>
        <div className='bb b--black-05 pa3' style={{minHeight: '4rem'}}>
          <label className='f6 black-40'>Selected Area</label>
          <div className='f4 mt1'>{place}</div>
        </div>
        <div className='bb b--black-05 pa3'>
          <div className='dib w-70'>
            <label className='f4'>About this land</label>
            <div style={{minHeight: '6rem'}}>
              {wikiEntry ? <p className='mt1 measure-wide lh-copy black-40'>{wikiEntry}</p> : <span className='mt1'><ThreeBounce color='lightgray' size={30} duration='3s' /></span>}
            </div>
          </div>
          <div className='dib w-30 v-top'>
            <label className='f6 black-40'>Address</label>
            <div className='mb3'>{address}</div>
            <label className='f6 black-40'>Postcode</label>
            <div>{postcode}</div>
          </div>
        </div>
      </section>
    )
  }
}
