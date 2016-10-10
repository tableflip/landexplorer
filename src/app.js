import React from 'react'
import MapComponent from './map-component'
import LayerPicker from './layer-picker'
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

  render () {
    return (
      <div className='dark-gray'>
        <div className='fl w-100 w-50-ns'>
          <LayerPicker datasets={this.state.datasets} selectedLayers={this.state.selectedLayers} toggleLayer={this.toggleLayer} />
        </div>
        <div className='fl w-100 w-50-ns relative'>
          <MapComponent />
        </div>
      </div>
    )
  }
}
