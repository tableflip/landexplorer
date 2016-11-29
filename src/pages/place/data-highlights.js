import React from 'react'
import { Link } from 'react-router'
import { ThreeBounce } from 'better-react-spinkit'
import slugify from '../../lib/slugify'
import datasets from '../../datasets'

const datasetsWithMapLayers = getDatasetsWithMapLayers(datasets)

const labelLookup = {
  'Agricultural Land Classification': (f) => f ? f.layer.id : 'Unknown',
  'Historic Flood Map': (f) => f ? 'Has flooded' : 'No recorded floods',
  'Sites of Specific Scientific Interest': (f) => f ? 'Yes' : 'No',
  'INSPIRE Index Polygons': (f) => f ? f.properties.INSPIREID : 'Not available yet'
}

export default function ({ lngLat, features }) {
  console.log('features', features.map((f) => f.layer.id))
  return (
    <section className='ph3'>
      {datasetsWithMapLayers.map((datum) => {
        const { category, datasets } = datum
        const dataset = datasets[0]
        const interstingFeature = features.find((f) => f.layer.source === dataset.id)
        console.log('interstingFeatures', dataset.id, interstingFeature)
        const lookup = labelLookup[dataset.id]
        const interestingValue = lookup && lookup(interstingFeature)
        return (
          <div className='pl3 pv4 mb2 bb b--black-20' key={category}>
            <div className='w-two-thirds dib pr4'>
              <lable className='f6 black-40 ttu tracked'>{category}</lable>
              <div className='pt2 pb4 f6 lh-copy'>{datasets[0].description}</div>
            </div>
            <div className='w-third dib v-top'>
              <div className='f6 b'>{datasets[0].name}</div>
              <div className='mv1 b f3 green'>
                {(features.length && interestingValue) || <ThreeBounce color='lightgray' size={12} />}
              </div>
              <div className='f6'>
                <small>
                  Source <a className='dib black-40' href={`${datasets[0].url}`} target='_Blank'>{datasets[0].provider}</a>
                </small>
              </div>
              <div className='tl pt4'>
                <Link to={{ pathname: `/data/${slugify(category)}`, query: lngLat }} className='pv2 ph4 br2 ba b--light-green bg-light-green f6 tc black-40 no-underline'>Find out more</Link>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

function getDatasetsWithMapLayers (datasets) {
  return datasets.filter((datum) => datum.datasets.some((set) => set.source))
}
