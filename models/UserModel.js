var mongoose    = require("mongoose");
const validator = require('validator');

const bcrypt = require('bcrypt');

mongoose.set('debug', true);
var UserSchema = new mongoose.Schema({
	user_id: {type: String,unique: true},
    password: { type: String,trim: true},
    name: {type: String,trim: true},
    phone: {type: String,trim: true},
    /* phone_verified: {type: Boolean, default: false}, */
    
    /*email: {type: String,unique: true,lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
             validate(value){
                if(!validator.isEmail(value))
                    throw new Error('It Shoul be an email')
            } 
    },*/
    email: {type: String, trim: true},
    email_verified: {type: Boolean, default: false},
    role: { 
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user'
    },
    proifle_image: {type: String,default: 'default.jpg'},
    about_me: { type: String,default: '' },
    resignation_date:  { type: Date,default: Date.now},
    login_by:   { type:String,default:''},
    status: { type:String,default:'active'},

    locations:[{
        cityId: { type: String,default: ''},
        districtId: {type: String,default: ''},
        lat:{ type: String,default: ''},
        long:{ type: String,default: ''},
        regionId: { type: String,default: ''},  
        subregionId:{ type: String,default: ''}
    }],

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailConfirmStatus: {
      type: Boolean,
      default: false,
    },
    emailConfirmToken: String,
    emailConfirmTokenExpires: Date,
    created_by:  String,
});

//password will be hashed beforre its saved
UserSchema.pre('save', async function (next) {
    try {

        var user = this;

        /* if(!user.isModified('password')){
            return next();
        } */
       
     // Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
      
      if (this.isNew) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
      }
      next()
    } catch (error) {
      next(error)
    }
}) 

UserSchema.methods.isPasswordMatch = async function(password) {
    try{
        return await bcrypt.compare(password, this.password)

    } catch (error){
        console.log(error);
        throw error
    }
}

module.exports = mongoose.model("User", UserSchema);