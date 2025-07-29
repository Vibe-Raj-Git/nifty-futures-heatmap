
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/nifty-futures', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.nseindia.com/api/liveEquity-derivatives?index=derivatives',
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          Accept: 'application/json',
          Referer: 'https://www.nseindia.com/option-chain',
        },
      }
    );
    const niftyFutures = response.data.data.filter((item) =>
      item.metadata.underlyingIndex?.includes('NIFTY')
    );

    const cleanData = niftyFutures.map((item) => ({
      symbol: item.metadata.symbol,
      ltp: item.metadata.lastPrice,
      change: item.metadata.netPriceChange,
      changePercent: item.metadata.percentageChange,
    }));

    res.json(cleanData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from NSE' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
