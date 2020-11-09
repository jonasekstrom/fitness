const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    age: {
        type: Number
    },
    height: {
        type: Number
    },
    weightin: [
        {
            stage: {
                type: Number
            },
            icv: {
                type: Number
            },
            ecv: {
                type: Number
            },
            proteins: {
                type: Number
            },
            minerals: {
                type: Number
            },
            fatmass: {
                type: Number
            },
            weight: {
                type: Number
            },
            smm: {
                type: Number
            },
            bmi: {
                type: Number
            },
            fatprocent: {
                type: Number
            },
            whr: {
                type: Number
            },
            rightarm: {
                type: Number
            },
            leftarm: {
                type: Number
            },
            torso: {
                type: Number
            },
            rightleg: {
                type: Number
            },
            leftleg: {
                type: Number
            },
            vfa: {
                type: Number
            },
            targetweight: {
                type: Number
            },
            inbodypoints: {
                type: Number
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);