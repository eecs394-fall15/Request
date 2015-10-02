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
      title: "My Requests"
      id: "myRequests"
      location: "user#myrequested"
    }
    {
      title: "Accepted requests"
      id: "acceptedRequests"
      location: "user#index" # URLs are supported!
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
  # initialView:
  #   id: "initialView"
  #   location: "example#initial-view"
