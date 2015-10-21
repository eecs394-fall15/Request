angular
  .module('common')
  .factory('Cloudinary', function ($resource) {
    var Cloudinary = $resource('https://res.cloudinary.com/duizpqaab/:action', {
      api_key: '151566492792415',
      timestamp: Math.floor(Date.now()/1000)

    }, {
      'upload': {
        method:'POST',
        params: {
          action: 'upload',
          file: '@file',
          public_id: '@public_id'
        }
      }
    });

    return Cloudinary;
});
