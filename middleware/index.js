import flash from 'connect-flash';
import Camp from '../models/camp.js';
//all midleware


const middleware ={
    isLoggediIn:            function (req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "Please Login first");  //2. регистрируем какое сообщение и когда будем слать при использовании следующего РОУТА
        res.redirect('/login');
    },
    checkCampOwnership:     function (req,res,next){
        if(req.isAuthenticated()){
            Camp.findById(req.params.id)
            .then((findCamp)=>{
                if(req.user._id.equals(findCamp.author.id)){
                    next();
                }else{
                    res.redirect('back');
                };
               
            })
            .catch(err=>{
                console.log('+++++++++++++++++++++++++++++++++++++',err);
                res.redirect('back');
            })
        }else{
            res.redirect('back');
        }
    },
    checkCommentOwnership : function (req,res,next){
        if(req.isAuthenticated()){
            Camp.findById(req.params.id)
                .then((foundCamp)=>{
                    if(req.user._id.equals(foundCamp.author.id)){
                        next();
                    }else{
                        res.redirect('back');
                    }
                })    
                .catch(err=>{
                    console.log(err);
                    res.redirect('/camp');
                });
        }else{
            res.redirect('back');
        };
    }
}

export default middleware