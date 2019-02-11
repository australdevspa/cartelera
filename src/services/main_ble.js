console.log('main')
let filters = []
let options = {};
options.acceptAllDevices = true

function onButtonClick() {
  showNotification('searching')
  console.log('searching...')
  console.log('Requesting Bluetooth Device...')
  console.log('with ' + JSON.stringify(options))
  navigator.bluetooth.requestDevice(options)
  .then(device => {
    showNotification('connected to ' + device.name)
    console.log('> Name:             ' + device.name)
    console.log('> Id:               ' + device.id)
    console.log('> Connected:        ' + device.gatt.connected)
  })
  .catch(error => {
    console.log('Argh! ' + error);
  })

}

if (Notification.permission !== "granted")
    Notification.requestPermission();

function showNotification(msg) {
    Notification.requestPermission(function(result) {
        if (result === 'granted') {
          var notification = new Notification('Ble test', {
          icon: 'https://www.culturapuertomontt.cl/inicio/wp-content/uploads/2018/04/logo-ccpm_345x108.jpg',
          body: msg,
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
          });
        }
      });
}

export {
    onButtonClick
}