import React from 'react'

export default class extends React.Component {
  renderLayerTile = (layer) => {
    const defaultColor = `hsl(${(layer.id * 209) % 360}, 60%, 75%)`
    const backgroundColor = layer.style && layer.style.paint['fill-color'] || defaultColor
    const borderStyle = this.props.selectedLayers.indexOf(layer) > -1 ? 'b--black-80' : 'b--black-30'
    return (
      <div
        key={layer.id}
        className={`w-70 w-40-ns mw6 mr3 ba pointer bg-light-gray flex-none ${borderStyle}`}
        onClick={this.props.toggleLayer(layer)}
      >
        <div className='h3' style={{ backgroundColor }}></div>
        <div className='flex-auto pa3'>
          <div className='f4 mb3 lh-title'>{layer.name}</div>
          <div className='f5 ttu tracked light-silver mb2 lh-title'>{layer.provider}</div>
          <p className='f6 h4 overflow-hidden lh-copy'>{layer.description}</p>
        </div>
      </div>
    )
  }

  renderCategory = (category) => {
    return (<section key={category.name} className='mb4 pb2'>
      <header className='bg-dark-gray pv1'>
        <h1 className='f4 pl3 ma3 ttu tracked white'>{category.category}</h1>
      </header>
      <p className='f5 pl3 ma3 lh-copy' style={{ whiteSpace: 'pre-wrap' }}>{category.description}</p>
      <div className='flex items-stretch justify-start w-100 overflow-x-auto overflow-y-hidden pa2'>
        {category.datasets.map(this.renderLayerTile)}
      </div>
    </section>)
  }

  render () {
    return (<div className='py3 overflow-y-auto' style={{ height: '100vh', backgroundColor:'rgba(255,255,255,1)'}}>
      <header className='pa3'>
        <img height='38' src='http://www.sharedassets.org.uk/wp-content/themes/sharedassets/build/images/sa-logo-black.svg' />
      </header>
      {this.props.datasets.map(this.renderCategory)}
    </div>)
  }
}
