# How to Set Up Amazon SES for Bulk Sending

To send 20,000+ emails reliably and cheaply (approx. $2), follow these steps to configure Amazon Simple Email Service (SES).

## Phase 1: Create AWS Account

1. Go to [aws.amazon.com](https://aws.amazon.com) and sign up.
2. You will need to provide a credit card (you won't be charged yet, but it's required).

## Phase 2: Verify Your Domain in SES

1. Log in to the **AWS Console**.
2. Search for **"Amazon SES"** in the top search bar.
3. Click **Get Started** or go to **Configuration** > **Identities**.
4. Click **Create Identity**.
   - Select **Domain**.
   - Enter `ergopack-india.com`.
   - Check "Easy DKIM".
   - Click **Create Identity**.
5. **Important**: You will see 3 CNAME records. You must add these to your GoDaddy DNS settings (just like you did for Google Workspace).
   - Once added, wait 15-30 minutes for the "Identity Status" to turn **Verified**.

## Phase 3: Get Out of "Sandbox Mode"

_By default, AWS only lets you send to your own email. You must request production access._

1. In the SES Console, look for a banner saying "You are in the Amazon SES Sandbox".
2. Click **Request Production Access**.
3. Fill in the form:
   - **Mail Type**: Marketing / Transactional.
   - **Website URL**: `https://ergopack-india.com`.
   - **Use Case Description**:
     > "We are the exclusive distributor of ErgoPack systems in India. We need to send a partnership announcement newsletter to our existing customer database of approx 20,000 opted-in industrial clients. We handle unsubscribes and bounces compliant with best practices."
4. Submit. Approvals usually take **1-24 hours**.

## Phase 4: Get Credentials (Access Keys)

1. Search for **"IAM"** in the AWS Console.
2. Go to **Users** > **Create User**.
3. Name it `newsletter-sender`.
4. Permissions: Select **Attach policies directly**.
5. Search for `AmazonSESFullAccess` and check the box.
6. Create the user.
7. Click on the new user > **Security Credentials** tab.
8. Scroll to **Access Keys** > **Create access key**.
9. Select "Application running outside AWS".
10. Copy the **Access Key ID** and **Secret Access Key**.

## Phase 5: Run the Script

1. Open `send-newsletter-ses.js` in VS Code.
2. Paste your **Access Key ID** and **Secret Access Key** into the config section.
3. Run:
   ```bash
   node send-newsletter-ses.js
   ```

## Checklist for Success

- [ ] Domain verified (DKIM records in GoDaddy)
- [ ] Production access approved (Email from AWS)
- [ ] Access Keys generated
- [ ] Recipient list prepared in `newsletter-recipients.txt`
