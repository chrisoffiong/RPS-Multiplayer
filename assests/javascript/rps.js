$(document).ready(function () {

    var config = {
      apiKey: "AIzaSyBmrIcG3Fr31RlZ_kzIqWKNjYJCdmOdRdo",
      authDomain: "database-86cb1.firebaseapp.com",
      databaseURL: "https://database-86cb1.firebaseio.com",
      projectId: "database-86cb1",
      storageBucket: "database-86cb1.appspot.com",
      messagingSenderId: "866258597301"
    };
    firebase.initializeApp(config);
  
    var database = firebase.database();
    var currentTime = moment();

    database.ref().on("child_added", function(childSnap) {
    
        var name = childSnap.val().name;
        var destination = childSnap.val().destination;
        var firstTrain = childSnap.val().firstTrain;
        var frequency = childSnap.val().frequency;
        var min = childSnap.val().min;
        var next = childSnap.val().next;
    
        $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
    });
  
    
    //
    $("#submit").on("click", function() {
    
        let trainName = $("#namevalue").val().trim();
        let destination = $("#destinationvalue").val().trim();
        let firstTrain = $("#timevalue").val().trim();
        let frequency = $("#freqvalue").val().trim();
    
        let firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");        let difference = currentTime.diff(moment(firstTrainConverted), "minutes");
        let remainder = difference % frequency;
        let minUntilTrain = frequency - remainder;
        let nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");
       
        let newTrain = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            min: minUntilTrain,
            next: nextTrain
        }
    
        console.log(newTrain);
        database.ref().push(newTrain);
    
        $("#namevalue").val("");
        $("#destinationvalue").val("");
        $("#timevalue").val("");
        $("#freqvalue").val("");
    
        return false;
    });
})