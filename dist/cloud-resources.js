if (window.ag == null) {
  window.ag = {};
}
window.ag.data = {
  "options": {
    "baseUrl": "https://rest-api.appgyver.com/v2/",
    "headers": {
      "steroidsApiKey": "4cc779c2702f130272040eeaf435ac3488d9b9fe495eaee15547567c7b6c6cf9",
      "steroidsAppId": 80662
    }
  },
  "resources": {
    "User": {
      "schema": {
        "fields": {
          "address": {
            "type": "string"
          },
          "createdAt": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "objectId": {
            "type": "string",
            "identity": true
          },
          "phone": {
            "type": "string"
          },
          "requests": {
            "type": "array"
          },
          "updatedAt": {
            "type": "string"
          },
          "username": {
            "type": "string"
          }
        },
        "identifier": "objectId"
      }
    },
    "Request": {
      "schema": {
        "fields": {
          "createdAt": {
            "type": "string"
          },
          "objectId": {
            "type": "string",
            "identity": true
          },
          "state": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "updatedAt": {
            "type": "string"
          }
        },
        "identifier": "objectId"
      }
    }
  }
};