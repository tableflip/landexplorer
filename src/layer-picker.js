import React from 'react'

export default class extends React.Component {
  renderLayerTile = (layer) => {
    const borderStyle = this.props.selectedLayers.indexOf(layer.id) > -1 ? 'b--black-80' : 'b--black-30'
    return (
      <div key={layer.id} className={`w-40 mw6 mr3 ba grow pointer bg-light-gray ${borderStyle}`} onClick={this.props.toggleLayer(layer.id)}>
        <div className={`h3 bg-${layer.backgroundColor}`}></div>
        <div className='flex-auto pa3'>
          <div className='f3 mb3'>{layer.name}</div>
          <div className='f5 ttu tracked light-silver mb2'>{layer.provider}</div>
          <p className='f6'>{layer.description}</p>
        </div>
      </div>
    )
  }

  renderCategory = (category) => {
    return (<div key={category} className='pb3'>
      <h1 className='f2 mb3'>{category}</h1>
      <div className='flex items-stretch justify-start'>
        {this.props.layers[category].map(this.renderLayerTile)}
      </div>
    </div>)
  }

  render () {
    return (<div className='pa3'>
      {Object.keys(this.props.layers).map(this.renderCategory)}
    </div>)
  }
}
