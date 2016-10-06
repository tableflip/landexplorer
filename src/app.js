import React from 'react'
import MapComponent from './map-component'
import LayerPicker from './layer-picker'

const dummyLayers = {
  'Soil Quality': [
    {
      id: 0,
      backgroundColor: '#cd5858',
      name: 'Provisional Agricultural Land Classification (ALC)',
      provider: 'Natural England',
      description: 'Provisional Agricultural Land Classification Grade. Agricultural land classified into five grades.'
    },
    {
      id: 1,
      backgroundColor: '#cd9258',
      name: 'Advanced soil geochemical atlas of England and Wales',
      provider: 'British Geological Survey',
      description: '5700 surface soil samples, collected across England and Wales, analysed for 52 major and trace elements.'
    }
  ],
  'Current Use': [
    {
      id: 2,
      backgroundColor: '#5892cd',
      name: 'Land Cover Map 2007',
      provider: 'Centre for Ecology and Hydrology',
      description: 'Land cover describes the physical material on the surface of the country.'
    }
  ]
}

export default class extends React.Component {
  state = {
    layers: dummyLayers,
    selectedLayers: []
  }

  toggleLayer = (layer) => {
    return () => {
      const currentLayers = this.state.selectedLayers
      let newLayers
      if (currentLayers.indexOf(layer) > -1) {
        newLayers = currentLayers.concat(layer)
      } else {
        newLayers = currentLayers.filter((thisLayer) => thisLayer !== layer)
      }
      this.setState({ selectedLayers: newLayers })
    }
  }

  render () {
    return (
      <div className='row'>
        <div className='col-xs-6'>
          <LayerPicker layers={this.state.layers} selectedLayers={this.state.selectedLayers} toggleLayer={this.toggleLayer} />
        </div>
        <div className='col-xs-6'>
          <MapComponent />
        </div>
      </div>
    )
  }
}
