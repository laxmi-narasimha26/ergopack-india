/**
 * Newsletter Test Sender
 *
 * Usage: node send-newsletter-test.js
 *
 * Before running:
 * 1. Install nodemailer: npm install nodemailer
 * 2. Update the recipient email below
 * 3. Update your Gmail credentials (use App Password, not regular password)
 *
 * To get Gmail App Password:
 * 1. Go to https://myaccount.google.com/apppasswords
 * 2. Generate a new app password for "Mail"
 * 3. Use that 16-character password below
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// ============ CONFIGURATION ============
const config = {
  // Your Gmail credentials
  senderEmail: 'laxmi@benz-packaging.com', // Replace with your Gmail
  appPassword: 'ztuh euwm yhha dmbo', // Replace with your App Password (16 chars with spaces)

  // Recipients (add test emails here)
  recipients: [
    'laxmi@benz-packaging.com', // Replace with actual test email
    // 'test2@example.com', // Add more if needed
  ],

  // Email subject
  subject: 'A Groundbreaking Partnership Announcement | Benz Packaging & ErgoPack India',

  // Newsletter HTML file path
  newsletterPath: './src/newsletters/templates/22-the-reveal-announcement.html',
};
// =======================================

async function sendNewsletter() {
  try {
    // Read the HTML file
    const htmlContent = fs.readFileSync(path.resolve(__dirname, config.newsletterPath), 'utf8');

    console.log('📧 Newsletter loaded successfully');
    console.log(`📄 HTML size: ${(htmlContent.length / 1024).toFixed(2)} KB`);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.senderEmail,
        pass: config.appPassword,
      },
    });

    // Verify connection
    await transporter.verify();
    console.log('✅ Gmail connection verified');

    // Send to each recipient
    for (const recipient of config.recipients) {
      const mailOptions = {
        from: `"Benz Packaging & ErgoPack India" <${config.senderEmail}>`,
        to: recipient,
        subject: config.subject,
        html: htmlContent,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Sent to ${recipient} - Message ID: ${info.messageId}`);
    }

    console.log('\n🎉 All test emails sent successfully!');
    console.log('Check your inbox (and spam folder) to verify formatting.');
  } catch (error) {
    console.error('❌ Error:', error.message);

    if (error.message.includes('Invalid login')) {
      console.log(
        '\n💡 Tip: Make sure you are using an App Password, not your regular Gmail password.'
      );
      console.log('   Get one at: https://myaccount.google.com/apppasswords');
    }
  }
}

// Run
sendNewsletter();
