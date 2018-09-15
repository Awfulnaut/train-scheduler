// Initialize Firebase
var config = {
  apiKey: "AIzaSyBbIwhl49SI9jrYIPQFxTTGbJb-Lr5izSg",
  authDomain: "train-scheduler-9d838.firebaseapp.com",
  databaseURL: "https://train-scheduler-9d838.firebaseio.com",
  projectId: "train-scheduler-9d838",
  storageBucket: "train-scheduler-9d838.appspot.com",
  messagingSenderId: "786650510950"
};
firebase.initializeApp(config);
var database = firebase.database();

$(document).ready(function() {
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Store user input in variables
    var trainName = $('#train-name-input').val().trim();
    var trainDest = $('#destination-input').val().trim();
    var trainTime = $('#time-input').val().trim();
    var trainFrequency = $('#frequency-input').val().trim();

    // Map values submitted from the form to an object
    var newTrain = {
      name: trainName,
      destination: trainDest,
      time: trainTime,
      frequency: trainFrequency
    }
  
    // Push object to Firebase
    database.ref().push(newTrain);
  
    // Clear out text boxes
    $('#train-name-input').val("");
    $('#destination-input').val("");
    $('#time-input').val("");
    $('#frequency-input').val("");
  });

  database.ref().on("child_added", function(snapshot) {
    var trainName = snapshot.val().name;
    var trainDest = snapshot.val().destination;
    var trainTime = snapshot.val().time;
    var trainFrequency = snapshot.val().frequency;
  
    // Calculate train's next arrival time and minutes away from the current time
    firstArrivalTime = moment(trainTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstArrivalTime), "minutes");
    var timeRemainder = diffTime % trainFrequency;
    var minutesAway = trainFrequency - timeRemainder;
    var nextArrival = moment().add(minutesAway, "minutes");
  
    // Append table data elements containing the values to a new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFrequency),
      $("<td>").text(moment(nextArrival).format("hh:mm")),
      $("<td>").text(minutesAway)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
});