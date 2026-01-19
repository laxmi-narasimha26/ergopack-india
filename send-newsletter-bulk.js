/**
 * Universal Bulk Email Sender
 *
 * Supports Gmail, AWS SES, Google Workspace Relay, and other SMTP providers.
 *
 * Usage: node send-newsletter-bulk.js
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// ============ CONFIGURATION ============
const config = {
  // PROVIDER SETTINGS
  // Option 1: Gmail / Google Workspace (Standard)
  // Limits: 500/day (Gmail), 2000/day (Workspace)
  /*
    smtp: {
        service: 'gmail',
        auth: {
            user: 'laxmi@benz-packaging.com',
            pass: 'ztuh euwm yhha dmbo'
        }
    },
    */

  // Option 2: Custom SMTP (e.g., Google Workspace SMTP Relay, SendGrid, Mailgun)
  // Relay Host: smtp-relay.gmail.com (Limit: 10,000/day)
  // Note: Relay requires IP whitelist or configuration in Admin Console
  /*
    smtp: {
        host: 'smtp-relay.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'laxmi@benz-packaging.com',
            pass: 'ztuh euwm yhha dmbo'
        }
    },
    */

  // CURRENT ACTIVE CONFIGURATION: Google Workspace SMTP Relay (10k/day)
  smtp: {
    host: 'smtp-relay.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: 'laxmi@benz-packaging.com',
      pass: 'ztuh euwm yhha dmbo',
    },
  },

  // Sender Details
  senderName: 'Benz Packaging & ErgoPack India',
  senderEmail: 'laxmi@benz-packaging.com',

  // Email Content
  subject: 'A Groundbreaking Partnership Announcement | Benz Packaging & ErgoPack India',
  newsletterPath: './src/newsletters/templates/22-the-reveal-announcement.html',

  // Recipients
  recipientsFile: './newsletter-recipients.txt',

  // Safety & Rate Limiting
  delayBetweenEmails: 3000, // 3s delay (approx 1200/hour)
  batchSize: 50, // Pause after 50 emails
  batchPauseSeconds: 60, // Pause for 1 minute

  // Logging
  logFile: './newsletter-bulk-log.txt',
};
// =======================================

// ... (Rest of the script logic remains similar, updated to use config.smtp)

let stats = { total: 0, sent: 0, failed: 0, startTime: null };

function log(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}`;
  console.log(logLine);
  fs.appendFileSync(config.logFile, logLine + '\n');
}

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

async function sendNewsletter() {
  try {
    log('='.repeat(60));
    log('UNIVERSAL BULK SENDER STARTED');

    // Load Content
    const htmlContent = fs.readFileSync(path.resolve(__dirname, config.newsletterPath), 'utf8');
    const recipients = loadRecipients();

    if (recipients.length === 0) {
      log('❌ No recipients found in ' + config.recipientsFile);
      return;
    }

    stats.total = recipients.length;

    // Create Transporter
    const transporter = nodemailer.createTransport(config.smtp);

    await transporter.verify();
    log('✅ SMTP Connection verified');

    console.log(`\nAbout to send to ${stats.total} recipients`);
    console.log('Press Ctrl+C to cancel (5s timeout)...');
    await sleep(5000);

    stats.startTime = Date.now();

    // Send Loop
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];

      try {
        const mailOptions = {
          from: `"${config.senderName}" <${config.senderEmail}>`,
          to: recipient,
          subject: config.subject,
          html: htmlContent,
          headers: {
            'List-Unsubscribe': `<mailto:${config.senderEmail}?subject=unsubscribe>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        };

        await transporter.sendMail(mailOptions);
        stats.sent++;
        log(`✅ [${stats.sent}/${stats.total}] Sent to: ${recipient}`);
      } catch (error) {
        stats.failed++;
        log(`❌ [${stats.sent}/${stats.total}] Failed: ${recipient} - ${error.message}`);
      }

      // Rate Limiting
      if (i < recipients.length - 1) {
        if ((i + 1) % config.batchSize === 0) {
          log(`⏸️ Batch pause (${config.batchPauseSeconds}s)...`);
          await sleep(config.batchPauseSeconds * 1000);
        } else {
          await sleep(config.delayBetweenEmails);
        }
      }
    }

    log('🎉 Sending completed!');
    log(`Sent: ${stats.sent} | Failed: ${stats.failed}`);
  } catch (error) {
    log(`FATAL ERROR: ${error.message}`);
  }
}

sendNewsletter();
