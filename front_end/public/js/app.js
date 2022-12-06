
const awsIot = require('aws-iot-device-sdk');

var OdometryControlInstance;
var SyncJobFunction;
var SaveMapFunction;
var GoToTargetFunction;
var MoveAction = "";
var MoveActionPrev = "";
var SyncLastTime = 0;
var robotStatus = "connected";
var locationoo = {
  x : 0,
  y: 0
}

// var backend = "http://54.219.150.111:3001";
var backend = "http://localhost:3001";

async function main() {

  // FIXME: 直接Credentialを指定する場合に有効にする ->
  //const credentials = await getRawCredentials();
  
  // <-

 
  async function postLocation(location)  {
    const rawResponse = await fetch(backend+"/api/robots/changeRobotPath", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(location)
    });
    const content = await rawResponse.json();
    console.log(content);
  };
  async function updateRoboStatus(status)  {
    const rawResponse = await fetch(backend+"/api/robots/changeRobotStatus", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(status)
    });
    const content = await rawResponse.json();
    console.log(content);
  };

  async function updateServiceOperations(serviceOps)  {
    const rawResponse = await fetch(backend+"/api/users/updateServiceOperations", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serviceOps)
    });
    const content = await rawResponse.json();
    console.log(content);
  };
  async function getCognitoCredentials() {
    AWS.config.region = region;
    var cognitoidentity = new AWS.CognitoIdentity();
    var params = {
      IdentityPoolId: PoolId
    };
    const identityId = await cognitoidentity.getId(params).promise();
    const data = await cognitoidentity.getCredentialsForIdentity(identityId).promise();
        var credentials = {
          accessKey: data.Credentials.AccessKeyId,
          secretKey: data.Credentials.SecretKey,
          sessionToken: data.Credentials.SessionToken
        };
        return credentials;
  }
  // FIXME: Cognitoを使ってCredentialを取得する場合に有効にする ->
  const credentials = await getCognitoCredentials();
  
  // <-

  const deviceIot = awsIot.device({
      region: region,
      clientId: iotclientId,
      accessKeyId: credentials.accessKey,
      secretKey: credentials.secretKey,
      sessionToken : credentials.sessionToken, // FIXME: 直接Credentialを指定する場合はコメントアウト
      protocol: 'wss',
      port: 443,
      host: iotendpoint
  });

  deviceIot.subscribe(subscribe_topic, undefined, function (err, granted){
      if( err ){
          console.log('subscribe error: ' + err);
      } else {
          console.log('subscribe success');
      }
  });

  var x = 0;
  var y = 0;
  deviceIot.on('message', function(_topic, payload) {
    var json = JSON.parse(payload.toString());
    let command = json["command"];
    if (command == "location") {
      let odom = json["odom"];
      if (odom) {
        OdometryControlInstance.setState({
          x:odom["x"].toFixed(2),
          y:odom["y"].toFixed(2),
          z:odom["z"].toFixed(2),
          h:(odom["yaw"] * ( 180 / Math.PI )).toFixed(2)
        })
        locationoo.x = odom["x"];
        locationoo.y = odom["y"];
        
        // console.log(this.y);
                
      }
    }
    else if (command == "result") {
        alert(json["message"])
    }
  });

  //----
  
  SyncJobFunction = function() {
    let payload = {};
    let shouldPublish = false;
    if (MoveAction !== "") {
      if (MoveAction != MoveActionPrev) {
        MoveActionPrev = MoveAction;
        shouldPublish = true;
        console.log("here "+this.x);
        console.log("localStorage :: ", localStorage.getItem("roboId"))
        let location = {
          x:locationoo.x,
          y:locationoo.y,
          id:localStorage.getItem("roboId"),//"6085e0af84f5e35f52505cb8",//
          userId:localStorage.getItem("user_Id"),//"11"//localStorage.getItem("userId")
        }
      postLocation(location);
 
      const data = {
        roboState: MoveActionPrev === "stop" && MoveAction!="stop" ? "Active" : MoveAction==="stop"?"InActive":"Active",
        id: localStorage.getItem("roboId"),
        timeStamp: new Date(),
      };
      
      updateRoboStatus(data);

      let serviceOperation = {
        roboId:localStorage.getItem("roboId"),//"6085e0af84f5e35f52505cb8",//
        userId:localStorage.getItem("user_Id"),//"11"//localStorage.getItem("userId")
      }

      updateServiceOperations(serviceOperation);
      }
      let t = (new Date()).getTime();
      if (t > SyncLastTime + 1500) {
        SyncLastTime = t;
        shouldPublish = true;
      } 
    }
    if (shouldPublish) {
      console.log("Sync:" + MoveAction);
      payload["command"] = "move";
      payload["action"] = MoveAction;
      shouldPublish = true;
      deviceIot.publish(publish_topic, JSON.stringify(payload));
    }
  }

  GoToTargetFunction = function(x,y, heading) {
    console.log("go to target!!");
    let payload = {};
    let request_id =  (new Date()).getTime();
    payload["command"] = "navigation";
    payload["action"] = "setGoal";
    payload["request_id"] = request_id
    payload["x"] = Number(x);
    payload["y"] = Number(y);
    payload["yaw"] = heading * ( Math.PI / 180 ) ;
    console.log(payload);
    deviceIot.publish(publish_topic, JSON.stringify(payload));
    MoveAction = "";
  };

  SaveMapFunction = function() {
    let payload = {};
    console.log("save map!!");
    let request_id =  (new Date()).getTime();
    payload["command"] = "map";
    payload["action"] = "save";
    payload["request_id"] = request_id
    console.log(payload);
    deviceIot.publish(publish_topic, JSON.stringify(payload));
  }


  setInterval(SyncJobFunction, 1000);  
}

main();




