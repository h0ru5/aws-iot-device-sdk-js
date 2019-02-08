/*
 * Copyright 2010-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

//node.js deps

//npm deps

//app deps

function buildBuilder(mqttClient, opts) {
  var connection;

  connection = opts.agent.callback(undefined, opts, function(err,socket) {
   function handleTLSerrors(err) {
      mqttClient.emit("error", err);
      socket.end();
    }

    if(err) {
       handleTLSerrors(err);
    }
  
    socket.on("secureConnect", function() {
      if (!socket.authorized) {
        socket.emit("error", new Error("TLS not authorized"));
      } else {
        socket.removeListener("error", handleTLSerrors);
      }
    });
  
    socket.on("error", handleTLSerrors);
  });

  return connection;
}

module.exports = buildBuilder;
