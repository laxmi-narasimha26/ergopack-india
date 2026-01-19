(async () => {
  try {
    console.log('Testing Homepage Access...');
    const response = await fetch(
      'https://ergopack-india-m7sotteye-laxmi-narasimhas-projects.vercel.app/'
    );
    console.log('Status Code:', response.status);
  } catch (error) {
    console.error('Error:', error);
  }
})();
