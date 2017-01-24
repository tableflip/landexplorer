import React from 'react'
import ResponsiveEmbed from 'react-responsive-embed'

export default (props) => {
  return (
    <div>
      <section className='pa4-ns pa3 dark-gray'>
        <p className='f4 f3-ns lh-copy tc'>
          <strong>Land Explorer</strong> helps you find<br />information on land in the UK.
        </p>
        <p className='pt3 center f5 f4-ns lh-copy tc'>
          <strong>Search for a place you're interested in,<br />or click on the map to explore.</strong>
        </p>
        <p className='lh-copy pt5'>
          Land Explorer is designed to provide the information needed for land to be managed for the common good. It combines open data on land with a simple map-based interface, designed to enable users to access key information quickly.
        </p>
        <p className='lh-copy'>
          Land Explorer is a project from <a href='http://www.sharedassets.org.uk/' target='_blank'>Shared Assets</a>, a social enterprise dedicated to supporting people using land for the common good. We work with a wide range of land-based projects, landowners, and other stakeholders to pursue better ways of managing land. Our goal is to create an environment where these models thrive, and land is used as a shared asset, for the common good.
        </p>
        <ResponsiveEmbed src='https://www.youtube.com/embed/2yqz9zgoC-U' allowfullscreen />
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
        <p className='lh-copy'>
          We also want the addition of new features and data to be guided by users. If you have any feedback on Land Explorer and would like to help guide its development,
          <br /><strong>please fill in this short form:
          <a className='db mt2' href='https://goo.gl/forms/7mPMZFW6ffYhjPEF3' target='_blank'>https://goo.gl/forms/7mPMZFW6ffYhjPEF3</a></strong>
        </p>
        <div className='pv4 tc'>
          <img src='/svg/land-explorer-logo.svg' width='202' height='34' />
          <p className='mv0 pt2 pb3 fw6'>
            by
          </p>
          <a href='http://www.sharedassets.org.uk/' target='_blank'>
            <img src='/svg/sharedassets-logo-black.svg' style={{width: 220, maxWidth: '100%'}} />
          </a>
        </div>
      </section>
    </div>
  )
}
