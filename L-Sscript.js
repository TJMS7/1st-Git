const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (() => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});
signupLink.onclick = (() => {
    signupBtn.click();
    return false;
});


// Login Fetch


document
    .querySelector('#regForm button')
    .addEventListener('click', doReg);
document
    .querySelector('#loginForm button')
    .addEventListener('click', doLogin);

function doReg(ev) {
    ev.preventDefault();
    console.log('Send a Register request');
    let em = document.querySelector('#regForm .username').value;
    let pass = document.querySelector('#regForm .pass').value;
    let cpass = document.querySelector('#regForm .cpass').value;
    //TODO: Add form validation
    let user = { username: em, password: pass, confirm_password: cpass };
    let endpoint = 'signup/';
    sendData(user, endpoint, signupSuccess);
}

function doLogin(ev) {
    ev.preventDefault();
    console.log('Send a login request');
    let em = document.querySelector('#loginForm .email').value;
    let pass = document.querySelector('#loginForm .pass').value;
    //TODO: Add form validation
    let user = { username: em, password: pass };
    let endpoint = 'login/';
    sendData(user, endpoint, loginSuccess);
}

function sendData(user, endpoint, callback) {
    let url = `http://127.0.0.1:4000/${endpoint}`;
    let h = new Headers();
    h.append('Content-Type', 'application/json');

    let req = new Request(url, {
        method: 'POST',
        headers: h,
        body: JSON.stringify(user),
    });

    fetch(req).then(function (response) {
        if (response.status === 404) {
            // response.json().then(function (object) {
            console.log('error')
        }
        else if (response.status === 200) {
            response.json().then(function (object) {
                console.log('success')
            })
        }
    })

    //   fetch(req).then((response) => {
    //     if (response.status === 404 || response.status === 200) {
    // return response.json()
    //   })
    //     .then((responseJson) => {
    //       callback(responseJson)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       alert("Username or Password is Incorrect");
    //     });


    // < !--fetch(req) -->
    // < !--        .then(response => response.json())-->
    // < !--        .then(data => {
    //           -->
    // < !--console.log('Success:', data)-->
    // < !--        })-->
    // < !--        .catch((error) => {
    //             -->
    // < !--console.error('Error:', error); -->
    // < !--        }); -->

    // < !--fetch(req)-->
    // < !--            .then((res) => {
    //               -->
    // < !--              if (res.status === 200 || res.status === 201) {
    //                 -->
    // < !--res.json(); -->
    // < !--console.log('1st')-->
    // < !--                } -->
    // < !--                 else {
    //                 return console.log("Error"); -->
    // < !--                 } -->
    // < !--                 })-->
    // < !--            .then((token) => {
    //                   console.log(token)-- >
    // < !--callback(token)
    //                 })-->

    // < !--                 .catch((failure) => {
    //                   -->
    // < !--console.log(failure)-->
    // < !--                  }); -->
    // < !--fetch(req)-->
    // < !--          .then((res) => res.json())-->
    // < !--          .then((data) => {
    //                     -->
    // < !--            //we have a response-->
    // < !--            if ('error' in data) {
    //                       -->
    // < !--              //bad attempt-->
    // < !--failure(data.error); -->
    // < !--            } -->
    // < !--            else {
    //                       -->
    // < !--              //it worked-->
    // < !--callback(data); -->
    // < !--            } -->
    // < !--          })-->
    // < !--          .catch(failure); -->
}

function loginSuccess(token) {
    //we have a token so put it in localstorage
    console.log('token', token);
    sessionStorage.setItem('myapp-token', token);
    alert('You are logged in');
}

function signupSuccess(data) {
    //user has been registered
    console.log('new user created', data);
    alert('You have been registered');
}

function failure(err) {
    alert(err.message);
    console.warn(err.code, err.message);
}
