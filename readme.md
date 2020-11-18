### Description

Assume that an automated program at the server is buying random items from some shop and the user of your page has to pay the bills for those items. 
  - you have to show a constantly updating list of the items the automated program has bought. 
  - you have to make three *seperate* components that will act as bill payment counters for the user. each counter receives payment in different currencies(dollar, euro and taka). user should be able to select and drag multiple items from the item list to a counter or from one counter to another. each counter shall - 
    - show the accepted currency of the counter
    - contain input area for the user to pay the bills
    - show current due amount in relevant currency 
    - total price of the currently selected items for that counter
  
  - you have to make two pages. 
    - login page - make request to the `/login` endpoint to with email and password to obtain a json-web-token. redirect the user to this page if user isnt authorized.
    - dashboard page - 
      - it will contain all the three components and item list in this page. you are free to design the UI any way you want.
      - show name of the user
      - show currency exchange rates in a seperate container
      - every container should handle errors and notify the client of the error

__you are encouraged to use redux and react and other relevant libraries. you can use any UI library of your choice but try to not make it too generic__ 
  

### Technologies used
  * ExpressJS 
  * Passport
  * jsonwebtoken
  * body-parser
  * bcrypt
  

### How to run this program
  - clone the repository
  - `npm install`
  - `npm start`
  
  
  there is a hardcoded mongodb connection url in `app.js`. and a user with __email__-`aliceiam@aliceworld.com` and __password__-`alicedoesnthash` is created. you have to login with this email and password.
  
  
### APi endpoints
  * `/login`[POST] - accepts POST request in the format `{'email':aliceiam@aliceworld.com,'password': alicedoesnthash}` and returns the `JSON-web-token` if authorization is successfull.

  * `/logged_in/items`[GET] - sends data in JSON format `{"id":{"name":productName, "price":productPrice}}"`. it uses `text/event-stream` content type to let subscribed clients know whenever a new item has been bought by the automated program at server. you have to use the [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) api to subscribe to this endpoint.

  * `/logged_in/currency_rate`[GET] - sends the currency exchange rate compared to taka(the base currency) in JSON format `{"dollar":rate, "euro":rate, "taka":1}`
  
  * `logged_in/pay`[POST] - accepts POST request in the format `{'amount':100000001, 'itemIDs':["id1","id2"],'currency': currency_name,'secret_token': JSON_web_token}`. 
  
  all the endpoints return `HTTP Unauthorized` if authentication fails or jsonwebtoken doesnt match. json web token has a pretty long expiry time so you dont have to handle `json-web-token` refreshing
  
  __you should send asynchronous requests to the server as some endpoints may require lot of time to respond__ 