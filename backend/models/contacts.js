import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter contact name"],
    maxLength: [200, "Contact name cannot exceed 200 characters"]
  },
  email: {
    type: String,
    required: [true, "Please enter contact email"],
    unique: true
  },
  phone: {
    type: String,
    required: [true, "Please enter phone number"]
  },
  notes: {
    type: String,
    maxLength: [5000, "Description cannot exceed 5000 characters"]
  },
  assignedTo: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      time: {
        type: Date,
        default: Date.now
      }
    }
  ],
  pipelinesActive: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      pipelineName: {
        type: String
      },
      currentStage: {
        type: String
      }
    }
  ],
  tags: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  uid: {
    type: Number
  }
}, { timestamps: true });

// Set default values for arrays
contactSchema.path('assignedTo').default([]);
contactSchema.path('pipelinesActive').default([]);
contactSchema.path('tags').default([]);

// Upsert function
contactSchema.statics.upsertContact = function(contactData) {
  return this.findOneAndUpdate(
    { email: contactData.email },
    { $set: contactData },
    { new: true, upsert: true, runValidators: true }
  ).exec();
};

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
