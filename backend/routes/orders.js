const router = require('express').Router();
let Order = require('../models/order.model');


router.route('/').get((req, res) => {

    

    Order.find()
    .then(orders => {
    

    const page = req.query.page;
    const limit = req.query.limit;

    console.log("req.query.page:" + req.query.page);
    console.log("req.query.limit:" + req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    /*

    const results = {};

    results.results = orders.slice(startIndex, endIndex);
        
        
        res.json(results)
        */

       const results = orders.slice(startIndex, endIndex);
       res.json(results)
    
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find').post((req, res) => {

    


    Order.find()
    .then(orders => {

        let stack = [];
        
        let i=0;
        for(i=0;i<orders.length;i++)
        {
            let str = orders[i].order_name;

            if(str.includes(req.body.find))
            {
                stack.push(orders[i]);
            }
        }
        
        res.json(stack);
    
    })
    .catch(err => res.status(400).json('Error: ' + err));



});


router.route('/datefilter').post((req, res) => {

    

    let  startDate = Date.parse(req.body.startDate);
    let  endDate = Date.parse(req.body.endDate);

   


    Order.find()
    .then(orders => {

        

        let stack = [];
        let i=0;

        

        for(i=0;i<orders.length;i++)
        {

            

            let orderDate = Date.parse(orders[i].created_at);

            console.log("startDate:" + startDate);
            console.log("endDate:" + endDate);

            console.log("orderDate - startDate:" + (orderDate - startDate));
            console.log("endDate - orderDate:" + (endDate - orderDate));

            if(orderDate >= startDate && orderDate <= endDate)
            {
                stack.push(orders[i]);
            }

            /*

            if((orderDate - startDate) >= startDate && (endDate - orderDate) <= endDate)
            {
                stack.push(orders[i]);
            }
            */
            


            
        }
        
        
        res.json(stack);
    
    })
    .catch(err => res.status(400).json('Error: ' + err));



});




router.route('/add').post((req, res) => {



    const order_name = req.body.order_name;
    const customer_id = req.body.customer_id;
    const created_at = req.body.created_at;
    const login = req.body.login;
    const password = req.body.password;
    const name = req.body.name;
    const credit_cards = req.body.credit_cards; 
    const company_name = req.body.company_name;   
  

  


    const newOrder = new Order({
        order_name,
        customer_id,
        created_at,
        login,
        password,
        name,
        order_name,
        credit_cards,
        company_name,
        
    });
    

    newOrder.save()
    .then(() => res.json('Order added!'))
    .catch(err => res.status(400).json('Error: ' + err));

    


});







module.exports = router;