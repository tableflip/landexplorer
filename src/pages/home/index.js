import React from 'react'
import MapComponent from './map'
import LayerPicker from './layer-picker'
import datasets from '../../datasets'
import { Link } from 'react-router'

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
      this.setState({ selectedLayers: newLayers })
    }
  }

  render () {
    return (
      <div className='dark-gray'>
        <div className='fl w-100 w-50-ns'>
          <ul>
            <li><Link to='/place/Romsey'>Place</Link></li>
            <li><Link to='/data/soil'>Data</Link></li>
            <li><Link to='/place/Romsey/data/soil'>Soil data in Romsey</Link></li>
          </ul>
          <LayerPicker datasets={this.state.datasets} selectedLayers={this.state.selectedLayers} toggleLayer={this.toggleLayer} />
        </div>
        <div className='fl w-100 w-50-ns relative'>
          <MapComponent datasets={this.state.datasets} selectedLayers={this.state.selectedLayers} />
        </div>
      </div>
    )
  }
}
