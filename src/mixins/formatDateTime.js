import { datetime } from '../config'

export default {
  computed: {
    $FORMAT_DATETIME () {
      return {
        DATE: datetime.FORMAT_DATE,
        TIME: datetime.FORMAT_TIME,
        DATETIME: datetime.FORMAT_DATETIME
      }
    }
  }
}
