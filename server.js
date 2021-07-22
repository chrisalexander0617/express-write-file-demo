const express = require('express');
const fs = require('fs');
const app = express();

//app.use(express.static('public'))

var newObject = {
  name:'Name',
  order_count:0,
  address:'PO Box Las Vegas, NV'
};

//location, stringed data, and callback function(error, data)
fs.writeFile('./newCustomer.json', JSON.stringify(newObject, null, 4), (thereIsAnError) => {
  if(thereIsAnError){
    console.log(err);
  } else {
    console.log('File succesfully created')
  }
});

jsonReader('./customer.json', (thereIsAnError, data) => {
  if(thereIsAnError){
    console.error(thereisAnError);
  } else {
    data.order_count += 1;
    fs.writeFile('./customer.json', JSON.stringify(data), err => {
      if(err) {
        console.log(err)
      }
    })
  }
});

function jsonReader(filePath, callback){
  //path, encoding, and callback function(error, data)
  fs.readFile('./customer.json', 'utf-8', ( thereIsAnError, customerData ) =>{
    if(thereIsAnError) {
      return callback && callback(thereIsAnError);
    }
    //Since JSON.parse is asynchronous, we wll wrap
    //it in a try catch to prevent breaking application
    try {
      const dataObject = JSON.parse(customerData);
      return callback && callback(null, dataObject);
    } catch(thereIsAnError) {
      return callback && callback(thereIsAnError);
    }
  });
};


app.listen( 8080, () => {
  console.log('server started on port 8080')
});