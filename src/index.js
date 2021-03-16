import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap';
import $ from 'jquery';



import "./jokeFacade"
import userFacade from "./userFacade"
import jokeFacade from "./jokeFacade"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */


function showJokes()
{
  const allJokes = jokeFacade.getJokes().map(joke => `<li>${joke}</li>`).join("")
  document.getElementById("jokes").innerHTML = allJokes
}

showJokes();

let jokeByIdButton = document.getElementById("jokeByIdButton")
jokeByIdButton.addEventListener('click', (event) =>
{
  let jokeByIdText = document.getElementById("jokeByIdText").value
  let jokeById = jokeFacade.getJokeById(jokeByIdText)
  if (jokeById !== undefined)
    document.getElementById("jokeByIdOutput").innerHTML = jokeById
  else
    document.getElementById("jokeByIdOutput").innerHTML = "Nummer findes ikke"
});

const addJokeButton = document.getElementById("addJokeButton")
addJokeButton.addEventListener('click', (event) =>
{
  const addJokeText = document.getElementById("addJokeText").value
  if (addJokeText.length > 0)
  {
    jokeFacade.addJoke(addJokeText)
    showJokes()
  }
})

/* JS For Exercise-2 below */

function getMinuteJoke()
{
  const hourlyJokeText = document.getElementById("minuteJokeText")
  fetch('https://api.chucknorris.io/jokes/random')
    .then(function (response)
    {
      return response.json();
    })
    .then(function (data)
    {
      hourlyJokeText.innerHTML = `<ul><li>${data.value}</li><li>Url: <a href="${data.url}">${data.url}</a>`
    });
}

const minuteJokeButton = document.getElementById("minuteJokeButton")
minuteJokeButton.addEventListener('click', (event) =>
{
  getMinuteJoke();
  setInterval(getMinuteJoke, 1000 * 60);
})


/* JS For Exercise-3 below */

getAllUsers()
document.getElementById("findUserButton").addEventListener('click', event => findUser())
document.getElementById("addUserButton").addEventListener('click', event => addUser())
document.getElementById("editUserButton").addEventListener('click', event => editUser())
document.getElementById("deleteUserButton").addEventListener('click', event => deleteUser())

function getAllUsers()
{
  userFacade.getAllUsers().then(users => showAllUsers(users))
}

function showAllUsers(users)
{
  const usersToHtml = users.map(user => `
      <tr>
        <td>${user.id}</td>
        <td>${user.age}</td>
        <td>${user.name}</td>
        <td>${user.gender}</td>
        <td>${user.email}</td></tr>`
  )
  document.getElementById("allUserRows").innerHTML = usersToHtml.join("")
}

function findUser()
{
  const userId = document.getElementById("findUserText").value
  userFacade.getUser(userId)
    .then(user =>
    {
      document.getElementById("findUserDiv").innerHTML = `
      <h5 style="margin-top:20px">We found a user!</h5>  
      <table>
          <tr><td>Id:</td><td>${user.id}</td></tr>
          <tr><td>Age: </td><td>${user.age}</td></tr>
          <tr><td>Name: </td><td>${user.name}</td></tr>
          <tr><td>Gender: </td><td>${user.gender}</td></tr>
          <tr><td>Email:</td><td>${user.email}</td></tr>
        </table>`
    })
    .catch(err => errorHandling(err))
}

function addUser()
{
  const newUser = {
    age: document.getElementById("addUserAgeText").value,
    name: document.getElementById("addUserNameText").value,
    gender: document.getElementById("addUserGenderText").value,
    email: document.getElementById("addUserEmailText").value
  }

  userFacade.addUser(newUser)
    .then(user =>
    {
      document.getElementById("addUserResult").innerHTML = `
      <h5 style="margin-top:20px">We added a user successfully!</h5>  
      <table>
          <tr><td>Id:</td><td>${user.id}</td></tr>
          <tr><td>Age: </td><td>${user.age}</td></tr>
          <tr><td>Name: </td><td>${user.name}</td></tr>
          <tr><td>Gender: </td><td>${user.gender}</td></tr>
          <tr><td>Email:</td><td>${user.email}</td></tr>
        </table>`
      getAllUsers();
    })
    .catch(err => errorHandling(err))
}

function editUser()
{
  const newUser = {
    id: document.getElementById("editUserIdText").value,
    age: document.getElementById("editUserAgeText").value,
    name: document.getElementById("editUserNameText").value,
    gender: document.getElementById("editUserGenderText").value,
    email: document.getElementById("editUserEmailText").value
  }
  userFacade.editUser(newUser, document.getElementById("editUserIdText").value)
    .then(user =>
    {
      document.getElementById("editUserResult").innerHTML = `
      <h5 style="margin-top:20px">We updated the user successfully!</h5>  
      <table>
          <tr><td>Id:</td><td>${user.id}</td></tr>
          <tr><td>Age: </td><td>${user.age}</td></tr>
          <tr><td>Name: </td><td>${user.name}</td></tr>
          <tr><td>Gender: </td><td>${user.gender}</td></tr>
          <tr><td>Email:</td><td>${user.email}</td></tr>
        </table>
      `
      getAllUsers();
    })
    .catch(err => errorHandling(err))
}

function deleteUser()
{
  userFacade.deleteUser(document.getElementById("deleteUserText").value)
    .then(user =>
    {
      document.getElementById("deleteUserDiv").innerHTML = `
      <h5 style="margin-top:20px">We deleted the user successfully!</h5>  
    `
      getAllUsers();
    })
    .catch(err => errorHandling(err))
}

function errorHandling(err)
{
  if (err.status)
  {

    err.fullError.then(e =>
    {
      $("#errorMessage").text(e.msg);
      $("#errorModal").modal();
      // err.fullError.then(e => console.log(e.msg))
    })
  }
  else
  {
    $("#errorMessage").text("Network error. The user API is not responding.");
    $("#errorModal").modal();
    // console.log("Network error")
  }
}

/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow)
{

  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt)
{
  const id = evt.target.id;
  switch (id)
  {
    case "ex1": hideAllShowOne("ex1_html"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



