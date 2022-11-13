const router = require("express").Router();
const robots = require("../models/robots.js");
const pool = require("../utils/mysqlConnection");
var ObjectId = require("mongodb").ObjectID;

router.get("/allActiveRobots", async (req, response) => {
  if (req.query.user_id) {
    return robots
      .find({ userId: req.query.user_id, roboState: "Active" })
      .exec()
      .then((robot) => {
        response.status(200).json(robot);
      })
      .catch((err) => {
        response.status(500).json({ error: err });
      });
  }
  return robots
    .find({ roboState: "Active" })
    .exec()
    .then((robot) => {
      response.status(200).json(robot);
    })
    .catch((err) => {
      response.status(500).json({ error: err });
    });
});

router.get("/robotsByUser", async (req, response) => {
  console.log("User Id", req.query.userId)
  if (!req.query.userId) {
    console.log("User Id If", req.query.userId)
    return robots
      .find()
      .exec()
      .then((robot) => {
        response.status(200).json(robot);
      })
      .catch((err) => {
        response.status(500).json({ error: err });
      });
  } else {
    console.log("User Id else", req.query.userId)
    return robots
      .find({ userId: req.query.userId })
      .exec()
      .then((robot) => {
        response.status(200).json(robot);
      })
      .catch((err) => {
        response.status(500).json({ error: err });
      });
  }

});

router.get("/allRegRobots", async (req, response) => {
  if (req.query.user_id) {
    return robots
      .find({ userId: req.query.user_id })
      .exec()
      .then((robot) => {
        response.status(200).json(robot);
      })
      .catch((err) => {
        response.status(500).json({ error: err });
      });
  }
  return robots
    .find()
    .exec()
    .then((robot) => {
      response.status(200).json(robot);
    })
    .catch((err) => {
      response.status(500).json({ error: err });
    });
});

router.get("/getOperationsInfo", async (req, response) => {
  let returnArr = [];
  console.log("hello")
  if (req.query.user_id) {
    await robots
      .find({ userId: req.query.user_id })
      .exec()
      .then(async (robots) => {
        //console.log("robots :: ", robots.length)
        await robots.map(async (robo) => {
          let obj = {
            _id: robo._id,
            roboId: robo.roboId,
            roboState: robo.roboState,
            userId: robo.userId,
            roboName: robo.roboName
          };
          await pool.query(`select * from billing_details where  user_id = ${obj.userId} and roboId = '${obj._id}'`,

            async (error, result) => {
              //console.log(error) 
              if (result.length > 0) {
                console.log(result[0].operations)
                obj.serviceOperations = await result[0].operations;
                console.log("obj ::", obj)
              } else {
                obj.serviceOperations = 0;
              }
              returnArr.push(obj);

            })


        })

        setTimeout(() => {
          response.status(200).json(returnArr)
        }, 500)

      })
      .catch((err) => {
        console.log("error ::: ", err)
        response.status(500).json({ error: err });
      });

  }

});

router.post("/createRobot", async (req, response) => {
  var robotId = new ObjectId();
  var robot = new robots({
    _id: robotId,
    roboName: req.body.roboName,
    roboPath: req.body.robotPath,
    roboState: "connected",
    runTime: 0,
    userId: req.body.userId,
    roboId: req.body.robotId,
    startSessionTime: req.body.startSessionTime,
    endSessionTime: req.body.endSessionTime,
  });
  return robot.save(function (err, res) {
    if (err) return response.status(500).json({ error: err });
    response.status(200).json(robots);
  });
});

router.post("/changeRobotStatus", async (req, response) => {
  console.log("state", req.body);
  if ("Active" == req.body.roboState) {
    console.log("entered IF");
    console.log("hello", req.body.roboState);
    return robots
      .updateOne(
        { _id: req.body.id },
        { roboState: req.body.roboState, startSessionTime: req.body.timeStamp }
      )
      .exec()
      .then((robot) => {
        response.status(200).json(robot);
      })
      .catch((err) => {
        response.status(500).json({ error: err });
      });
  } else {
    console.log("entered Else");
    robots
      .findById(req.body.id)
      .then((robot) => {
        console.log("robot.runTime", robot.runTime);
        // startTime  = robot.startSessionTime
        let diff = Date.parse(req.body.timeStamp) - robot.startSessionTime;
        let runTime = robot.runTime + diff / 1000;
        console.log(
          "req.body.timeStamp",
          typeof Date.parse(req.body.timeStamp)
        );
        console.log("robot.startSessionTime", typeof robot.startSessionTime);
        console.log("diff", diff);
        console.log("runTime", runTime);
        return robots
          .updateOne(
            { _id: req.body.id },
            { roboState: req.body.roboState, runTime: runTime }
          )
          .exec()
          .then((robot) => {
            response.status(200).json(robot);
          })
          .catch((err) => {
            response.status(500).json({ error: err });
          });
      })
      .catch((err) => {
        response.status(500).json({ error: err });
      });
  }
});

router.post("/changeRobotPath", async (req, response) => {
  const data = {
    x: req.body.x,
    y: req.body.y,
  };
  return robots
    .updateOne({ _id: req.body.id, userId: req.body.userId }, { $push: { roboPath: data } })
    .exec()
    .then((robot) => {
      response.status(200).json(robot);
    })
    .catch((err) => {
      response.status(500).json({ error: err });
    });
});

router.get("/getRobot", async (req, response) => {
  const robotId = req.query.robotId;
  return robots
    .findById(robotId)
    .exec()
    .then((robot) => {
      response.status(200).json(robot);
    })
    .catch((err) => {
      response.status(500).json({ error: err });
    });
});

router.post("/updateStatus", async (req, response) => {
  const data = {
    status: req.body.status
  };
  return robots
    .updateOne({ _id: req.body.id }, { roboState: data.status })
    .exec()
    .then((robot) => {
      response.status(200).json(robot);
    })
    .catch((err) => {
      response.status(500).json({ error: err });
    });
});

module.exports = router;
