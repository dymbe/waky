var gpio = require('rpi-gpio')
var moment = require('moment')
var i2c = require('i2c-bus')
var i2cBus = i2c.openSync(1)
var oled = require('oled-i2c-bus')
var font = require('oled-font-5x7')
var opts = {
	width: 128,
	height: 64,
	address: 0x3C
}
var oled = new oled(i2cBus, opts)

// Time in milliseconds
var timeOffset = 0
var startTime = moment().unix()

var alarms = [startTime]

gpio.promise.setup(7, gpio.DIR_OUT).then(() => {
	function clockTick() {
		var time = moment.unix(startTime + timeOffset).format('HH:mm:ss')
		oled.clearDisplay()
		oled.setCursor(1, 1)
		oled.writeString(font, 2, time, 1, true)

		checkAlarms(alarms)

		timeOffset += 1
	}

	function blink(times, ledOn) {
		if (times > 0) {
			if (ledOn) {
				times -= 1
			}
			gpio.write(7, ledOn)
			setTimeout(() => blink(times, !ledOn), 200)
		} else {
			gpio.write(7, false)
		}
	}

	function checkAlarms() {
		newAlarms = alarms.filter((x) => x > startTime + timeOffset)
		if (newAlarms.length < alarms.length) {
			blink(1000, true)
			alarms = newAlarms
		}
	}

	clockTick()
	setInterval(clockTick, 1000)
})
