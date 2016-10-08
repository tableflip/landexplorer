import React from 'react'
import MapComponent from './map-component'
import LayerPicker from './layer-picker'
import api from './lib/api'
import datasets from './datasets'

export default class extends React.Component {
  state = {
    datasets: datasets,
    selectedLayers: []
  }

  toggleLayer = (layer) => {
    return () => {
      const currentLayers = this.state.selectedLayers
      let newLayers
      if (currentLayers.indexOf(layer) === -1) {
        newLayers = currentLayers.concat(layer)
      } else {
        newLayers = currentLayers.filter((thisLayer) => thisLayer !== layer)
      }
      this.setState({ selectedLayers: newLayers })
    }
  }

  componentDidMount () {
    api.get({ typeName: 'topp:tasmania_state_boundaries' })
      .then((json) => console.log('success', json))
      .catch((err) => console.error(err))
  }

  render () {
    return (
      <div className='dark-gray'>
        <div className='fl w-50'>
          <LayerPicker datasets={this.state.datasets} selectedLayers={this.state.selectedLayers} toggleLayer={this.toggleLayer} />
        </div>
        <div className='fl w-50'>
          <MapComponent />
        </div>
      </div>
    )
  }
}
