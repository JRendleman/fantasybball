function Player(name) {
    this.name = name
    this.team = null
    this.budget = 100.00
}

function Team(name) {
    this.name = name
}

$(document).ready(function() {
    let container = $("#container");
    addLoginField(container);
});

function addLoginField(container) {
    // Login form, fields and buttons
    let usernameField = "<span>Username</span><br><input id='username' type='text' id='usernameField' value=''>";
    let passwordField = "<br><br><span>Password</span><br><input id='password' type='password' id='passwordField' value=''>";
    let form = document.createElement("form")
    let loginButton = "<br><br><input id='login' type='button' value='SIGN IN' onclick='loginUser()'>"
    $(form).append(usernameField);
    $(form).append(passwordField);
    $(form).append(loginButton);
    $(container).append(form);
};

function tearDownInterface() {
    let container = $("#container");
    container.empty();
}

function loginUser() {
    // Log user in to the backend.
    // Triggers when login button is pressed.
    tearDownInterface()
};

function startGame(Game) {
    // Starts a game in the season.
};

function resumeGame(Game) {} ;

function viewPlayer(playerID) {
    // Triggers after a player is tapped. 
    // Displays statistics, picture, and other relevant info.
};

function startDraft() {};

function advanceDraft() {};

function makeDraftSelection() {};

