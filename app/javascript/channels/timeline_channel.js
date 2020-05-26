import CableReady from 'cable_ready'
import consumer from "./consumer"

export default consumer.subscriptions.create("TimelineChannel", {
  received(data) {
    if (data.cableReady) CableReady.perform(data.operations)
  }
});
