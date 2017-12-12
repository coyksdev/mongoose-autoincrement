const mongoose = require('mongoose');
const moment = require('moment');
require('./model/Counter');

const Counter = mongoose.model('Counter');

module.exports = async function(schema, opts) {
  const { collection } = schema.options;
  const { prefix } = opts;

  schema.add({ _refNo: String });

  schema.pre('save', async function(next) {
    const doc = this;

    if (this.isNew) {
      const counter = await Counter.findByIdAndUpdate(
        collection,
        {
          $inc: {
            seq: 1
          }
        },
        { new: true }
      );

      const seq = '' + counter.seq;
      this._refNo = `${prefix}-${withPad(seq)}`;
    }

    next();
  });

  if (!await Counter.findById(collection)) {
    await new Counter({ _id: collection }).save();
  }
};

function withPad(arg) {
  const pad = '0000000';
  let str = '' + arg;
  return pad.substring(0, pad.length - arg.length) + arg;
}
