const addMinutes = require('date-fns/add_minutes')
const formatDate = require('date-fns/format')

module.exports = (req, res, next) => {
  const { datetime } = req.query
  const format = 'YYYYMMDDTHHmmss'
  const start = formatDate(datetime, format)
  const end = formatDate(addMinutes(datetime, 30), format)
  const uid = `${datetime}@lesmoffat.co.uk`
  res.setHeader('Content-Type', 'text/Calendar')
  res.setHeader('Content-Disposition', 'inline; filename=les_moffat_cv.ics')

  const icsText = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//lesmoffat/nodecalenderthing//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatDate(new Date(), format)}
DTSTART:${start}
DTEND:${end}
SUMMARY:Look at Les' CV => lesmoffat.co.uk/cv
END:VEVENT
END:VCALENDAR`
  res.send(icsText)
}
