import React from 'react'
import LogoLink from './logo-link'

export default (props) => {
  return (
    <div>
      <section className='ph2 dark-gray relative'>
        <div className='pt5 f4 f3-ns lh-copy center tc'>
          <strong>Land Explorer</strong> helps you find<br />information on land in the UK.
        </div>
        <div>
          <p className='pt4 center f5 f4-ns tc lh-copy'>Search for a place you're intested in,
          <br />or click on the map to explore.
        </p>
        </div>
        <div className='pt5 tc'>
          <a href='http://www.sharedassets.org.uk/' target='_blank'>
            <img src='/svg/sharedassets-logo-black.svg' style={{width: 220, maxWidth: '100%'}} />
          </a>
        </div>
        <div className='pv4 f5 f4-ns lh-copy center tc'>
          We curate open data from public sources <br />and display them in one handy map.
        </div>
      </section>
      <section className='pa4 mt2'>
        <hr />
        <h2 className='mt5 mb4 f4 fw2 black-40 ttu tracked'>
          Introducing Land Explorer
        </h2>
        <p className='lh-copy'>
          Land Explorer is a new website designed to provide the information needed for land to be managed for the common good. It combines open data on land with a simple map-based interface, designed to enable users to access key information quickly.
        </p>
        <p className='lh-copy'>
          Land Explorer is a project from <a href='http://www.sharedassets.org.uk/' target='_blank'>Shared Assets</a>, a social enterprise dedicated to supporting people using land for the common good. We work with a wide range of land-based projects, landowners, and other stakeholders to pursue better ways of managing land. Our goal is to create an environment where these models thrive, and land is used as a shared asset, for the common good.
        </p>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%' }}>
          <iframe style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} src='https://www.youtube.com/embed/2yqz9zgoC-U' frameborder='0' allowfullscreen />
        </div>

        <h2 className='mt5 mb4 f4 fw2 black-40 ttu tracked'>How did we get here</h2>
        <p className='lh-copy'>
          We decided to build Land Explorer after hearing the projects we work with cite lack of access to information as a key barrier. This website is the end result of a long period of R&D involving finding out what information land-based projects need, what data exists, and how to get it to them.
        </p>
        <p className='lh-copy'>
          Land-based projects told us that they need an easy-to-use website, tailored to their needs, that puts key information in one place. With support from the <a href='http://www.petersowerbyfoundation.com/' target='_blank'>Peter Sowerby Foundation</a>, we built Land Explorer to provide this resource.
        </p>

        <h2 className='mt5 mb4 f4 fw2 black-40 ttu tracked'>Next steps and feedback</h2>
        <p className='lh-copy'>
          However it is still a work in progress. Currently, some of the data is only relevant to England, and most of the data is more useful for rural areas. We have also yet to build many of the features we have planned - in particular allowing users to upload comments, photos and other media. There are also a number of other key datasets that we would like to integrate.
        </p>
        <p className='pb5 lh-copy'>
          We also want the addition of new features and data to be guided by users. If you have any feedback on Land Explorer and would like to help guide its development,
          <br /><strong>please fill in this short form:
          <a className='db mt2' href='https://goo.gl/forms/7mPMZFW6ffYhjPEF3' target='_blank'>https://goo.gl/forms/7mPMZFW6ffYhjPEF3</a></strong>
        </p>
      </section>
      <LogoLink />
    </div>
  )
}
