import React from 'react'
import { ThreeBounce } from 'better-react-spinkit'
import uniq from 'lodash.uniq'
import round from '../../lib/round'
import canonicalUrl from '../../lib/canonicalUrl'
import Icon from './icon'
import Share from './share'
import LandRegistryButton from './land-registry-btn'

export default ({placeData, wikiEntry, lngLat, features, location, data}) => {
  const { address, postcode, place } = placeData
  const { landcover, landuse, landuse_overlay, contour } = filterFeatures(features)
  const uniqueLandFeatures = uniq(landuse.concat(landuse_overlay).concat(landcover))

  return (
    <section className='pb3 ph3 bb b--black-20'>
      <div className='pv2' style={{minHeight: '4rem'}}>
        <label className='f6 black-40'>Title of address</label>
        <div className='f4 mt1 black-70'>
          <img src='/svg/pin.svg' className='mr2' style={{height: '1rem'}} />
          {address || place}{postcode && `, ${postcode}`}
        </div>
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
            <div className='pt1'>{contour[0] || contour[0] === 0 ? `${contour[0]}m` : <ThreeBounce color='lightgray' size={12} />}</div>
          </span>
        </div>
      </div>
      <div className='pv2'>
        <label className='f6 black-40'>Land Registry INSPIRE ID</label>
        <div className='mt1 pt1'>
          <div>
            <div className='w-two-thirds-ns dib-ns'>
              {data.loading && <ThreeBounce color='lightgray' size={12} />}
              {data.inspireId && (
                <LandRegistryButton
                  inspireId={data.inspireId}
                  className='pl0'
                  style={{cursor: 'pointer', border: 'none', background: 'transparent'}}
                  title='Click to look the id up on landregistry.gov.uk. Opens in a new window.' >
                  <span className='black-60 f5 underline'>{data.inspireId}</span>
                  <small className='f6 black-40 no-underline'> 🔗 Find it on landregistry.gov.uk</small>
                </LandRegistryButton>
              )}
              {!data.loading && !data.inspireId && <div className='black-40 f5'>Not available</div>}
            </div>
            <div className='w-third-ns dib-ns'>
              <a
                className='mv2 ml2 pv2 ph4 br2 ba b--light-green bg-light-green f6 tc black-40 no-underline'
                href='http://www.sharedassets.org.uk/landexplorer/land-registry-inspire-id/'
                target='_blank'>
                Find out more
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='pv2'>
        <div>
          <label className='f6 black-40'>About this land</label>
          <div className='pt1 pb2'>
            {wikiEntry ? <p className='ma0 measure-wide lh-copy'>{wikiEntry}</p> : <ThreeBounce color='lightgray' size={14} duration='3s' />}
          </div>
        </div>
        <div className='pv2'>
          <label className='db f6 black-40'>Land type</label>
          <div style={{minHeight: 32}}>
            {uniqueLandFeatures.map((feature) => {
              return (
                <div key={feature} className='dib pr3 pt2'>
                  <Icon name={feature.toLowerCase()} className='mr1 v-mid' />
                  <label className='f6 v-mid'>{feature}</label>
                </div>
              )
            })}
          </div>
        </div>
        <div className='pv2'>
          <label className='db f6 black-40'>Share this location</label>
          <div style={{fontSize: 11}}>
            <Share url={canonicalUrl(location)} text={`Explore ${address || place || ''}`} />
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
