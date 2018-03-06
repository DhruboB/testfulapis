'use strict';

var facebookIntegrationProcessor = function(){
let tokenTypeObj ='';
//var initialization comes here

};

facebookIntegrationProcessor.prototype.authorization = function(testId,requestToken){
	 tokenTypeObj = require("../../util/testProfile");
	console.log("authorization function called.");

}

facebookIntegrationProcessor.prototype.requestShortAccessToken = function(requestToken,facebookProfile,AccessTokenEndPoint,redirectUri){
	let tokenTypeObj = require("../../util/token");
	console.log("requestShortAccessToken function called.");

}


facebookIntegrationProcessor.prototype.requestLongAccessToken = function(requestShortAccessToken,facebookProfile,AccessTokenEndPoint,redirectUri){
	let tokenTypeObj = require("../../util/genericServiceResponse");
	console.log("requestLongAccessToken function called.");

}

facebookIntegrationProcessor.prototype.saveLongAccessToken = function(requestToken,facebookProfile){
	let tokenTypeObj = require("../../util/3rdPartyIntegrationUtil");
	console.log("requestLongAccessToken function called.");

}

module.exports = facebookIntegrationProcessor;
// var loginObj = new login();
// loginObj.startLogin();