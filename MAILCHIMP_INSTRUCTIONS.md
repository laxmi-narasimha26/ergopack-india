# How to Set Up Your Newsletter in Mailchimp

Follow these exact steps to load your custom HTML newsletter into Mailchimp.

## Step 1: Create the Campaign

1.  Click the **Create** button (pencil icon) in the left sidebar.
2.  Click **Email**.
3.  Select **Regular**.
4.  Name your campaign (e.g., "ErgoPack Reveal Announcement") and click **Begin**.

## Step 2: Configure Settings

You will see a checklist. Fill these out:

- **To:** Choose your subscriber list (or "All Subscribers").
- **From:** Enter "BENZ Packaging & ErgoPack India" and email "laxmi@benz-packaging.com".
- **Subject:** Enter `A Groundbreaking Partnership Announcement | BENZ Packaging & ErgoPack India`
- **Preview Text:** `Something extraordinary is coming to India. German precision meets Indian excellence.`

## Step 3: Import Your HTML (The Important Part)

1.  In the **Content** section, click **Design Email**.
2.  **Crucial Step:** Look for the option that says **"Code your own"** or "Import HTML".
    - _Note: If you are on the "New Builder", you might need to click "Switch to Classic Builder" to see the "Code your own" tab easily._
    - Select **Import HTML**.
3.  Click **Browse** or **Upload**.
4.  Navigate to and select this file on your computer:
    `c:\Users\user\ergopack-india\src\newsletters\templates\22-the-reveal-announcement.html`
5.  Click **Open/Upload**.

## Step 4: Verify & Preview

1.  Your newsletter should appear in the preview window.
2.  **Check the "BENZ" text**: Ensure it is capitalized (I already fixed this in the file).
3.  **Check the Video**: Scroll down to the "What is ErgoPack?" section and verify the "Watch in Action" video thumbnail is visible.
4.  **Check Links**: Click the "Contact Sales" button in the preview to ensure it works.
5.  Click **Continue** (top right).

## Step 5: Ready to Send

- You will be back at the checklist screen.
- If everything has a green checkmark, you are ready!
- **Do not click Send yet** (as you requested).
- You can click **Schedule** to pick a time, or leave it as a "Draft" to send later.

---

### 💡 Common Issues

- **"Missing Merge Tags" warning:** If Mailchimp warns you about `*|UNSUB|*`, ignore it. I included the correct tags in the footer of your HTML file, so it will pass the final check.
- **"Dark Mode" preview:** You can use Mailchimp's "Inbox Preview" tool to double-check the dark mode rendering if you have a paid plan.

---

# Newsletter #2 (From BENZ Packaging): Deployment Playbook

Use this as your next send after the partnership announcement.

- **From:** "BENZ Packaging & ErgoPack India" <laxmi@benz-packaging.com>
- **Subject (Option A):** `From BENZ: Your ErgoPack India Deployment Playbook`
- **Subject (Option B):** `Ready for an ErgoPack pilot? BENZ will run the rollout.`
- **Preview Text:** `The fastest path from evaluation to rollout - backed by BENZ service, spares, and application support in India.`
- **Import this HTML file:** `c:\Users\user\ergopack-india\src\newsletters\templates\41-benz-deployment-playbook.html`
