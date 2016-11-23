import React from 'react'
import MapComponent from './map'
import datasets from '../../datasets'
import InfoPanel from './info-panel'
import Navbar from './navbar'

export default class extends React.Component {
  state = {
    panel: <InfoPanel />,
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

  setPanel = (component) => {
    console.log('setPanel called with', component)
    this.setState({panel: component})
  }

  render () {
    return (
      <div className='dark-gray helvetica'>
        <Navbar />
        <div className='fl w-100 w-50-ns'>
          {this.state.panel}
        </div>
        <div className='fl w-100 w-50-ns relative'>
          <MapComponent datasets={this.state.datasets} selectedLayers={this.state.selectedLayers} setPanel={this.setPanel} />
        </div>
      </div>
    )
  }
}
