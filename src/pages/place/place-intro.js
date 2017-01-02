import React from 'react'
import { ThreeBounce } from 'better-react-spinkit'
import uniq from 'lodash.uniq'
import round from '../../lib/round'
import canonicalUrl from '../../lib/canonicalUrl'
import Icon from './icon'
import Share from './share'

export default ({placeData, wikiEntry, lngLat, features, location, data}) => {
  const { address, postcode, place } = placeData
  const { landcover, landuse, landuse_overlay, contour } = filterFeatures(features)
  const uniqueLandFeatures = uniq(landuse.concat(landuse_overlay).concat(landcover))

  // Sorry. To allow the user to click through to the results of the land registry
  // search, we have to ensure that their browser just visited the page on the
  // eservices.landregistry.gov.uk site that shows the INSPIRE form... so.

  // The form targets the 'landregistry' window. We catch and stifle the submit,
  // open the page we need and then trigger the submit later.

  // I do admit that I take gross pleasure in the fact that this hideous dance works.
  const LAND_REGISTRY_WINDOW = 'landregistry'
  const preWarmLandRegistry = (e) => {
    window.open(
      'https://eservices.landregistry.gov.uk/www/wps/portal/!ut/p/b1/hc7NCoJAFAXgR7q_jrO1heMQJGFQziZmIWHouAmf32xXUd7dge8cLgRojZBVZsrhAiHFub_FRz-lOKw5mKuwVSLlyorJ0WelEzplgipP0P4Bjrb6TZfgDOGD1WWBXnb13smREc0XeN-xvAHWP14Af1yBcKimsYMxDLbxd10AehjogQ!!/dl4/d5/L0lDU0lKSmdrS0NsRUpDZ3BSQ2dwUkNTQS9ZSVVJQUFJSUlJTU1JS0VFQUFDR09HT0NHSUJKRkpGQkpORE5EQk5ISUVBTExBISEvNEczYUQyZ2p2eWhDa3lGTU5RaWt5RktOUmprS2NhZ21Rb2dnL1o3XzMyODQxMTQySDgzNjcwSTVGRzMxVDUzOFY0LzAvaWJtLmludi8zNDQ2Mzc4Mjc2MTYvc3BmX0FjdGlvbk5hbWUvc3BmX0FjdGlvbkxpc3RlbmVyL3NwZl9zdHJ1dHNBY3Rpb24vITJmTHJJbnNwaXJlSWRJbml0LmRv/',
      LAND_REGISTRY_WINDOW
    )
    e.preventDefault()
    const form = e.target
    setTimeout(() => {
      form.submit()
    }, 100)
  }

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
          {data.loading && <ThreeBounce color='lightgray' size={12} />}
          {data.inspireId && (
            <form onSubmit={preWarmLandRegistry} target={LAND_REGISTRY_WINDOW} method='post' action='https://eservices.landregistry.gov.uk/www/wps/portal/!ut/p/b1/hc7bCoJAEAbgZ_EBYsbd1bZLKzyQJqaU7o0ImWgeosIOT592V2HO3cD3_zMgIFIYMk5VOoMQRJ20eZZc86ZOyn4XakwJZ7LMiNmhKVqKblA5UCgy2oHoDzDksfwOQmSxX_CT87iG9nPRBsXTI85y97hovl9mopqcKzdvGm112Ld3T5LAT-suJ76qXV1Di87dlUE9gqj-gM_bnIyA_vc3wIHRENZmU6UQdWw61MO3DCpR2uy4MW-ZJL0A0_XqsQ!!/dl4/d5/L0lDU0lKSmdwcGlRb0tVUW9LVVEhL29Gb2dBRUlRaGpFQ1VJZ0FJQUl5RkFNaHdVaFM0SldsYTRvIS80RzNhRDJnanZ5aERVd3BNaFFqVW81Q2pHcHhBL1o3XzMyODQxMTQySDgzNjcwSTVGRzMxVDUzOFY0LzAvMzQ0NjE5NjQzNDkxL3NwZl9BY3Rpb25OYW1lL3NwZl9BY3Rpb25MaXN0ZW5lci9zcGZfc3RydXRzQWN0aW9uLyEyZlFEU2VhcmNoLmRv/'>
              <input type='hidden' name='polygonId' value={data.inspireId} />
              <button title='Click to look it up on landregistry.gov.uk. Opens in a new window.' className='pl0' style={{cursor: 'pointer', border: 'none', background: 'transparent'}}>
                <span className='black-60 f5 underline'>{data.inspireId}</span>
                <small className='f6 black-40'> 🔗 Find it on landregistry.gov.uk</small>
              </button>
            </form>
          )}
          {!data.loading && !data.inspireId && <div className='black-40 f5'>Not available</div>}
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
          <label className='db f6 black-40'>Share</label>
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
