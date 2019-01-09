'use strict';
const aws = require('aws-sdk'),
	stepfunctions = new aws.StepFunctions(),
	httpsPut = require('./https-put'),
	toResponseBody = require('./to-response-body'),
	uploadResults = function (event) {
		console.log('received', JSON.stringify(event));
		const body = JSON.stringify(toResponseBody(event));
		return httpsPut(event.ResponseURL, body);
	},
	startStateMachine = function (event) {
		console.log('received', JSON.stringify(event));
		const params = {
			stateMachineArn: process.env.STATE_MACHINE,
			input: JSON.stringify(event)
		};
		return stepfunctions.startExecution(params).promise()
			.catch(e => {
				console.error('error executing state machine', e);
				return uploadResults(Object.assign(event, {Error: e}));
			});
	};
exports.uploadResults = uploadResults;
exports.startStateMachine = startStateMachine;

