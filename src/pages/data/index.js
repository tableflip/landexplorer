import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import chunk from 'lodash.chunk'
import Navbar from '../home/navbar'
import lngLatFromQuery from '../../lib/lngLatFromQuery'
import slugify from '../../lib/slugify'
import getPlaceData from '../../lib/getPlaceData'
import datasets from '../../datasets'
import CategoryIntro from './category-intro'
import PrimaryDataset from './primary-dataset'
import SecondaryDataset from './secondary-dataset'

export default class Data extends Component {
  static propTypes = {
    params: PropTypes.shape({
      category: PropTypes.string.isRequired
    }).isRequired,
    location: PropTypes.shape({
      query: PropTypes.object.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)
    const lngLat = lngLatFromQuery(props.location.query)
    const category = categoryFromSlug(props.params.category)
    this.state = { lngLat, category }

    getPlaceData(lngLat)
      .then((placeData) => this.setState({ placeData }))
      .catch((err) => console.error('Failed to get place data', err))
  }

  componentWillReceiveProps (nextProps) {
    const lngLat = lngLatFromQuery(nextProps.location.query)
    const category = categoryFromSlug(nextProps.params.category)

    this.setState({ lngLat, category, placeData: null })

    getPlaceData(lngLat)
      .then((placeData) => this.setState({ placeData }))
      .catch((err) => console.error('Failed to get place data', err))
  }

  render () {
    const { lngLat, category, placeData } = this.state

    if (!category) {
      return (
        <Layout>
          <h1>Category not found</h1>
          <p><Link to='/'>Back to the homepage</Link></p>
        </Layout>
      )
    }

    const datasets = category.datasets || []

    return (
      <Layout>
        <div className='pb4 mb4 bb b--black-20'>
          <CategoryIntro category={category} lngLat={lngLat} placeData={placeData} />
        </div>
        <div className='pb4 mb2 bb b--black-20'>
          <PrimaryDataset category={category} lngLat={lngLat} />
        </div>
        <div className='dt-ns mb4'>
          {chunk(datasets.slice(1), 3).map((chunk, i) => (
            <div className='dtr-ns'>
              {chunk.map((dataset, i) => {
                const ph = ['pr3-ns', 'ph1-ns', 'pl3-ns']
                return (
                  <div className={`dtc-ns pv4 ${ph[i]} bb b--black-20 w-third-ns`}>
                    <SecondaryDataset dataset={dataset} />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </Layout>
    )
  }
}

const Layout = ({ children }) => (
  <div className='black-60 helvetica'>
    <Navbar />
    <div className='fl w-100 bg-near-white pt4' style={{marginTop: '53px'}}>
      <div className='mw8 center ph3'>
        {children}
      </div>
    </div>
  </div>
)

function categoryFromSlug (slug) {
  return datasets.find((d) => slugify(d.category) === slug)
}
