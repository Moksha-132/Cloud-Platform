const nodemailer = require('nodemailer');

const sendContactEmail = async (req, res) => {
  const { name, email, department, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide name, email, and message.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${department || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #f59e0b;">New Message from Shnoor Cloud Contact Page</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Department:</strong> ${department || 'General Inquiry'}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    const io = req.app.get('socketio');
    if (io) {
      io.emit('new_contact_message', { name, email, department, message });
    }
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
};
module.exports = {
  sendContactEmail,
};