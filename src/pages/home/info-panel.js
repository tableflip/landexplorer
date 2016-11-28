import React from 'react'

export default (props) => {
  return (
    <section className='bg-near-white pv5 ph2' style={{height: `${window.innerHeight - 53}px`}}>
      <div className='tc'>
        <img src='/svg/land-explorer-compas.svg' style={{width: 150, maxWidth: '100%'}} />
      </div>
      <div className='pt5 tc'>
        <img src='/svg/sharedassets-logo-black.svg' style={{width: 300, maxWidth: '100%'}} />
      </div>
      <div className='f3 lh-copy center tc w-90 mt4'>
        <strong>Land Explorer</strong> helps you find<br />information on land in the UK.
      </div>
      <div className='pt4 tc'><img src='/svg/supporter-logos.svg' /></div>
      <div className='f4 lh-copy center tc mt2'>We curate open data from public and goverment sources <br />and display them in one handy map.</div>
    </section>
  )
}
