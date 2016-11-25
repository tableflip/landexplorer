import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import lngLatFromQuery from '../../lib/lngLatFromQuery'

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
    this.state = {
      lngLat: lngLatFromQuery(props.location.query),
      dataset: props.params.dataset
    }
  }

  componentWillReceiveProps (nextProps) {
    const lngLat = lngLatFromQuery(nextProps.location.query)
    this.setState({ lngLat })
  }

  render () {
    const { place, data } = this.props.params
    return (<h1>
      <Link to='/'>
        <small>back</small>
      </Link> Data for {data || 'some data set'} {place && `in ${place}`}
    </h1>)
  }
}
