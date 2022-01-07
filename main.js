// function errorMessage(error) {
//   document.getElementById('results').style.display = 'none';

//   document.getElementById('loading').style.display = 'none';
//   const errorDiv = document.createElement('div');
//   const card = document.querySelector('.card');
//   const heading = document.querySelector('.heading');
//   errorDiv.className = 'alert alert-danger';
//   errorDiv.appendChild(document.createTextNode(error));

//   card.insertBefore(errorDiv, heading);

//   setTimeout(clearError, 4000);
// }

// function clearError() {
//   document.querySelector('.alert').remove();
// }

// function keypresshandler(event)
// {
//          var charCode = event.keyCode;
//          //Non-numeric character range
//          if (charCode > 31 && (charCode < 48 || charCode > 57))
//          return false;
// }

// ----------------------------------------------------------------------------------------
function userGet(userInt) {
  var user = {};

  if (userInt.length != 0 && userInt[0] == '?') {
    var userIntArray = userInt.substring(1).split('&');
    for (var i = 0; i < userIntArray.length; i++) {
      var userInts = userIntArray[i];
      var equalIdx = userInts.indexOf('=');
      if (equalIdx != -1) {
        var key = userInts.substring(0, equalIdx);
        var value = userInts.substring(equalIdx + 1);
        user[key] = value;
      } else {
        user[userInts] = '';
      }
    } 
  }

  return user;
}
// ----------------------------------------------------------------------------------------
function bmr(gender, weightKg, heightCm, age) {
  console.log(gender, weightKg, heightCm, age);
  if (gender === 'male') {
    return 66 + (13.7 * weightKg) + (5 * heightCm) - (6.8 * age);
  } else if (gender === 'female') {
    return 655 + (9.6 * weightKg) + (1.8 * heightCm) - (4.7 * age);
  } else {
    return 0;
  }
}
// ----------------------------------------------------------------------------------------
function calo(bmr, act) {
  if (act < 1 && act > 5) {
    return 0;
  }
  
  var actBase = 1.2;
  var actMulti = 0.175;
  var result = bmr * (actBase + (actMulti * act));
  return result;
}
// ----------------------------------------------------------------------------------------
function displayCalories(result) {
  var caltotal = document.getElementById('finalcal');
  caltotal.textContent = Math.round(result * 100) / 100;
}
// ----------------------------------------------------------------------------------------
var user = userGet(window.location.search);
var bmr = bmr(user['gender'], parseFloat(user['weight']), parseFloat(user['height']), parseInt(user['age']));
var totalCalories = calo(bmr, parseInt(user['activity']));

displayCalories(totalCalories);

document.getElementById('cal').addEventListener('submit', function(ev) {
  ev.preventDefault();
  
  var lists = document.getElementById('list');
  var children = ev.target.children;
  var carb = children.namedItem('fInput').value;
  var calories = parseFloat(children.namedItem('calories').value);

  var list = document.createElement('div');
  list.classList.add('row', 'card');
  list.style = 'justify-content: space-between; margin-top: 10px;';

  var listName = document.createElement('p');
  listName.textContent = carb;

  var listCalories = document.createElement('p');
  listCalories.textContent = calories + 'cal';
  
  list.appendChild(listName);
  list.appendChild(listCalories);
  lists.appendChild(list);

  var caltotal = document.getElementById('finalcal');
  displayCalories(parseFloat(caltotal.textContent) - calories);

  ev.target.reset();
});
// ----------------------------------------------------------------------------------------