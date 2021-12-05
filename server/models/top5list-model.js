const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String, required: true},
        userName: { type: String, required: true },
        savedName: { type: String, required: true },
        savedItems: { type: [String], required: true },
        publishTime: { type: Date },
        views: { type: Number },
        likes: { type: [String] },
        dislikes: { type: [String] },
        comments: { type: [[String, String]] }
    },
    // { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
