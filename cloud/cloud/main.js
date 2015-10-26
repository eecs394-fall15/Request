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

//accetped param: {"points": 1, "userId": $id}
Parse.Cloud.define("addPoints", function(request, response) {
  console.log('In addPoints:');
  var query = new Parse.Query(Parse.User);
  query.equalTo('objectId', request.params.userId);
  query.first().then(function(user) {
    Parse.Cloud.useMasterKey();
    user.set("points", user.get("points") + request.params.points);
    user.save().then(function(){
      response.success("User " + request.params.userId + " saved successfully");
    }, function(err) {
      response.error("Failed to save user " + request.params.userId + " with error " + JSON.stringify(err));
    });
  }, function(err) {
    response.error("User query faild with error " + JSON.stringify(err));
  });
});
