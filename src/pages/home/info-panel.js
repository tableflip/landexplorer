import React from 'react'

export default (props) => {
  return (
    <section className='bg-near-white pv5' style={{height: `${window.innerHeight - 53}px`}}>
      <div className='w-20 center'>
        <img src='/svgs/land-explorer-compas.svg' width='100%' />
      </div>
      <div className='f3 lh-copy center tc w-90 mt4'>Land explorer allows you to find<br />information on land in the UK.</div>
      <div className='mv3 w-90'><img src='/svgs/supporter-logos.svg' /></div>
      <div className='f3 lh-copy center tc w-90 mt4'>We curate all the open data available from goverment sources and display them in one handy map.</div>
    </section>
  )
}
