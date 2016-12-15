import React from 'react'

export default (props) => {
  return (
    <section className='ph2'>
      <div className='pt6 f3 lh-copy center tc w-90'>
        <strong>Land Explorer</strong> helps you find<br />information on land in the UK.
      </div>
      <div>
      <p className='pt4 center f4 tc lh-copy w-80'>Search for a place you're intested in, or just click around the map to explore.
      </p>
      </div>
      <div className='pt6 tc'>
        <img src='/svg/sharedassets-logo-black.svg' style={{width: 220, maxWidth: '100%'}} />
      </div>
      <div className='pt3 f4 lh-copy center tc'>We curate open data from public sources <br />and display them in one handy map.</div>
      <div className='pt2 tc'><img src='/svg/supporter-logos.svg' /></div>
    </section>
  )
}
