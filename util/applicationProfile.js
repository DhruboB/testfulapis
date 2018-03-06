
'use strict';


var applicationProfile = function(){
	var token = "";

//var initialization comes here

};

applicationProfile.prototype.getTokenType = function(){
	let tokenTypeObj = require("../../util/Def/tokenType");
	let tokenType = "tokenTypeObj.tokenType1";

}

// applicationProfile.prototype.getToken = function(){
// 	token = "abcdef";
// }

// applicationProfile.prototype.getTokenIdentifier = function(){
// 	let applicationIdentifierObj = require("../../util/Def/applicationIdentifier");
// 	let applicationIdentifier = "applicationIdentifierObj.applicationIdentifier1";

// }

// applicationProfile.prototype.getExpiresIn = function(){
// 	let expiresIn = 1111;

// }

module.exports = applicationProfile;
// var loginObj = new login();
// loginObj.startLogin();


function applicationProfile (applicationIdentifier,clientId,clientSecret) {

	console.log("applicationProfile function called.");
}