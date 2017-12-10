const SHA256 = require("crypto-js/sha256");

//https://github.com/SavjeeTutorials/SavjeeCoin
json = require('json-simple');
 



// Firebase Admin
/*
var admin = require("firebase-admin");

var serviceAccount = require("couponchaintx-firebase-adminsdk-5ut0r-d5acb354b0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://couponchaintx.firebaseio.com"
});
*/



//Express 
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
 



app.get('/', function(req, res){
    console.log('GET /')
    //var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
    var html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

app.post('/', function(req, res){
    console.log('POST /');
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks');
});

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port)


//Express 

const  TX = { //Transaction Type
    CREATE : {value:0},
    UPDATE : {value:1},
    DELETE : {value:2},
};

class transaction{ // inside Data of class Block

    constructor(TX,signature,VendorAddress,amount){
        this.TX = TX;
        this.signature = signature;
        this.VendorAddress = VendorAddress;
        this.amount = amount;

    }

}

class Block {
  constructor(index, data, previousHash = '') {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = Date.now();
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }

  
}


class Blockchain{  
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, new transaction(TX.CREATE,"signature","VendorAdd",30), "");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    getLatestHash(){
        return this.getLatestBlock().hash;
    }



    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}




let AECOIN = new Blockchain();


// new transaction
let data = new transaction();
data.TX=TX.CREATE;
data.signature="me";
data.VendorAddress="vendorID";
data.amount="2";
AECOIN.addBlock(new Block(1,data));
 //svr 



   //



//Client

function getCoupon(){//F3 create transaction



}  
//

console.log('Blockchain valid? ' + AECOIN.isChainValid());

console.log('Changing a block...');
AECOIN.chain[1].data = { amount: 100 };
 
console.log("Blockchain valid? " + AECOIN.isChainValid());

console.log(AECOIN .getLatestHash());
 
