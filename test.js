const rotaryEncoder = require('onoff-rotary');
const myEncoder = rotaryEncoder(29, 31); // Using BCM 5 & BCM 6 on the PI

myEncoder.on('rotation', direction => {
    if (direction > 0) {
        console.log('Encoder rotated right');
    } else {
        console.log('Encoder rotated left');
    }
});
