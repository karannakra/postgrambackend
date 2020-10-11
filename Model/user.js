const {Schema,model} = require('mongoose');
const userSchema = Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'I am new'
    },
    posts:[
        {
           title:{
               type:String
           },
            content:{
               type:String
            },
            imageUrl:{
               type:String
            },
            creator:{
               type:Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ]
});


module.exports = model('User', userSchema);