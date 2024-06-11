import React from 'react'

const EventDetails = ({ params }: { params: { eventId: string } }) => {
  return (
    <div>EventDetails for {params.eventId}</div>
  )
}

export default EventDetails