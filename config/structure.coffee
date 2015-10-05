# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css

  tabs: [
    {
      title: "Feed"
      id: "feed"
      location: "request#index" # Supersonic module#view type navigation
    }
    {
      title: "Requested"
      id: "myRequests"
      location: "request#myrequests"
    }
    {
      title: "Accepted"
      id: "acceptedRequests"
      location: "request#myaccepted" # URLs are supported!
    }
    {
      title: "My Profile"
      id: "profile"
      location: "request#profile" # URLs are supported!
    }

  ]

  rootView:
    location: "request#index"

  #preloads: []

  # drawers:
  #   left:
  #     id: "leftDrawer"
  #     location: "example#drawer"
  #     showOnAppLoad: false
  #   options:
  #     animation: "swingingDoor"
  #
  initialView:
    id: "initialView"
    location: "request#login"
