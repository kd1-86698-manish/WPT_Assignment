//Author :Manish Karne


//If any error occurs in application we need to send error information to the user with satus code as error.
function createErrorResult(error) { 
  return { status: 'error', error } 
} 

//when request(get,post,put,delete) process succesfully then we need to send data along with status code as succes  
function createSuccessResult(data) { 
    return { status: 'success', data } 
  } 
//creating the final result depending on status . 
  function createResult(error, data) { 
    return error ? createErrorResult(error) : 
  createSuccessResult(data) 
  } 

  //to make available all three function in other Js file 
  module.exports = { 
    createResult, 
    createSuccessResult, 
    createErrorResult, 
  } 