import DataTable from 'react-data-table-component'

import './styles.scss'

export default props => (
  <div>
    <DataTable {...props} noHeader={true} />
  </div>
)
