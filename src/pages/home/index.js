import React from 'react'
import Map from './map'
import { highlights } from '../../lib/datasets'
import InfoPanel from './info-panel'
import Navbar from './navbar'

export default class extends React.Component {
  state = {
    datasets: highlights,
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
    const { datasets, selectedLayers } = this.state
    return (
      <div className='dark-gray helvetica'>
        <Navbar />
        <div className='fl w-100 w-50-ns' style={{marginTop: '53px'}}>
          <InfoPanel />
        </div>
        <div className='fixed top-0 right-0 w-100 w-50-ns'>
          <Map datasets={datasets} selectedLayers={selectedLayers} />
        </div>
      </div>
    )
  }
}
