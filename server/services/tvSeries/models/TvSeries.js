const db = require('../config/mongo')
const TvSeries = db.collection('TvSeries')
const { ObjectID } = require('mongodb')

module.exports = class MoviesModel {
    static findAll() {
        return TvSeries.find().toArray()
    }

    static findOne(id) {
        return TvSeries.findOne({ _id: ObjectID(id) })
    }

    static insertOne(newSerial) {
        return TvSeries.insertOne(newSerial)
    }

    static findOneAndUpdate(id, update) {
        return TvSeries.findOneAndUpdate(
            { _id: ObjectID(id) },
            { $set: update },
            { returnOriginal: false },

        )
    }
    static findOneAndDelete(id) {
        return TvSeries.findOneAndDelete({ _id: ObjectID(id) })
    }
}