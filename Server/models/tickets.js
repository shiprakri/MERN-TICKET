import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema({
    ticket_des:{type:String},
    id:{type:String},
    name:{type:String},
    creator:{type: String},
    createdAt: {
        type: String,
       
    },
    fname:{type:String},
    updatedAt:{
       type:String
    },
    DeletedAt:{
      type:String
    },
    Date:{
      type: String,
      
    } ,
    Resolved:{
      type:Boolean,
      default:false,
    }


})
var Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;