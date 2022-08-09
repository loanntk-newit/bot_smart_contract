import FullCalendar, { EventContentArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'

interface Props {
  events?: object
  eventContent?: (e: EventContentArg) => void
  dateClick?: (e: DateClickArg) => void
}

const Calendar: React.FC<Props> = ({ events, eventContent, dateClick }) => {
  const buttonText = {
    today: '今日',
  }
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale="ja"
      height={'auto'}
      events={events}
      dateClick={dateClick}
      eventContent={eventContent}
      buttonText={buttonText}
    />
  )
}

export default Calendar
