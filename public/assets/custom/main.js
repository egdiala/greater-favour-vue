Window.alias ="Hackerly"
Window.openVueBsModal = (id) => {
  $('#' + id).modal()
}
Window.closeVueBsModal = (id) => {
  $('#' + id).modal('hide')
}
Window.trigger = (event, selector) => {
    console.log($(selector))
    $(selector).trigger(event)
}