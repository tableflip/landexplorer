import React from 'react'
import classnames from 'classnames'

export default class extends React.Component {
  render () {
    const { name, width, height, className } = this.props
    return <img className={classnames(className, 'dib')} src={`/svgs/${name}.svg`} width={`${width || 24}px`} height={`${height || 24}px`} />
  }
}
