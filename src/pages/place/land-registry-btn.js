/*
 * Lookup an INSPIRE id on the landregistry site by posting off to their form.
 *
 * The landregistry site is stateful, so we have to ensure that their browser
 * just visited the page on the. eservices.landregistry.gov.uk site that shows
 * the INSPIRE form. Gross, I know.
 *
 * The form targets a named window 'landregistry'. We catch and stifle the form
 * submit,open the page we need and then trigger the submit later.
 *
 * I do admit that I take gross pleasure in the fact that this hideous dance works.
 */

import React from 'react'

const LAND_REGISTRY_WINDOW = 'landregistry'
const INSPIRE_ID_SEARCH_PAGE = 'https://eservices.landregistry.gov.uk/www/wps/portal/!ut/p/b1/hc7NCoJAFAXgR7q_jrO1heMQJGFQziZmIWHouAmf32xXUd7dge8cLgRojZBVZsrhAiHFub_FRz-lOKw5mKuwVSLlyorJ0WelEzplgipP0P4Bjrb6TZfgDOGD1WWBXnb13smREc0XeN-xvAHWP14Af1yBcKimsYMxDLbxd10AehjogQ!!/dl4/d5/L0lDU0lKSmdrS0NsRUpDZ3BSQ2dwUkNTQS9ZSVVJQUFJSUlJTU1JS0VFQUFDR09HT0NHSUJKRkpGQkpORE5EQk5ISUVBTExBISEvNEczYUQyZ2p2eWhDa3lGTU5RaWt5RktOUmprS2NhZ21Rb2dnL1o3XzMyODQxMTQySDgzNjcwSTVGRzMxVDUzOFY0LzAvaWJtLmludi8zNDQ2Mzc4Mjc2MTYvc3BmX0FjdGlvbk5hbWUvc3BmX0FjdGlvbkxpc3RlbmVyL3NwZl9zdHJ1dHNBY3Rpb24vITJmTHJJbnNwaXJlSWRJbml0LmRv/'
const INSPIRE_ID_LOOKUP = 'https://eservices.landregistry.gov.uk/www/wps/portal/!ut/p/b1/hc7bCoJAEAbgZ_EBYsbd1bZLKzyQJqaU7o0ImWgeosIOT592V2HO3cD3_zMgIFIYMk5VOoMQRJ20eZZc86ZOyn4XakwJZ7LMiNmhKVqKblA5UCgy2oHoDzDksfwOQmSxX_CT87iG9nPRBsXTI85y97hovl9mopqcKzdvGm112Ld3T5LAT-suJ76qXV1Di87dlUE9gqj-gM_bnIyA_vc3wIHRENZmU6UQdWw61MO3DCpR2uy4MW-ZJL0A0_XqsQ!!/dl4/d5/L0lDU0lKSmdwcGlRb0tVUW9LVVEhL29Gb2dBRUlRaGpFQ1VJZ0FJQUl5RkFNaHdVaFM0SldsYTRvIS80RzNhRDJnanZ5aERVd3BNaFFqVW81Q2pHcHhBL1o3XzMyODQxMTQySDgzNjcwSTVGRzMxVDUzOFY0LzAvMzQ0NjE5NjQzNDkxL3NwZl9BY3Rpb25OYW1lL3NwZl9BY3Rpb25MaXN0ZW5lci9zcGZfc3RydXRzQWN0aW9uLyEyZlFEU2VhcmNoLmRv/'

const onSubmit = (e) => {
  e.preventDefault()
  window.open(INSPIRE_ID_SEARCH_PAGE, LAND_REGISTRY_WINDOW)
  const form = e.target
  setTimeout(() => form.submit(), 100)
}

const LandRegistryButton = ({inspireId, children, ...props}) => (
  <form style={{display: 'inline-block'}} onSubmit={onSubmit} target={LAND_REGISTRY_WINDOW} method='post' action={INSPIRE_ID_LOOKUP}>
    <input type='hidden' name='polygonId' value={inspireId} />
    <button type='submit' {...props}>
      {children}
    </button>
  </form>
)

export default LandRegistryButton
