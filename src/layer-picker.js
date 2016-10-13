import React from 'react'

export default class extends React.Component {
  renderLayerCard = (layer) => {
    if (!layer.source) return this.renderExternalLinkCard(layer)
    const isSelected = this.props.selectedLayers.indexOf(layer) > -1
    const defaultColor = `hsl(${(layer.id * 209) % 360}, 60%, 75%)`
    const backgroundColor = layer.style && layer.style.paint['fill-color'] || defaultColor
    const borderStyle = isSelected ? 'b--black-80' : 'b--black-30'
    const opacity = isSelected ? 1 : 0.9
    return (
      <div
        key={layer.id}
        style={{width:'300px', opacity}}
        className={`mw6 mr3 ba pointer bg-light-gray flex-none ${borderStyle}`}
        onClick={this.props.toggleLayer(layer)}
      >
        <div className="pv1" style={{ backgroundColor }}>
          <div className='f6 ttu tracked white pa3 lh-title'>Map Layer</div>
        </div>
        <div className='flex-auto pa3'>
          <h3 className='f4 mt2 mb3'>{layer.name}</h3>
          <div className='f6 ttu tracked light-silver mb2 lh-title'>{layer.provider}</div>
          <p className='f6 h4 overflow-hidden lh-copy'>{layer.description}</p>
        </div>
      </div>
    )
  }

  renderExternalLinkCard = (layer) => {
    const backgroundColor = `hsl(${(layer.id * 209) % 360}, 60%, 75%)`
    return (
      <a
        key={layer.id}
        style={{width:'300px', opacity:0.9}}
        className='db mw6 mr3 ba pointer bg-light-gray flex-none b--black-30 no-underline black'
        target="_blank" href={layer.url}
      >
        <div className="pv1" style={{ backgroundColor }}>
          <div className='f6 ttu tracked white pa3 lh-title'>External link</div>
        </div>
        <div className='flex-auto pa3'>
          <h3 className='f4 mt2 mb3 lh-title'>{layer.name}</h3>
          <div className='f6 ttu tracked light-silver mb2 lh-title'>{layer.provider}</div>
          <p className='f6 h4 overflow-hidden lh-copy'>{layer.description}</p>
        </div>
      </a>
    )
  }

  renderCategory = (category) => {
    return (<section key={category.name}>
      <header className='bg-dark-gray pv1'>
        <h1 className='f4 pl3 ma3 ttu tracked white'>{category.category}</h1>
      </header>
      <p className='f5 pa4 mv0 pb0 lh-copy' style={{ whiteSpace: 'pre-wrap' }}>{category.description}</p>
      <div className='flex items-stretch justify-start w-100 overflow-x-auto overflow-y-hidden pa3 pt4'>
        {category.datasets.map(this.renderLayerCard)}
      </div>
    </section>)
  }

  render () {
    return (<div className='py3 overflow-y-auto' style={{ height: '100vh', backgroundColor:'rgba(255,255,255,1)'}}>
      <header className='pa3'>
        <a href="http://www.sharedassets.org.uk/">
          <img height='38' src='http://www.sharedassets.org.uk/wp-content/themes/sharedassets/build/images/sa-logo-black.svg' />
        </a>
      </header>
      {this.props.datasets.map(this.renderCategory)}
    </div>)
  }
}
