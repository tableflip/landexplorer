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
      const selectedLayers = this.state.selectedLayers
      // try and remove it
      const newLayers = selectedLayers.filter((l) => l.id !== layer.id)
      if (newLayers.length === selectedLayers.length) {
        // wasn't there so add it
        newLayers.push(layer)
      }
      console.log('newLayers', newLayers)
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
          <MapComponent datasets={this.state.datasets} selectedLayers={this.state.selectedLayers} />
        </div>
      </div>
    )
  }
}
