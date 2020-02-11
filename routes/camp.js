import express from 'express';
const router = express.Router();
import Camp from '../models/camp.js';


import middleware from '../middleware/index.js';
//get all camp

router.get('/',(req,res)=>{
    // console.log(req.user);
    //get all camp
    Camp.find({})
        .then((allCamps)=>res.render('camp/camp', {data: allCamps}))
        .catch(err=>console.log(err));    
})

//create new CAMP
    //Form for data new camp
router.get('/new',middleware.isLoggediIn,(req,res)=>{
    res.render('camp/newcamp');
})
    // Create a new Camp and save to DB
router.post('/',middleware.isLoggediIn, (req,res)=>{
    // const {title, image} = req.body;
    // campData.push(req.body);
    console.log(req.user);
    //create new camp in DB and save
    
    let newCamp = req.body;
    newCamp.author = {
        id: req.user._id,
        username: req.user.username
    };
    
    Camp.create(newCamp)
        .then(()=>{
            console.log(`User ${newCamp.author.username} has created a camp!!!`);
            res.redirect('/camp');
        })
        .catch(err=>{
            console.log(err);
            res.redirect('/camp');
        });
    
});


// VIEW A CAMP
router.get('/:id', (req,res)=>{
    
    // res.send(`the camp id `);

       
    Camp.findById(req.params.id)
        .populate('comments')               //заселяем в Camp comments из Модели    
        .exec()
        .then((foundCamps)=>{                //находим Камп по ИД 
            // console.log(foundCamps);
            res.render('camp/campDesc', {data: foundCamps });
            }
        )
        .catch(err=>{
            console.log(err)
            res.redirect('/camp');
        })            
        
       
       
            
});


//EDIT ACAMP
router.get('/:id/edit', middleware.checkCampOwnership, (req,res)=>{
   
        Camp.findById(req.params.id)
        .then((findCamp)=>{
            res.render('camp/edit', {data: findCamp});
        })
        .catch(err=>{
            console.log('+++++++++++++++++++++++++++++++++++++',err);
            res.redirect('/camp');
        })

   
   
    
});


//UPDATE CAMP
router.put('/:id', middleware.checkCampOwnership, (req,res)=>{
   
        Camp.findByIdAndUpdate(req.params.id, req.body.camp)  //id по которому найдем нужный Камп и инфа которую мы получили из формы
        .then(()=>{
            console.log('camp UPDATE');
            res.redirect('/camp')
        })
        .catch(err=>{
            console.log(err)
            res.redirect('/camp');
        });
        
   
    
    
    
});

//DELETE CAMP
router.delete('/:id', middleware.checkCampOwnership, (req,res)=>{
    Camp.findByIdAndDelete(req.params.id)
        .then(()=>{
        
            res.redirect('/camp')
        })
        .catch(err=>{
            console.log(err);
            res.redirect('/camp');
        });
    
});


 
export default router;