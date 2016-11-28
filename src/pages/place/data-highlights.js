import React from 'react'
import { Link } from 'react-router'
import slugify from '../../lib/slugify'
import datasets from '../../datasets'

const datasetsWithMapLayers = getDatasetsWithMapLayers(datasets)

export default class extends React.Component {
  render () {
    const { lngLat } = this.props

    return (
      <section className='ph3'>
        {datasetsWithMapLayers.map((datum) => {
          const { category, datasets } = datum
          return (
            <div className='pl3 pv4 mb2 bb b--black-20' key={category}>
              <div className='w-two-thirds dib'>
                <lable className='f6 black-40 ttu tracked'>{category}</lable>
                <div className='pt2 pb4 pr4 f6 lh-copy'>{datasets[0].description}</div>
                <button className='mv2 pv2 ph4 br2 ba b--white bg-white f6 tc black-40'>View on Map</button>
                <Link to={{ pathname: `/data/${slugify(category)}`, query: lngLat }} className='mv2 ml3 pv2 ph4 br2 ba b--light-green bg-light-green f6 tc black-40'>Find out more</Link>
              </div>
              <div className='w-third dib v-top'>
                <div className='f6 black-40 mb2 ttu tracked'>Highlights</div>
                <div className='f6'>{category}</div>
                <div className='mv1 b f3 green'>5 Data here</div>
                <div className='f6'>
                  <small>
                    Based on <a className='dib black-40' href={`${datasets[0].url}`} target='_Blank'>{datasets[0].provider}</a>
                  </small>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    )
  }
}

function getDatasetsWithMapLayers (datasets) {
  return datasets.filter((datum) => datum.datasets.some((set) => set.source))
}
