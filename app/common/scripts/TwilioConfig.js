angular.module('common')
.config(function (TwilioProvider) {
    TwilioProvider.setCredentials({
        accountSid: 'ACaf2b3db8583ab43cfe5a8886752bcbbf',
        authToken: 'de3f15ec955466fcb5bf8aead4e00a28'
    });
});