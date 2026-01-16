const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/sendEmail');

// @desc    Send contact email
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  const emailMessage = `
    You have received a new contact request from Honest Graphics & Printers.
    
    Name: ${name}
    Email: ${email}
    Subject: ${subject || 'General Inquiry'}
    
    Message:
    ${message}
  `;

  try {
    // Send email to Admin/Support
    await sendEmail({
      email: process.env.GMAIL_USER, // Send to the admin/support email (using the sender for now)
      subject: `Contact Form: ${subject || 'New Message'}`, 
      message: emailMessage,
    });

    // Optional: Send auto-reply to user
    await sendEmail({
      email: email,
      subject: 'We received your message - Honest Graphics',
      message: `Hi ${name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nBest regards,\nHonest Graphics Team`,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.error(err);
    res.status(500);
    throw new Error('Email could not be sent');
  }
});
