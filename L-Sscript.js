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

// Fetch API

document.getElementById('regForm').addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});
document.getElementById('loginForm').addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});
document
    .querySelector('#regForm button')
    .addEventListener('click', doReg);
document
    .querySelector('#loginForm button')
    .addEventListener('click', doLogin);

function doReg(ev) {
    ev.preventDefault();
    console.log('Send a Register request');
    let firstName = document.querySelector('#regForm .fn').value;
    let lastName = document.querySelector('#regForm .ln').value;
    let em = document.querySelector('#regForm .email').value;
    let mobileNo = document.querySelector('#regForm .mn').value;
    let schoolName = document.querySelector('#regForm .sn').value;
    let clss = document.querySelector('#regForm .cls').value;
    let section = document.querySelector('#regForm .cs').value;
    let rollNo = document.querySelector('#regForm .rn').value;
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
    let url = `http://127.0.0.1:5502/${endpoint}`;
    let h = new Headers();
    h.append('Content-Type', 'application/json');

    let req = new Request(url, {
        method: 'POST',
        headers: h,
        body: JSON.stringify(user),
    });

    fetch(req).then((response) => {
        if (response.status === 200) {
            response.json();
        } else if (response.status === 201) {
            alert("Account Created Successfully.  LOGIN NOW!!!!!!");
        } else if (response.status === 400) {
            alert("Error = " + response.status + " Bad Request ")
            throw new Error('Something went wrong');
        } else if (response.status === 401) {
            alert("Error = " + response.status + " Unauthorized User Request")
            throw new Error('Something went wrong');
        } else if (response.status === 403) {
            alert("Error = " + response.status + " Forbidden!! Permission not Granted")
            throw new Error('Something went wrong');
        } else if (response.status === 404) {
            alert("Error = " + response.status + " User not Found!")
            throw new Error('Something went wrong');
        } else if (response.status === 405) {
            alert("Error = " + response.status + " Method not allowed by server!")
            // throw new Error('Something went wrong');
        } else if (response.status === 409) {
            alert("Error = " + response.status + " User doesn't exists in Database")
            throw new Error('Something went wrong');
        } else if (response.status === 500) {
            alert("Error = " + response.status + " Sorry! Internal Server Error")
            throw new Error('Something went wrong');
        } else if (response.status === 503) {
            alert("Error = " + response.status + " Sorry! Server Error")
            throw new Error('Something went wrong');
        }
        else {
            alert("Something went WRONG!!")
            throw new Error('Something went wrong');
        }
    })
        .then((responseJson) => {
            callback(responseJson)
        })
        .catch((error) => {
        });
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