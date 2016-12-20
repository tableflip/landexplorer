import React from 'react'

export default (props) => {
  return (
    <section className='ph2 dark-gray'>
      <div className='pt6 f4 f3-ns lh-copy center tc'>
        <strong>Land Explorer</strong> helps you find<br />information on land in the UK.
      </div>
      <div>
      <p className='pt4 center f5 f4-ns tc lh-copy'>Search for a place you're intested in,
        <br/>or click on the map to explore.
      </p>
      </div>
      <div className='pt6 tc'>
        <img src='/svg/sharedassets-logo-black.svg' style={{width: 220, maxWidth: '100%'}} />
      </div>
      <div className='pt4 f6 f5-ns lh-copy center tc'>We curate open data from public sources <br />and display them in one handy map.</div>
      <div className='pt2 tc'><img src='/svg/supporter-logos.svg' /></div>
    </section>
  )
}
