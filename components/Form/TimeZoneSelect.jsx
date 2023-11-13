import TimezoneSelect from 'react-timezone-select'
import { useState } from 'react'

function TimeZone () {
  const [selectedTimezone, setSelectedTimezone] = useState({})

  return (<>
    <TimezoneSelect
    value={selectedTimezone}
    onChange={setSelectedTimezone}
  />
  </>
  )
}

export default TimeZone;
