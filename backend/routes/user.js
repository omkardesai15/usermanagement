const router = require('express').Router();
let User = require('../models/user.model');

// Get All the Users
router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Add a User

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const companyname = req.body.companyname;
    const age = Number(req.body.age);
    const dateofbirth = Date.parse(req.body.dateofbirth);


    const newUser = new User({username,companyname,age,dateofbirth});

    newUser.save()
    .then(() => res.json('User Added !'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Find a particular user 
router.route('/:id').get((req , res) => {
    User.findById(req.params.id)
    .then( user => res.json(user))
    .catch(err => res.status(400).json('Error : ' +err));
});

//update a particular user
router.route('/update/:id').post((req , res) => {
    User.findById(req.params.id)
    .then( user => {
        user.username = req.body.username;
        user.companyname = req.body.companyname;
        user.duration = Number(req.body.age);
        user.date = Date.parse(req.body.dateofbirth);

        user.save()
        .then( () => res.json('User updated !!!'))
        .catch(err => res.status(400).json('Error : ' +err));
    })
    .catch(err => res.status(400).json('Error : ' +err));
});

//delete a user

router.route('/delete/:id').delete((req , res) => {
    User.findByIdAndDelete(req.params.id)
    .then( () => res.json('User Deleted !!'))
    .catch(err => res.status(400).json('Error : ' +err));
});


module.exports = router;