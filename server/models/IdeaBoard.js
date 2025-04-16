import mongoose from 'mongoose';

// import mongoose from 'mongoose';

// const employeeSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//     },
//     lastName: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     phone: {
//         type: String,
//         required: true,
//     },
//     department: {
//         type: String,
//         required: true,
//     },
//     position: {
//         type: String,
//         required: true,
//     },
//     salary: {
//         type: Number,
//         required: true,
//     },
//     startDate: {
//         type: Date,
//         required: true,
//     },
//     address: {
//         type: String,
//         required: true,
//     },
//     city: {
//         type: String,
//         required: true,
//     },
//     state: {
//         type: String,
//         required: true,
//     },
//     zipCode: {
//         type: String,
//         required: true,
//     },
// }, {
//     timestamps: true,
// });

// export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema); 


const ideaBoardSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    ideaTitle: {
        type: String,
        required: true,
    },
    ideaDescription: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

export default mongoose.models.IdeaBoard || mongoose.model('IdeaBoard', ideaBoardSchema);