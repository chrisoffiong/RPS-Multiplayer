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

    let name = "";
    let destination = "";
    let time = "";
    let frequency = "";
    $('#submit').on('click', function (event) {
        event.preventDefault();
        name = $("#namevalue").val()
        destination = $("#destinationvalue").val()
        time = $("#timevalue").val()
        frequency = $("#freqvalue").val()
        console.log(name)
        console.log(destination)
        console.log(time)
        console.log(frequency)
    })
    database.ref().push({
        name: name,
        destination: destination,
        time: moment(time).format("MMMM Do YY"),
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
        var sv = snapshot.val();
        let monthWorked = (moment().diff(moment(time), 'months'))
        $(".ename").text(sv.name);
        $(".destination").text(sv.destination);
        $(".time").text(sv.time);
        $(".freq").text(moment().diff(moment(time), 'month'))
})
})    