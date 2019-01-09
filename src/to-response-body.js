'use strict';
const errorToString = require('./error-to-string');
module.exports = function toResponseBody(event) {
	if (event.Error) {
		return {
			Status: 'FAILED',
			Reason: errorToString(event.Error),
			PhysicalResourceId: event.PhysicalResourceId || `fail:${Date.now()}`,
			StackId: event.StackId,
			RequestId: event.RequestId,
			LogicalResourceId: event.LogicalResourceId
		};
	} else {
		return {
			Status: 'SUCCESS',
			PhysicalResourceId: event.PhysicalResourceId,
			StackId: event.StackId,
			RequestId: event.RequestId,
			LogicalResourceId: event.LogicalResourceId,
			Data: event.Data
		};
	}
};
