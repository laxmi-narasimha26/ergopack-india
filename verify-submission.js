(async () => {
  try {
    console.log('Testing Contact API...');
    const response = await fetch(
      'https://ergopack-india-m7sotteye-laxmi-narasimhas-projects.vercel.app/api/contact',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Antigravity Verification',
          company: 'AI Setup',
          email: 'verify@example.com',
          jobTitle: 'System Check',
          industry: 'electronics',
          message: 'Verifying contact functionality via API.',
        }),
      }
    );

    console.log('Status Code:', response.status);
    const text = await response.text();
    console.log('Response Preview:', text.substring(0, 500));
  } catch (error) {
    console.error('Error:', error);
  }
})();
