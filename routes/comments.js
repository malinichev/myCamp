import express from 'express';
const router = express.Router({ mergeParams: true });  //Дает доступ к (req.params.id) из app.js
import Camp from '../models/camp.js';
import Comments from '../models/comment.js';
import middleware from '../middleware/index.js';


// ==========
// Comments routs
// ==========
router.get('/new', middleware.isLoggediIn, (req,res)=>{
    // res.send('commmmments');
    Camp.findById(req.params.id)
        .then((foundCamp)=>res.render('comment/newComment',{ data: foundCamp }))
        .catch(err=>{
            console.log(err);
            res.redirect('/camp');
        });
    
});
router.post('/',middleware.isLoggediIn, (req,res)=>{
    // res.send('commmmments');
    Camp.findById(req.params.id)   ///находим нужный Камп
        .then((foundCamp)=>{
            Comments.create(req.body)    //создаем коммент из того что прилетело из формы
            .then((newComments)=>{
                //Добавляем Юзерайм и ИД к Коментарию
                // console.log(req.user.username);
                newComments.author.id =  req.user._id;
                newComments.author.username = req.user.username;
                newComments.save();
                // console.log(newComments);
                foundCamp.comments.push(newComments);                 //добавляем к нужному Кампу созданный комент
                foundCamp.save();   //Сохраняем запись в БД что комент пренадлежит этому Кампу
                console.log('coment ADDD');
                res.redirect(`/camp/${req.params.id}`)
            })
            .catch(err=>{
                console.log(err)
                res.redirect('/camp');
            });
        })
        .catch(err=>{
            console.log(err);
            res.redirect('/camp')
        });
});

router.get('/:comments_id/edit',middleware.checkCommentOwnership, (req,res)=>{
    
    Comments.findById(req.params.comments_id)
        .then((findComent)=>res.render('comment/edit', {data: findComent, campId: req.params.id}))
        .catch(err=>{
            console.log(err);
            res.redirect(`/camp/${req.params.id}`);
        });
});

router.put('/:comments_id', middleware.checkCommentOwnership, (req,res)=>{
    // console.log('___________________');
    // console.log(req.body.comment);
    // console.log(req.params.comments_id);
    // console.log('___________________');
    Comments.findByIdAndUpdate(req.params.comments_id, req.body.comment)
        .then(()=>{
            console.log('coment Update');
            res.redirect('/camp/' + req.params.id);
        })
        .catch(err=>{
            console.log(err);
            res.redirect('/camp' + req.params.id);
        })

   
});

router.delete('/:comments_id',middleware.checkCommentOwnership, (req,res)=>{
    Comments.findByIdAndDelete(req.params.comments_id)
        .then(()=>{
            console.log('comment deleted');
            res.redirect("/camp/" + req.params.id)
        })
        .catch(err=>console.log(err));
});


export default router;