const Validate = ({fullname, username, email, password, cf_password , gender}) => {

    const err ={}

    if(!fullname){
        err.fullname = "Please add your full name" 
    }else if(fullname.length >25){
        err.fullname = "Full name is up to 25 characters only"
    }


    if(!username){
        err.username = "Please add your user name" 
    }else if(fullname.replace(/ /g,"") > 25){
        err.fullname = "Full name is up to 25 characters only"
    }


    if(!email){
        err.email = "Please add your email" 
    }else if(!validateEmail(email)){
        err.email = "Email format is incorrect"
    }


    if(!password){
        err.password = "Please add your password" 
    }else if(password.lengt < 6){
        err.password = "password must be at least 6 characters or more"
    }


    if(!cf_password){
        err.cf_password = "Please add your confirm password" 
    }else if(password !== cf_password){
        err.cf_password = "Confirm Password did not match " 
    }
    
    return{
        errMsg: err,
        errLength: Object.keys(err).length
        
    }
}



const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };



  export default Validate