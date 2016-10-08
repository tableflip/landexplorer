import React from 'react'

export default class extends React.Component {
  renderLayerTile = (layer) => {
    const backgroundColor = `hsl(${(layer.id * 209) % 360}, 60%, 75%)`
    const borderStyle = this.props.selectedLayers.indexOf(layer.id) > -1 ? 'b--black-80' : 'b--black-30'
    return (
      <div 
        key={layer.id}
        className={`w-40 mw6 mr3 ba grow shadow-hover pointer bg-light-gray flex-none ${borderStyle}`}
        onClick={this.props.toggleLayer(layer.id)}
      >
        <div className='h3' style={{ backgroundColor }}></div>
        <div className='flex-auto pa3'>
          <div className='f3 mb3'>{layer.name}</div>
          <div className='f5 ttu tracked light-silver mb2'>{layer.provider}</div>
          <p className='f6 h4 overflow-hidden'>{layer.description}</p>
        </div>
      </div>
    )
  }

  renderCategory = (category) => {
    return (<div key={category.name} className='pb3'>
      <h1 className='f2 mb2'>{category.category}</h1>
      <h2 className='f4 mb3 silver'>{category.description}</h2>
      <div className='flex items-stretch justify-start w-100 overflow-x-auto overflow-y-hidden pa3'>
        {category.datasets.map(this.renderLayerTile)}
      </div>
    </div>)
  }

  render () {
    return (<div className='pa3 overflow-y-auto' style={{ height: '100vh' }}>
      {this.props.datasets.map(this.renderCategory)}
    </div>)
  }
}
