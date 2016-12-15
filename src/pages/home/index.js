import React from 'react'
import Map from './map'
import { highlights } from '../../lib/datasets'
import InfoPanel from './info-panel'
import LogoLink from './logo-link'

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
      <div className='layout-container bg-near-white dark-gray helvetica'>
        <div className='map-column'>
          <Map datasets={datasets} selectedLayers={selectedLayers} />
        </div>
        <div className='content-column'>
          <LogoLink />
          <InfoPanel />
        </div>
      </div>
    )
  }
}
