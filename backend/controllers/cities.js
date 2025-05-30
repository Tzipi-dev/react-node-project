const fetch = require('node-fetch');

exports.getAllCitiesInIsrael = async (req, res) => {
  const resourceId = '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba';
  const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=${resourceId}&limit=1000`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('שגיאה בקריאה ל-API:', response.status, response.statusText);
      return res.status(response.status).json({ message: 'שגיאה בקבלת נתונים מה-API' });
    }
    const data = await response.json();

    const cities = data.result.records.map(record => record.שם_ישוב);
    const uniqueCities = [...new Set(cities)];

    res.json(uniqueCities);
  } catch (error) {
    console.error('Fail to get cities:', error);
    res.status(500).json({ message: 'Fail to get cities' });
  }
};
