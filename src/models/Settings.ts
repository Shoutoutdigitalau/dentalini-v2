import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  openingHours: [{
    day: String,
    hours: String,
    isOpen: Boolean
  }],
  contactInfo: {
    phone: { type: String, default: "(02) 8920 3000" },
    email: { type: String, default: "info@dentalini.com.au" },
    address: { type: String, default: "Suite 3, 118 Alfred St South, Milsons Point NSW 2061" },
    mapUrl: { type: String, default: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6627.549355931702!2d151.210381!3d-33.843921!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae8b528fd945%3A0xada31445f0d88f4f!2sShop%203%2F118%20Alfred%20St%20S%2C%20Milsons%20Point%20NSW%202061!5e0!3m2!1sen!2sau!4v1754930748822!5m2!1sen!2sau" }
  }
}, { timestamps: true });

// Force delete cached model to ensure schema updates
if (mongoose.models.Settings) {
  delete mongoose.models.Settings;
}

export default mongoose.model('Settings', SettingsSchema);
