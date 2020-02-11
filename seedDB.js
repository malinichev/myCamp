
import Camp from './models/camp.js'
import comments from './models/comment.js';


let data = [    //Dummy data
    {
        title:'compass',
        image:'https://image.shutterstock.com/image-photo/coffee-mug-film-camera-compass-600w-1518230861.jpg',
        desc:'coffee mug, film camera, compass and watch flat lay on world map'
    },
    {
        title:'Sanya Haitang',
        image:'https://image.shutterstock.com/image-photo/sanya-hainan-china-june-7th-600w-1432733129.jpg',
        desc:'Sanya, Hainan, China - June 7th, 2019: Sanya Haitang Bay Mangrove Tree Resort, Landmark Luxurious Hotel Building Shaped like a Sea Shell, Facing the South China Sea of Pacific Ocean. Aerial View.'
    },
    {
        title: 'Lake Louise',
        image: 'https://image.shutterstock.com/image-photo/view-on-lake-louise-fairmont-600w-715828117.jpg',
        desc: 'The view on the Lake Louise and Fairmont Chateau Hotel from Big Beehive in Banff National Park on August 25, 2017'
    }
]


const seedDB = ()=>{
                                    //Очистить все из БД
     Camp.deleteMany({})
    .then(()=>{
        console.log('DB CLINEDDD!!!');
        // data.map((el)=>{            //добавить данные в ДБ
        //     Camp.create(el)
        //         .then((Camp)=>{
        //             console.log("added newCamp");
        //             comments.create({
        //                 text: `${Camp.title}' is a cool blah blah blah'`,
        //                 author: 'Sergey M.'
        //             })
        //             .then((comments)=>{
        //                 Camp.comments.push(comments);
        //                 Camp.save();
        //                 console.log('aDD new Coment')
        //             })
        //             .catch(err=>console.log(err));
        //         })
        //         .catch(err=>console.log(err));
        // });
    })
    .catch((err)=>console.log(err));
    
};



    export default seedDB
