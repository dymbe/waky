var gpio = require('rpi-gpio')
var gpiop = gpio.promise

gpio.setup(7, gpio.DIR_OUT)

ledstate = true

setInterval(() => {
	ledstate = !ledstate
	gpio.write(7, ledstate)
}, 1000)

var i2c = require('i2c-bus')
var i2cBus = i2c.openSync(1)
var oled = require('oled-i2c-bus')

var opts = {
	width: 128,
	height: 64,
	address: 0x3C
}

var oled = new oled(i2cBus, opts)
var font = require('oled-font-5x7')

setInterval(() => {
	var date = new Date()
	time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
	oled.clearDisplay()
	oled.setCursor(1, 1)
	oled.writeString(font, 2, time, 1, true)
}, 1000)
