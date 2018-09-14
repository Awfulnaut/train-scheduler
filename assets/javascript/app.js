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

    var trainName = $('#train-name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var time = moment($('#time-input').val().trim(), "HH:mm").format("X");
    console.log(time);
    var frequency = $('#frequency-input').val().trim();
  })
});



// Initialize page with placeholder? train info

// Accept user input
  // Train name, destination, First train time, and frequency (and submit button)

// Calculate when the next train will arrive, and how many minutes away it is (taking first train time and frequency into account)

// Submit button click event
  // Clear input values
  // Calculations
  // push data to the database
  // Refresh/push changes to the DOM