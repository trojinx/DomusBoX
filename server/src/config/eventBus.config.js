// apparently you can't emit an event from 1 module and hear it in another module, event both events are in same node process
// so using a common EventEmitter in this module, and exporting it to other modules, and this thing works, dont know why :)

import EventEmitter from "events";
const eventBus = new EventEmitter();
export default eventBus;
