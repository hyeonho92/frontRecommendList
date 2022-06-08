// INIT
var openWeatherKey = "";
var openWeatherValue = "openWeatherApiKey";

var clientIdKey = "";
var clientIdValue = "openWeatherApiKey";

var clientSecretKey = "";
var clientSecretValue = "openWeatherApiKey";


// PROCESS
var openWeatherKeyEncrypted = CryptoJS.AES.encrypt(openWeatherKey, openWeatherValue);
var openWeatherKeyDecrypted = CryptoJS.AES.decrypt(openWeatherKeyEncrypted, openWeatherValue);

var clientIdKeyEncrypted = CryptoJS.AES.encrypt(clientIdKey, clientIdValue);
var clientIdKeyDecrypted = CryptoJS.AES.decrypt(clientIdKeyEncrypted, clientIdValue);

var clientSecretEncrypted = CryptoJS.AES.encrypt(clientSecretKey, clientSecretValue);
var clientSecretDecrypted = CryptoJS.AES.decrypt(clientSecretEncrypted, clientSecretValue);
