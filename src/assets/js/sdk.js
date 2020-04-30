const CODE_GET_SN = 0; const CODE_GET_WIFILIST = 2; const CODE_CONNECT_WIFI_FAIL = 1; const CODE_CONNECT_WIFI_SUCCESS = 4; var devicesList = []; var printerSN = ''; var wifiList = []; var connectedDevice = { name: '', deviceId: '', serviceId: '', uuid: '', characteristicId: '', connected: false, canWrite: false, }; var dataComplete = { len: 0, location: 0, data: new ArrayBuffer(10), status: false, }; function inArray(arr, key, val) {
  for (var i = 0; i < arr.length; i++) { if (arr[i][key] === val) { return i; } }
  return -1;
}
function strToArr(str, len) {
  var buf = new ArrayBuffer(len); var bufView = new Uint8Array(buf); for (var i = 0, strLen = str.length; i < strLen; i++) { bufView[i] = str.charCodeAt(i); }
  return buf;
}
function handleData(value) {
  var array = new Uint8Array(value); if ((array[0] === 0xAA) && (array[1] === 0x55)) {
    var arrayLen = array.byteLength; dataComplete.len = array[2] + array[3] * Math.pow(2, 8); dataComplete.data = new ArrayBuffer(dataComplete.len); var dataView = new DataView(dataComplete.data); for (var j = 0; j < arrayLen; j++) { dataView.setUint8(j, array[j]); }
    dataComplete.location = arrayLen; if (arrayLen === dataComplete.len) { dataComplete.status = true; } else { dataComplete.status = false; }
  } else {
    var arrayLen = array.byteLength; var dataView = new DataView(dataComplete.data); for (var j = 0; j < arrayLen; j++) { dataView.setUint8((j + dataComplete.location), array[j]); }
    dataComplete.location += arrayLen; if (dataComplete.len === dataComplete.location) { dataComplete.status = true; } else { dataComplete.status = false; }
  }
}
function getCompleteData(characteristic) {
  handleData(characteristic.value); if (dataComplete.status) {
    var code = new Uint8Array(dataComplete.data.slice(5, 6))[0]; if (code === CODE_GET_SN) { var sn = String.fromCharCode.apply(null, new Uint8Array(dataComplete.data.slice(6))); printerSN = sn; return printerSN; }
    if (code === CODE_GET_WIFILIST) {
      var ssid = String.fromCharCode.apply(null, new Uint8Array(dataComplete.data.slice(6, 70))); var mode = new Uint8Array(dataComplete.data.slice(70, 71))[0]; var rssiData = new Uint8Array(dataComplete.data.slice(71)); var rssi = 0; for (var i = 0; i < rssiData.length; i++) { rssi += rssiData[i] * Math.pow(2, 8 * i); }
      var isExist = inArray(wifiList, 'ssid', ssid); if (isExist === -1) { wifiList.push({ complete: dataComplete.data, ssid: ssid, mode: mode, rssi: rssi }); } else { wifiList[isExist] = { complete: dataComplete.data, ssid: ssid, mode: mode, rssi: rssi }; }
      return wifiList;
    }
    if (code === CODE_CONNECT_WIFI_FAIL) { return { status: 10001 }; }
    if (code === CODE_CONNECT_WIFI_SUCCESS) { getConnectSuccessfully(); return { status: 0 }; }
  }
}
function openBluetoothAdapter(functionName) { wx.openBluetoothAdapter({ success: (res) => { startScanDevices(); return functionName({ status: 0 }); }, fail: (res) => { return functionName({ status: 10001 }); if (res.errCode === 10001) { wx.onBluetoothAdapterStateChange(function (res) { if (res.available) { wx.offBluetoothAdapterStateChange(); startScanDevices(); } }) } } }) }
function startScanDevices() { wx.startBluetoothDevicesDiscovery({ allowDuplicatesKey: true, success: (res) => { console.log(' success', res); }, }) }
function stopScanDevices() { wx.stopBluetoothDevicesDiscovery() }
function onBluetoothDeviceFound(functionName) {
  wx.onBluetoothDeviceFound((res) => {
    res.devices.forEach(device => {
      if (!device.name && !device.localName) { return; }
      const foundDevices = devicesList; const idx = inArray(foundDevices, 'deviceId', device.deviceId); if (idx === -1) { devicesList[`${foundDevices.length}`] = device; } else { devicesList[`${idx}`] = device; }
      return functionName(devicesList);
    })
  })
}
function getDevicesList() { stopScanDevices(); return devicesList; }
function createBLEConnection(deviceId, functionName) {
  wx.createBLEConnection({ deviceId, success: (res) => { getBLEDeviceServices(deviceId, functionName); }, fail: (res) => { return functionName({ status: 10001, res }); } })
  stopScanDevices();
}
function getBLEDeviceServices(deviceId, functionName) { wx.getBLEDeviceServices({ deviceId, success: (res) => { for (var i = 0; i < res.services.length; i++) { if (res.services[i].isPrimary) { getBLEDeviceCharacteristics(deviceId, res.services[i].uuid, functionName); return; } } } }) }
function getBLEDeviceCharacteristics(deviceId, serviceId, functionName) {
  wx.getBLEDeviceCharacteristics({
    deviceId, serviceId, success: (res) => {
      for (var i = 0; i < res.characteristics.length; i++) {
        var item = res.characteristics[i]; if (item.properties.read) { wx.readBLECharacteristicValue({ deviceId, serviceId, characteristicId: item.uuid, }) }
        if (item.properties.write) { connectedDevice.canWrite = true; connectedDevice.deviceId = deviceId; connectedDevice.serviceId = serviceId; connectedDevice.characteristicId = item.uuid; wx.notifyBLECharacteristicValueChange({ state: true, deviceId, serviceId, characteristicId: item.uuid, success(res) { return functionName({ status: 0, canWrite: true, connected: true, deviceId, serviceId, characteristicId: item.uuid, res, }); } }) }
      }
    }, fail(res) { return functionName({ status: 10002, res }); }
  })
}
function onBLECharacteristicValueChange(functionName) { wx.onBLECharacteristicValueChange((characteristic) => { var data = getCompleteData(characteristic); if (dataComplete.status) { return functionName(data); } }) }
function closeBLEConnection() { wx.closeBLEConnection({ deviceId: connectedDevice.deviceId }) }
function senInfoToBLEDevice(value, { deviceId = connectedDevice.deviceId, serviceId = connectedDevice.serviceId, characteristicId = connectedDevice.characteristicId } = {}) { wx.writeBLECharacteristicValue({ deviceId, serviceId, characteristicId, value, success: (res) => { console.log('senInfoToBLEDevice success', res); }, fail: (res) => { console.log('senInfoToBLEDevice fail', res); } }) }
function sendNoParamInfo({ code }) { var buffer = new ArrayBuffer(6); var dataView = new DataView(buffer); dataView.setUint8(0, 0xAA); dataView.setUint8(1, 0x55); dataView.setUint8(2, 0); dataView.setUint8(3, 6); dataView.setUint8(4, 100); dataView.setUint8(5, code); senInfoToBLEDevice(buffer); }
function getSN(functionName) { sendNoParamInfo({ code: 5 }); onBLECharacteristicValueChange(functionName); }
function getWifiList(functionName) { wifiList = []; sendNoParamInfo({ code: 6 }); onBLECharacteristicValueChange(functionName); }
function connectWifi(wifiEssid = '', wifiPassword = '', functionName) {
  var essid = new Uint8Array(strToArr(wifiEssid, 64)); var password = new Uint8Array(strToArr(wifiPassword, 64)); var buffer = new ArrayBuffer(134); var dataView = new DataView(buffer); dataView.setUint8(0, 0xAA); dataView.setUint8(1, 0x55); dataView.setUint8(2, 0); dataView.setUint8(3, 134); dataView.setUint8(4, 100); dataView.setUint8(5, 7); for (var i = 0; i < essid.length; i++) { dataView.setUint8(6 + i, essid[i]); }
  for (var i = 0; i < password.length; i++) { dataView.setUint8(70 + i, password[i]); }
  var bufferLen = buffer.byteLength; var sendTimes = Math.ceil(bufferLen / 20); for (var i = 0; i < sendTimes; i++) { var start = 0 + i * 20; var end = (i + 1) * 20 >= bufferLen ? bufferLen : (i + 1) * 20; senInfoToBLEDevice(buffer.slice(start, end)); }
  onBLECharacteristicValueChange(functionName);
}
function getConnectSuccessfully() { sendNoParamInfo({ code: 8 }); }
function cancelConnect() { sendNoParamInfo({ code: 0x0A }); }
function deleteWifi() { sendNoParamInfo({ code: 0x0B }); }
function closeBluetoothAdapter() { wx.closeBluetoothAdapter(); }
module.exports = { devicesList, printerSN, wifiList, connectedDevice, strToArr, openBluetoothAdapter, stopScanDevices, createBLEConnection, closeBLEConnection, getSN, getWifiList, connectWifi, cancelConnect, deleteWifi, closeBluetoothAdapter, getCompleteData, startScanDevices, getDevicesList, onBluetoothDeviceFound, onBLECharacteristicValueChange, senInfoToBLEDevice };