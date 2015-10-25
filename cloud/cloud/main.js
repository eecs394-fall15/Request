Parse.Cloud.afterSave(Parse.User, function(request) {
  console.log('In afterSave for User:');
  if (!request.object.existed()) {

    Parse.Cloud.useMasterKey();
    var currentACL = request.object.getACL();

    console.log('Object Original: ' + JSON.stringify(request.object));
    console.log('Checking CurrentACL ...');
    if (typeof currentACL === 'undefined') {
      console.log('CurrentACL is undefined');
      currentACL = new Parse.ACL(request.object);
      console.log('Creating CurrentACL: ' + JSON.stringify(currentACL));
    } else {
      console.log('CurrentACL has been defined');
      currentACL.setPublicReadAccess(true);
      currentACL.setPublicWriteAccess(false);
      currentACL.setReadAccess(request.object, true);
      currentACL.setWriteAccess(request.object, true);
      console.log('Setting CurrentACL: ' + JSON.stringify(currentACL));
    }

    request.object.setACL(currentACL);

    console.log('Object Modified: ' + JSON.stringify(request.object));
    request.object.save();
  }
});
