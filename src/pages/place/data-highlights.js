import React from 'react'
import datasets from '../../datasets'

const datasetsWithMapLayers = getDatasetsWithMapLayers(datasets)

export default class extends React.Component {
  render () {
    return (
      <section className='mh3'>
        {datasetsWithMapLayers.map((datum) => {
          const { category, description, datasets } = datum
          return (
            <div className='pv3 mb2 bb b--black-20' key={category}>
              <div className='w-two-thirds dib'>
                <lable className='f6 black-40 ttu tracked'>{category}</lable>
                <div className='pv2 lh-copy measure-narrow'>{description}</div>
                <button className='mv2 pv2 ph4 br2 ba b--white bg-white f6 tc black-40'>View on Map</button>
                <button className='mv2 ml3 pv2 ph4 br2 ba b--light-green bg-light-green f6 tc black-40'>Find out more</button>
              </div>
              <div className='w-third dib v-top'>
                <div className='f6 black-40 ttu tracked mb2'>Highlights</div>
                <div className='f6 black-40'>{category}</div>
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
