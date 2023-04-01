//Put your firebase config here
const firebaseConfig = {
    apiKey: "AIzaSyDpqG5E5-Epk60vTYzJYB9gu9z4dOlZwk0",
    authDomain: "form-validation-db.firebaseapp.com",
    databaseURL: "https://form-validation-db-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "form-validation-db",
    storageBucket: "form-validation-db.appspot.com",
    messagingSenderId: "1005871424446",
    appId: "1:1005871424446:web:d292e4183dd2be146d4fef"
  };

  firebase.initializeApp(firebaseConfig);

  const FormDB = firebase.database().ref("FormInformation");


const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');


let isValid = false;
let passwordsMatch = false;

function ValidateForm() {
    // Using Contraint API
    isValid = form.checkValidity();
    // Style main message for an error
    if(!isValid){
    message.textContent = 'Please fill out all fields.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red'
    return;
    }
    // Check to see if passwords match
    if(password1El.value === password2El.value){
        passwordsMatch = true;
        password1El.style.borderColor = 'green';
        password2El.style.borderColor = 'green';
    } else {
        passwordsMatch = false;
        message.textContent = 'Make sure passwords match.';
        message.style.color = 'red';
        messageContainer.style.borderColor = 'red';
        password1El.style.borderColor = 'red';
        password2El.style.borderColor = 'red';
        return;
    }
    // If form is valid and passwords match
    if(isValid && passwordsMatch){
        message.textContent = 'Successfully Registered!';
        message.style.color = 'green';
        messageContainer.style.borderColor = 'green';
    }
};

function storeFormDate () {
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value
    };
    // Do somthing with user data
    // console.table(user);
}

function processFormdata(e) {
    e.preventDefault();
    // console.log(e);
    // Validate Form
    ValidateForm();
    // Submit if Valid
    if(isValid && passwordsMatch){
        storeFormDate();
    }
};

function submitForm(e) {
    e.preventDefault();
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value
    };
    saveMessages(user);
    
}    

  const saveMessages = (user) => {
    const newContactForm = FormDB.push();
  
    newContactForm.set({
      user
    }) .then(()=>{
        alert("Data added successfully 👍");
    })
    .catch((error)=>{
        alert(error);
    });
  };  

//Event Listener
form.addEventListener('submit', processFormdata);
form.addEventListener('submit', submitForm);









