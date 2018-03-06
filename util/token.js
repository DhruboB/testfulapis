
'use strict';

var token = function(){
	var token = "";

//var initialization comes here

};

token.prototype.getTokenType = function(){
	let tokenTypeObj = require("../../util/Def/tokenType");
	let tokenType = "tokenTypeObj.tokenType1";

}


token.prototype.getToken = function(){
	token = "abcdef";
}

token.prototype.getTokenIdentifier = function(){
	let applicationIdentifierObj = require("../../util/Def/applicationIdentifier");
	let applicationIdentifier = "applicationIdentifierObj.applicationIdentifier1";

}

token.prototype.getExpiresIn = function(){
	let expiresIn = 1111;

}

module.exports = token;
// var loginObj = new login();
// loginObj.startLogin();


function Token (token,applicationIdentifier,tokenType,expiresIn) {

	console.log("Token function called.");
}