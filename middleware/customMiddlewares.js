const checkInput = (input) => {
    if(input){
        if(input === 1 || input === -1){
           return input
        }
     }else{
        return  1
     }
}

const isISO8601Date = (input) => {
   const regex = /^\d{4}-\d{2}-\d{2}$/;
   return regex.test(input);
}

const isStringLong = (input) => {
   return input.length <= 10;
}

module.exports = {
   checkInput,
   isISO8601Date,
   isStringLong
}