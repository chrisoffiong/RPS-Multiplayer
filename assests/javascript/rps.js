$(document).ready(function () {
// firebase data
    var config = {
      apiKey: "AIzaSyBmrIcG3Fr31RlZ_kzIqWKNjYJCdmOdRdo",
      authDomain: "database-86cb1.firebaseapp.com",
      databaseURL: "https://database-86cb1.firebaseio.com",
      projectId: "database-86cb1",
      storageBucket: "database-86cb1.appspot.com",
      messagingSenderId: "866258597301"
    };
    // initializing firebase
    firebase.initializeApp(config);
  
    var database = firebase.database();
    //standardize time
    var currentTime = moment();
//storing data within the database
    database.ref().on("child_added", function(childSnap) {
    
        var name = childSnap.val().name;
        var destination = childSnap.val().destination;
        var firstTrain = childSnap.val().firstTrain;
        var frequency = childSnap.val().frequency;
        var min = childSnap.val().min;
        var next = childSnap.val().next;
    //appending data to the table in the HTML based on values from the database on page load
        $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
    });
  
    
    //upon button click
    $("#submit").on("click", function() {
    //pulling values from the user input field
        let trainName = $("#namevalue").val().trim();
        let destination = $("#destinationvalue").val().trim();
        let firstTrain = $("#timevalue").val().trim();
        let frequency = $("#freqvalue").val().trim();
    //converting the train's time to the current date
        let firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    //math to display the amount of minutes until the next train
        let difference = currentTime.diff(moment(firstTrainConverted), "minutes");
        let remainder = difference % frequency;
        let minUntilTrain = frequency - remainder;
        let nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");
       // calling upon the database
        let newTrain = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            min: minUntilTrain,
            next: nextTrain
        }
    
        //pushing the value from the input field into the database.
        database.ref().push(newTrain);
    
        $("#namevalue").val("");
        $("#destinationvalue").val("");
        $("#timevalue").val("");
        $("#freqvalue").val("");
    
        return false;
    });
})