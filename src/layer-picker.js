import React from 'react'

export default class extends React.Component {
  renderLayerTile = (layer) => {
    console.log(this.props.selectedLayers)
    const selected = this.props.selectedLayers.indexOf(layer.id) > -1
    return (
      <div key={layer.id} className={`card ${selected ? 'selected' : ''}`} onClick={this.props.toggleLayer(layer.id)}>
        <div className='card-img-top' style={{ backgroundColor: layer.backgroundColor, height: '50px' }}></div>
        <div className='card-block'>
          <div className='h4 card-title'>{layer.name}</div>
          <div className='h5 card-title'>{layer.provider}</div>
          <p className='card-text'>{layer.description}</p>
        </div>
      </div>
    )
  }

  renderCategory = (category) => {
    return (<div key={category} className='row p-a-2'>
      <div className='col-xs-12'>
        <h1 className='h3 p-b-2'>{category}</h1>
        <div className='card-group'>
          {this.props.layers[category].map(this.renderLayerTile)}
        </div>
      </div>
    </div>)
  }

  render () {
    return (<div>
      {Object.keys(this.props.layers).map(this.renderCategory)}
    </div>)
  }
}
