

export const events = (data) => {
  let event = []

  data.forEach(mapData)
  function mapData(item, index) {
    let signle_event = {
      "title": item.title,
      "start": item.start_time,
      "end": item.end_time,
      "id": item.id
  }
  event.push(signle_event)

}
return event
}
