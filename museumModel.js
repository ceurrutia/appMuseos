const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const museumSchema = new Schema({
    name: {
        type: String
    },
    address: {
        type: String,
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],  // 'location.type' debe ser 'Point'
            required: true
        },
        coordinates: {
            type: [Number],  // Array de números [longitud primero!!!, latitud]
            required: true
        }
    },
    day: {
        type: String
    },
    hours: {
        type: String
    }
},
{
    timestamps: true, 
    versionKey: false
});

// Agregar un índice geoespacial al campo 'location'
museumSchema.index({ location: '2dsphere' });

const Museum = mongoose.model("Museum", museumSchema);
module.exports = Museum;
