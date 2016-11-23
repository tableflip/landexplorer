import getFeature from './getFeature'
import config from '../config'

export default () => {
  const mapboxClient = new MapboxClient(config.mapboxApiAccessToken)

}
