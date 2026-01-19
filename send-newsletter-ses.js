/**
 * Amazon SES Bulk Newsletter Sender
 *
 * Production-grade script to send newsletters via Amazon SES.
 * Optimized for high deliverability and reliability.
 *
 * Usage: node send-newsletter-ses.js
 */

const { SESClient, SendEmailCommand, SendRawEmailCommand } = require('@aws-sdk/client-ses');
const nodemailer = require('nodemailer'); // Used for mail composition logic
const fs = require('fs');
const path = require('path');

// ============ CONFIGURATION ============
const config = {
  // AWS Credentials (fill these in)
  aws: {
    region: 'ap-south-1', // e.g., 'ap-south-1' for Mumbai, 'us-east-1' for Virginia
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  },

  // Sender Details
  senderEmail: 'laxmi@benz-packaging.com', // Must be verified in SES
  senderName: 'Benz Packaging & ErgoPack India',

  // Email Content
  subject: 'A Groundbreaking Partnership Announcement | Benz Packaging & ErgoPack India',
  newsletterPath: './src/newsletters/templates/22-the-reveal-announcement.html',

  // Recipients
  recipientsFile: './newsletter-recipients.txt',

  // Safety Settings
  rateLimitPerSecond: 14, // Start conservative (SES starts at 14/sec usually)
  isDryRun: false, // Set true to simulate without sending
};
// =======================================

const sesClient = new SESClient({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function loadRecipients() {
  if (!fs.existsSync(config.recipientsFile)) return [];
  const content = fs.readFileSync(config.recipientsFile, 'utf8');
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && line.includes('@') && !line.startsWith('#'));
}

async function sendEmailSES(recipient, htmlContent) {
  // Create the raw email with headers for unsubscribe
  // We use nodemailer just to build the raw MIME message easily
  const mailOptions = {
    from: `"${config.senderName}" <${config.senderEmail}>`,
    to: recipient,
    subject: config.subject,
    html: htmlContent,
    text: 'View this newsletter online: https://ergopack-india.com/newsletter', // Fallback text
    headers: {
      // One-Click Unsubscribe (Recommended for Gmail/Yahoo bulk)
      'List-Unsubscribe': `<mailto:unsubscribe@ergopack-india.com?subject=unsubscribe>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      'X-Entity-Ref-ID': `newsletter-${Date.now()}`,
    },
  };

  // Build raw message
  const transporter = nodemailer.createTransport({
    streamTransport: true,
    newline: 'windows',
  });

  const info = await transporter.sendMail(mailOptions);
  const rawMessage = info.message.toString();

  // Send via SES
  const command = new SendRawEmailCommand({
    RawMessage: { Data: Buffer.from(rawMessage) },
    Source: config.senderEmail,
    Destinations: [recipient],
  });

  try {
    if (config.isDryRun) {
      console.log(`[DRY RUN] Would send to ${recipient}`);
      return { messageId: 'dry-run-id' };
    }

    const response = await sesClient.send(command);
    return { messageId: response.MessageId };
  } catch (error) {
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting SES Newsletter Sender...');

  // Load HTML
  const htmlContent = fs.readFileSync(path.resolve(__dirname, config.newsletterPath), 'utf8');
  console.log(`📄 Newsletter loaded (${(htmlContent.length / 1024).toFixed(1)} KB)`);

  // Load Recipients
  const recipients = loadRecipients();
  console.log(`👥 Loaded ${recipients.length} recipients`);

  if (recipients.length === 0) {
    console.error('❌ No recipients found. Check newsletter-recipients.txt');
    return;
  }

  // Confirmation
  console.log('\n=========================================');
  console.log(`SENDING VIA: Amazon SES (${config.aws.region})`);
  console.log(`SENDER:      ${config.senderEmail}`);
  console.log(`COUNT:       ${recipients.length} emails`);
  console.log(`RATE:        ~${config.rateLimitPerSecond} emails/sec`);
  console.log('=========================================\n');

  console.log('Press Ctrl+C to cancel. Starting in 5 seconds...');
  await sleep(5000);

  let sent = 0;
  let failed = 0;
  const startTime = Date.now();

  // Send Loop
  for (const recipient of recipients) {
    try {
      await sendEmailSES(recipient, htmlContent);
      sent++;
      process.stdout.write(`\r✅ Sent: ${sent} | ❌ Failed: ${failed} | Last: ${recipient}   `);
    } catch (error) {
      failed++;
      console.error(`\n❌ Failed to send to ${recipient}:`, error.message);
      // If throttling error, wait a bit
      if (error.name === 'ThrottlingException') {
        console.log('⚠️ Throttled. Pausing for 2 seconds...');
        await sleep(2000);
      }
    }

    // Rate limiting
    await sleep(1000 / config.rateLimitPerSecond);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n\n🎉 Finished in ${duration}s`);
  console.log(`Total Sent: ${sent}`);
  console.log(`Total Failed: ${failed}`);
}

main().catch(console.error);
