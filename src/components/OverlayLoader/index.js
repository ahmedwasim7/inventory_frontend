import './styles.scss'
import Loader from 'assets/images/Spinner.gif'

export default () => (
  <div className={'overlay-loader'}>
    <img src={Loader} alt={'overlay-loader'} />
  </div>
)
