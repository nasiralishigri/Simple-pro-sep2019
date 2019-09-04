const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');


// var testing_connection = require('./views/js/testingConnection.js');
///Use Handle Bar Express JS /////
// var exphbs = require('express-handlebars');
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
// parse application/x-www-form-urlencoded
var unique = require('uniq');



app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', express.static('views'));
app.use('/index', express.static('views'));

app.get('/getAccounts', (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function (answer) {
    res.send(answer);
  })
});
app.get('/sendTranacrion',async(req,res)=>{
//let getaccount=await truffle_connect.start();
 //console.log('hammad zahid 12234  '+getaccount)
 let pakistan=await truffle_connect.lifeIsTest();




res.send("transection is true")

})

app.post('/getBalance', (req, res) => {
  console.log("**** GET /getBalance ****");
  console.log(req.body);
  let currentAcount = req.body.account;

  truffle_connect.refreshBalance(currentAcount, (answer) => {
    let account_balance = answer;
    truffle_connect.start(function(answer){
      // get list of all accounts and send it along with the response
      let all_accounts = answer;
      response = [account_balance, all_accounts]
      res.send(response);
    });
  });
});

app.post('/sendCoin', (req, res) => {
  console.log("**** GET /sendCoin ****");
  console.log(req.body);

  let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;

  truffle_connect.sendCoin(amount, sender, receiver, (balance) => {
    res.send(balance);
  });
});


// app.get('/:id', function(req, res){
//   console.log(req.params.id);
//   res.send("Hel");

//   // res.sendFile(_dirname + '/'+ req.params.id );//req.params.id
// });





app.get('/getTokenName',async(req,res)=>{   ///// Getting Token ///////
  // console.log("pre provider")
  const name=await truffle_connect.tokenName();
  console.log('Token Name is: '+ name);
  res.send(name);
});

app.get('/getTokenSymbol',async(req,res)=>{   ///// Getting Token Symbol ///////
  // console.log("pre provider")/ate',async(req,res)=>{   ///// Getting Token  Rate///////
  // console.log("pre provider")
  const tokenRate =await truffle_connect.tokenRate();
  console.log('Token Decemal is:  '+ tokenRate);
  res.send(tokenRate);
});
app.get('/getWeiRaised',async(req,res)=>{   ///// Getting Wei Raised ///////
  // console.log("pre provider")
  const weiRaised =await truffle_connect.weiRaised();
  console.log("Raised Wei is:  "+ weiRaised);
  res.send(weiRaised);
});
app.get('/getTokenAddress',async(req,res)=>{   ///// Getting Token Address ///////
  // console.log("pre provider")
  const tokenAddress = await truffle_connect.tokenAddress();
  console.log("Token Address is:  "+ tokenAddress);
  res.send(tokenAddress);
});
app.get('/getWalletAddress',async(req,res)=>{   ///// Getting Token Address ///////
  // console.log("pre provider")
  const walletAddress = await truffle_connect.walletAddress();
  console.log("Wallet Address is:  "+ walletAddress);
  res.send(walletAddress);
});
app.get('/getHardCap',async(req,res)=>{   ///// Getting Token Address ///////
  // console.log("pre provider")
  const hardCap = await truffle_connect.hardCap();
  console.log("Wallet Address is:  "+ hardCap);
  res.send(hardCap);
});
app.get('/sendTransaction',async(req,res)=>{   ///// Send Transaction  ///////
  
   await truffle_connect.start(async function (answer){sidebar
   
    const sendTransaction = await truffle_connect.sendTransaction(answer);
  console.log("Wallet Address is:  "+ sendTransaction);
  res.send(sendTransaction);

  });
});

app.get('/buyToken',async(req,res)=>{   ///// Buy Token  ///////

   await truffle_connect.start(async function (answer){
  
    const buyToken = await truffle_connect.buyToken(answer);
  console.log("Wallet Address is:  "+ buyToken);
  res.send(buyToken);

  });
});

app.get('/getBalances', async(req, res)=>{

 var balanceIs =  await truffle_connect.balanceOfUser();


  $(document).ready(function(){
    res.send(balanceIs)
  })



  


})



app.get('/:id', async( req, res)=>{
  // console.log(__dirname);
  console.log(" Full Dir Name "+__dirname + '/public_static/' +req.params.id +'.html');
  res.sendFile(__dirname + '/views/' +req.params.id +'.html');
  // res.send(_dirname + '/public_static' +req.params.id +'.html');
// res.sendFile('/home/admins/Desktop/Tasks/Test Practice/Pro-v1/public_static/signup.html');
// res.sendFile(_dirname + '/'+ req.params.id );//req.params.id
});

app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

  console.log("Express Listening at http://localhost:" + port);

});



