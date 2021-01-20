// var url = "http://localhost:3000"
var url = 'https://db-signup-login.herokuapp.com'
function userSignup() {
    console.log(document.getElementById('name').value)
    axios({
        method: 'post',
        url: url + '/signup',
        data: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('pass').value,
            phone: document.getElementById('phone').value,
            gender: document.getElementById('gender').value,
        },
        credentials: 'include'
    }).then((response) => {
        if (response.data.status === 200) {
            alert(response.data.message)
            location.href = "./login.html"
        } else {
            alert(response.data.message);
        }
    }).catch((error) => {
        console.log(error);
    });
    return false
}

function login() {
    axios({
        method: 'post',
        url: url + '/login',
        data: {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        },
        credentials: 'include' //true
    }).then((response) => {
        if(response.data.status === 200){
            alert(response.data.message)
            location.href = "./profile.html"
        }
        else{
            alert(response.data.message)
        }
    }, (error) => {
        console.log(error);
    });
    return false
}

function getProfile() {
    axios({
        method: 'get',
        url: url + '/profile',
        credentials: 'include',
    }).then((response) => {
        console.log(response);
        document.getElementById('pName').innerHTML = response.data.profile.name
        document.getElementById('pEmail').innerHTML = response.data.profile.email
        document.getElementById('pPhone').innerHTML = response.data.profile.phone
        document.getElementById('pGender').innerHTML = response.data.profile.gender
    }, (error) => {
        console.log(error.message);
        location.href = "./login.html"
    });
    return false
}
function forgetPassword() {
    // alert("asd")
    let email = document.getElementById('fEmail').value;
    localStorage.setItem('email', email)
    axios({
        method: 'post',
        url: url + '/forget-password',
        data: {
            email: email,
        },
        credentials: 'include'
    }).then((response) => {
        if(response.data.status === 200){
            alert(response.data.message)
            location.href = "./forget2.html"      
        }
        else{
            alert(response.data.message)
        }
    }, (error) => {
        console.log(error);
    });
    return false
}
function forgetPassword2() {
   // console.log(document.getElementById('newPassword').value,)
   // console.log(document.getElementById('otpcode').value,)
    let getEmail = localStorage.getItem('email')
    axios({
        method: 'post',
        url: url + '/forget-password-2',
        data: {
            email: getEmail,
            newPassword: document.getElementById('newPassword').value,
            otp: document.getElementById('otpcode').value,
        },
        credentials: 'include'
    }).then((response) => {
        console.log(response);
        alert(response.data)
        location.href = "./login.html"
    }, (error) => {
        console.log(error);
    });
    return false
}
function logout() {
    axios({
        method: 'post',
        url: url + '/logout',
    }).then((response) => {
        console.log(response);
        location.href = "./login.html"
    }, (error) => {
        console.log(error);
    });
    return false
}