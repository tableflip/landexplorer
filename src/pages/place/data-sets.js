import React from 'react'

export default class extends React.Component {
  render () {
    const data = this.props.datasets
    return (
      <section>
        <div className='bg-black white w-100 pv3 pl4'>Opendata Sources</div>
        <div className='bg-nearly-white'>
          {data.map((datum) => {
            const {category, description, datasets} = datum
            const datasetCount = countMapsIn(datasets)
            return (
              <div className='bb br b--black-05 ph4 pv4' key={category}>
                <label className='f6 black-40'>{category}</label>
                <p className='pt0 mt1 measure-wide black-80'>{description}</p>
                <div className='dt dt--fixed w-100'>
                  <div className='dtc v-mid pt2'>
                    <span className='f3'>{datasets.length}</span>
                    <span className='f6 black-40 ml1'>Datasets</span>
                  </div>
                  {datasetCount > 0 &&
                    <div className='dtc v-mid'>
                      <span className='f3'>{datasetCount}</span>
                      <span className='f6 black-40 ml1'>Map layers</span>
                    </div>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }
}

const countMapsIn = (datasets) => {
  return datasets.reduce((count, set) => {
    if (!set.source || !set.source.url) return count
    if (set.source.url.length > 0) count += 1
    return count
  }, 0)
}
