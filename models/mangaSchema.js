const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
    mangaName: {
        type: String,
        required: true,
        unique:true
    },
    mangaPrice: {
        type: Number,
        required: true
    },
    mangaGenre:{
        type:[String],
       required:true,

    },
    mangaAuthor: {
        type: String,
        required: true
    },
    purchasedCount: {
        type: Number,
        default: 0
    },
    mangaReviews: [{
        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            default: 5
        },
        comment: {
            type: String
        },
        userId:{
            type:mongoose.Schema.ObjectId,
            required:true
        }
    }]
});

const Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;