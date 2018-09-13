import format from 'date-fns/format'
import addDays from 'date-fns/add_days'
import { compose } from 'ramda'

export default () => compose(
  datetime => format(datetime, 'YYYY-MM-DD'),
  datetime => addDays(datetime, 1),
)(new Date())
