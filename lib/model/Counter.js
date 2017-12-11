const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;

const counterSchema = new Schema(
  {
    _id: { type: String },
    seq: { type: Number, default: 0 }
  },
  { collection: 'Counter' }
);

mongoose.model('Counter', counterSchema);
