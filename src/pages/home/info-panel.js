import React from 'react'

export default (props) => {
  return (
    <section className='bg-near-white pv5' style={{height: `${window.innerHeight}px`}}>
      <div className='w-20 center'>
        <svg width='100%' height='100%' viewBox='0 0 35 34' className='inline-block center'>
          <g transform='translate(1)' fill='none' fill-rule='evenodd'>
            <path d='M16.895 33c-8.837 0-16-7.163-16-16s7.163-16 16-16 16 7.163 16 16c-.01 8.832-7.168 15.99-16 16zm0-30c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14c-.009-7.728-6.272-13.991-14-14z' fill='#666' />
            <path stroke='#1A1A1A' fill='#1A1A1A' d='M.436 33.121L11.649 16.59l5.608 5.7z' />
            <path fill='#C1272D' d='M17.257 10.982l16.1-10.1-10.493 15.659' />
            <circle fill='#F2F2F2' cx='17.504' cy='16.949' r='6.182' />
            <circle fill='#CCC' cx='17.504' cy='16.949' r='6.182' />
            <circle fill='#FFF' cx='17.504' cy='16.437' r='3.734' />
          </g>
        </svg>
      </div>
      <div className='f3 lh-copy center tc w-90 mt4'>Land explorer allows you to find<br />information on land rights across the country.</div>
      <div className='mv3 w-90'><img src='/svgs/supporter-logos.svg' /></div>
      <div className='f3 lh-copy center tc w-90 mt4'>We curate all open data avaiable from goverment sources and display them in one handy map.</div>
    </section>
  )
}
