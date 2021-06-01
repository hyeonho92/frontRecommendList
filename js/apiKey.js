// INIT
var openWeatherKey = "5b588e54d5298904faca5d62dc75cf30";
var openWeatherValue = "openWeatherApiKey";

var clientIdKey = "QPI300X1KSWASF0L2GLU5E3UWQH1SF005OAC2QQYPTM5TMKK";
var clientIdValue = "openWeatherApiKey";

var clientSecretKey = "TJUVN1EHKLN21BZYRAK4TMDZ3VENLTQDF1R23AETM2BE1OWF";
var clientSecretValue = "openWeatherApiKey";


// PROCESS
var openWeatherKeyEncrypted = CryptoJS.AES.encrypt(openWeatherKey, openWeatherValue);
var openWeatherKeyDecrypted = CryptoJS.AES.decrypt(openWeatherKeyEncrypted, openWeatherValue);

var clientIdKeyEncrypted = CryptoJS.AES.encrypt(clientIdKey, clientIdValue);
var clientIdKeyDecrypted = CryptoJS.AES.decrypt(clientIdKeyEncrypted, clientIdValue);

var clientSecretEncrypted = CryptoJS.AES.encrypt(clientSecretKey, clientSecretValue);
var clientSecretDecrypted = CryptoJS.AES.decrypt(clientSecretEncrypted, clientSecretValue);
