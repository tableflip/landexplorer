import React from 'react'
import { ThreeBounce } from 'better-react-spinkit'
import round from '../../lib/round'
import Icon from './icon'

export default ({placeData, wikiEntry, lngLat, features}) => {
  const { address, postcode, place } = placeData
  const { landcover, landuse, landuse_overlay, contour } = filterFeatures(features)
  return (
    <section className='ph4 pb3 bb b--black-20 '>
      <div className='pv2' style={{minHeight: '4rem'}}>
        <label className='f6 black-40'>Title of address</label>
        <div className='f4 mt1 black-70'>{address || place || 'Unknown'}{postcode && `, ${postcode}`}</div>
      </div>
      <div className='dt dt--fixed w-100 pv2 f6'>
        <div className='dtc'>
          <label className='black-40'>Location</label>
          <div className='pt1'>{round(lngLat.lng, 3)}, {round(lngLat.lat, 3)}</div>
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
            <div className='pt1'>{contour[0] ? `${contour[0]}m` : <ThreeBounce color='lightgray' size={12} />}</div>
          </span>
        </div>
      </div>
      { /*
<div className='pv2'>
  <label className='f6 black-40'>Land owner</label>
  <div className='mt1'>According to <a className='black-60' href='https://eservices.landregistry.gov.uk/www/wps/portal/!ut/p/b1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOKNjSxMDA1NjDwsjM3MDTxN3dyNDUNMjQ1MjIEKIvEocDckpD84NU8_XD8KTZm_m6OBp7GTv7e7caCRgYEZhgJUcyyMCCgAuQOswAAHcDTQ9_PIz03VL8iNqPDMDEgHAAblRA0!/dl4/d5/L0lDU0lKSmdrS0NsRUpDZ3BSQ2dwUkNTQS9ZSVVJQUFJSUlJTU1JS0VFQUFDR09HT0NHSUJKRkpGQkpORE5EQk5ISUVBTExBISEvNEczYUQyZ2p2eWhDa3lGTU5RaWt5RktOUmprS2NhZ21Rb2dnL1o3XzMyODQxMTQySDgzNjcwSTVGRzMxVDUzOFY0LzAvaWJtLmludi8zNDEyMzMwNTA1MDcvc3BmX0FjdGlvbk5hbWUvc3BmX0FjdGlvbkxpc3RlbmVyL3NwZl9zdHJ1dHNBY3Rpb24vITJmTHJJbnNwaXJlSWRJbml0LmRv/' target='_Blank'>Land Registry</a> the owner ID for this location is ID 2934692389</div>
</div>
      */}
      <div className='pv2'>
        <div className='dib w-70'>
          <label className='f6 black-40'>About this land</label>
          <div>
            {wikiEntry ? <p className='mt1 measure-wide lh-copy'>{wikiEntry}</p> : <span className='dib mt4'><ThreeBounce color='lightgray' size={30} duration='3s' /></span>}
          </div>
        </div>
        <div className='dt dt--fixed w-100 pv2'>
          <div className='dtc'>
            <label className='db f6 black-40'>Land use</label>
            <div className='dt dt--fixed w-100 pt2'>
              {landuse.concat(landuse_overlay).map((feature) => {
                return (
                  <div key={feature} className='dtc pr1'>
                    <Icon name={feature.toLowerCase()} className='mr1 v-mid' />
                    <label className='f6 v-mid'>{feature}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='dtc'>
            <label className='db f6 black-40'>Land cover</label>
            <div className='dt dt--fixed w-100 pt2 v-mid'>
              {landcover.map((feature) => {
                return (
                  <div key={feature} className='dtc pr1'>
                    <Icon name={feature.toLowerCase()} className='mr1 v-mid' />
                    <label className='f6 v-mid'>{feature}</label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function filterFeatures (features) {
  const sources = { landcover: [], landuse: [], landuse_overlay: [], contour: [] }
  return features.filter((f) => {
    return Object.keys(sources).some((source) => source === f.layer['source-layer'])
  }).reduce((sources, f) => {
    const source = f.layer['source-layer']
    const label = f.properties.class || f.properties.ele
    if (sources[source].indexOf(label) < 0) sources[source].push(label)
    return sources
  }, sources)
}
