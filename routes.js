const express = require('express');
const router  = express.Router();
const path = require('path')
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/dashboard', (req,res)=>{
  res.sendFile(path.join(__dirname+'/dashboard.html'))
})

router.get('/events', eventsHandler);
router.get('/status', (req, res) => res.json({clients: clients.length}));
router.post('/pay', (req,res) => {console.log(req.body); setTimeout(()=>{
  clearDue(req.body.amount, req.body.itemIDs, req.body.currency, res);
},Math.random()*6000)})
router.get('/currency_rate', (req,res) => res.send(JSON.stringify(currencyRates)))

module.exports = router; 


// logic
var clients = []
function sendEventsToAll(item) {
  clients.forEach(c => c.res.write(`data: ${JSON.stringify(item)}\n\n`))
}

var due = 0;
const itemsNames = ['5700','5700xt','5700xxt','3070', '3080', '3090', 'Mag241C'];
var items = {
  'id1': {
    'name': '3090',  
    'price': 100000000,
  },
  'id2': {
    'name': '3090 in dreams',  
    'price': 000000001,
  }
};

const generateItem = ()=>{
  const newItem = ({
    'name': itemsNames[Math.round(Math.random()*3)],  
    'price': Math.round(Math.random()*Date.now())%70000,
  })
  due += newItem.price;
  const id = Date.now();
  items[id] = newItem;
  sendEventsToAll({[id]: newItem});
  setTimeout(generateItem, Math.random()*6000);
}
generateItem();


currencyRates = {'dollar': 59, 'euro': 76, 'taka': 1} 
const generateCurrencyRates = () => {
  currencyRates.dollar = Math.round(56+Math.random()*10);
  currencyRates.euro = Math.round(70+Math.random()*10);
  // console.log(currencyRates)
  setTimeout(generateCurrencyRates, 3000+Math.round(Math.random()*5));
}
generateCurrencyRates();

function clearDue(amount, itemIDs, currency, res) {
  let toclear = 0;
  for(let i=0, id=itemIDs[i]; i<itemIDs.length; i++, id=itemIDs[i]) {
    console.log("Gg1 ", id);
    if(!items.hasOwnProperty(id)) {
      res.send("item doesnt exist");
      return;
    }
    toclear+=items[id].price;
  }

  if(toclear != amount*currencyRates[currency]) {
    res.send("amount doesnt match");
    return;
  }
  for(let i=0, id=itemIDs[i]; i<itemIDs.length; i++, id=itemIDs[i]) {
    if(items.hasOwnProperty(id)) delete items[id];
    else {
      res.send("item doesnt exist"); 
      return; 
    }
  }
  res.send("paid " + toclear);
} 

function eventsHandler(req, res, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  res.writeHead(200, headers);
  const data = `data: ${JSON.stringify(items)}\n\n`;
  res.write(data);
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };
  clients.push(newClient);
  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(c => c.id !== clientId);
  });
}
