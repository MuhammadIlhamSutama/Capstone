const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/calculate-ter', (req, res) => {
    const { penghasilan, status, tkStatus } = req.body;
   
    if (typeof penghasilan !== 'number' || !status || !tkStatus) {
        return res.status(400).json({ error: 'Tolong Masukan Angka' });
    }

    let aplicableRate = 0;
    let taxAmount = 0;

    switch (status) {
        case 'Pegawai Tetap':
            if (tkStatus === 'TK/0' || tkStatus === 'TK/1') {
                const taxBrackets = [
                    { maxIncome: 5400000, rate: 0 },
                    { maxIncome: 5650000, rate: 0.0025 },
                    { maxIncome: 5950000, rate: 0.005 },
                    { maxIncome: 6300000, rate: 0.0075 },
                    { maxIncome: 6750000, rate: 0.01 },
                    { maxIncome: 7500000, rate: 0.0125 },
                    { maxIncome: 8550000, rate: 0.015 },
                    { maxIncome: 9650000, rate: 0.0175 },
                    { maxIncome: 10050000, rate: 0.02 },
                    { maxIncome: 10350000, rate: 0.0225 },
                    { maxIncome: 10700000, rate: 0.025 },
                    { maxIncome: 11050000, rate: 0.03 },
                    { maxIncome: 11600000, rate: 0.035 },
                    { maxIncome: 12500000, rate: 0.04 },
                    { maxIncome: 13750000, rate: 0.05 },
                    { maxIncome: 15100000, rate: 0.06 },
                    { maxIncome: 16950000, rate: 0.07 },
                    { maxIncome: 19750000, rate: 0.08 },
                    { maxIncome: 24150000, rate: 0.09 },
                    { maxIncome: 26450000, rate: 0.1 },
                    { maxIncome: 28450000, rate: 0.11 },
                    { maxIncome: 30050000, rate: 0.12 },
                    { maxIncome: 32400000, rate: 0.13 },
                    { maxIncome: 35400000, rate: 0.14 },
                    { maxIncome: 39100000, rate: 0.15 },
                    { maxIncome: 43850000, rate: 0.16 },
                    { maxIncome: 47800000, rate: 0.17 },
                    { maxIncome: 51400000, rate: 0.18 },
                    { maxIncome: 56300000, rate: 0.19 },
                    { maxIncome: 62200000, rate: 0.2 },
                    { maxIncome: 68600000, rate: 0.21 },
                    { maxIncome: 77500000, rate: 0.22 },
                    { maxIncome: 89000000, rate: 0.23 },
                    { maxIncome: 103000000, rate: 0.24 },
                    { maxIncome: 125000000, rate: 0.25 },
                    { maxIncome: 157000000, rate: 0.26 },
                    { maxIncome: 206000000, rate: 0.27 },
                    { maxIncome: 337000000, rate: 0.28 },
                    { maxIncome: 454000000, rate: 0.29 },
                    { maxIncome: 550000000, rate: 0.3 },
                    { maxIncome: 695000000, rate: 0.31 },
                    { maxIncome: 910000000, rate: 0.32 },
                    { maxIncome: 1400000000, rate: 0.33 },
                    { maxIncome: Infinity, rate: 0.34 } // For income above 1.4 billion
                ];
    
                // Calculate the applicable rate based on the income
                aplicableRate = taxBrackets.find(bracket => penghasilan <= bracket.maxIncome)?.rate || 0.01;
                // Calculate the tax amount based on the applicable rate and income
                taxAmount = penghasilan * aplicableRate;
            } 
            else if (tkStatus === 'TK/2' || tkStatus === 'TK/3') {
                const taxBrackets = [
                    { maxIncome: 6200000, rate: 0 },
                    { maxIncome: 6500000, rate: 0.0025 },
                    { maxIncome: 6850000, rate: 0.005 },
                    { maxIncome: 7300000, rate: 0.0075 },
                    { maxIncome: 9200000, rate: 0.01 },
                    { maxIncome: 10750000, rate: 0.015 },
                    { maxIncome: 11250000, rate: 0.02 },
                    { maxIncome: 11600000, rate: 0.025 },
                    { maxIncome: 12600000, rate: 0.03 },
                    { maxIncome: 13600000, rate: 0.04 },
                    { maxIncome: 14950000, rate: 0.05 },
                    { maxIncome: 16400000, rate: 0.06 },
                    { maxIncome: 18450000, rate: 0.07 },
                    { maxIncome: 21850000, rate: 0.08 },
                    { maxIncome: 26000000, rate: 0.09 },
                    { maxIncome: 27700000, rate: 0.10 },
                    { maxIncome: 29350000, rate: 0.11 },
                    { maxIncome: 31450000, rate: 0.12 },
                    { maxIncome: 33450000, rate: 0.13 },
                    { maxIncome: 37100000, rate: 0.14 },
                    { maxIncome: 41100000, rate: 0.15 },
                    { maxIncome: 45800000, rate: 0.16 },
                    { maxIncome: 49500000, rate: 0.17 },
                    { maxIncome: 53800000, rate: 0.18 },
                    { maxIncome: 58500000, rate: 0.19 },
                    { maxIncome: 64000000, rate: 0.20 },
                    { maxIncome: 71000000, rate: 0.21 },
                    { maxIncome: 80000000, rate: 0.22 },
                    { maxIncome: 93000000, rate: 0.23 },
                    { maxIncome: 109000000, rate: 0.24 },
                    { maxIncome: 129000000, rate: 0.25 },
                    { maxIncome: 163000000, rate: 0.26 },
                    { maxIncome: 211000000, rate: 0.27 },
                    { maxIncome: 374000000, rate: 0.28 },
                    { maxIncome: 459000000, rate: 0.29 },
                    { maxIncome: 555000000, rate: 0.30 },
                    { maxIncome: 704000000, rate: 0.31 },
                    { maxIncome: 957000000, rate: 0.32 },
                    { maxIncome: 1405000000, rate: 0.33 },
                    { maxIncome: Infinity, rate: 0.34 } // For income above 1.405 billion
                ];
             // Calculate the applicable rate based on the income
             aplicableRate = taxBrackets.find(bracket => penghasilan <= bracket.maxIncome)?.rate || 0.01;
             // Calculate the tax amount based on the applicable rate and income
             taxAmount = penghasilan * aplicableRate;
            }
            else if (tkStatus === 'TK/4' || tkStatus === 'TK/5') {
                const taxBrackets = [
                    { maxIncome: 6600000, rate: 0 },
                    { maxIncome: 6950000, rate: 0.0025 },
                    { maxIncome: 7350000, rate: 0.005 },
                    { maxIncome: 7800000, rate: 0.0075 },
                    { maxIncome: 8850000, rate: 0.01 },
                    { maxIncome: 9800000, rate: 0.0125 },
                    { maxIncome: 10950000, rate: 0.015 },
                    { maxIncome: 11200000, rate: 0.0175 },
                    { maxIncome: 12050000, rate: 0.02 },
                    { maxIncome: 12950000, rate: 0.03 },
                    { maxIncome: 14150000, rate: 0.04 },
                    { maxIncome: 15550000, rate: 0.05 },
                    { maxIncome: 17550000, rate: 0.06 },
                    { maxIncome: 19500000, rate: 0.07 },
                    { maxIncome: 22700000, rate: 0.08 },
                    { maxIncome: 26600000, rate: 0.09 },
                    { maxIncome: 28100000, rate: 0.1 },
                    { maxIncome: 30100000, rate: 0.11 },
                    { maxIncome: 32600000, rate: 0.12 },
                    { maxIncome: 35400000, rate: 0.13 },
                    { maxIncome: 38900000, rate: 0.14 },
                    { maxIncome: 43000000, rate: 0.15 },
                    { maxIncome: 47400000, rate: 0.16 },
                    { maxIncome: 51200000, rate: 0.17 },
                    { maxIncome: 55800000, rate: 0.18 },
                    { maxIncome: 60400000, rate: 0.19 },
                    { maxIncome: 66700000, rate: 0.2 },
                    { maxIncome: 74500000, rate: 0.21 },
                    { maxIncome: 83200000, rate: 0.22 },
                    { maxIncome: 95000000, rate: 0.23 },
                    { maxIncome: 110000000, rate: 0.24 },
                    { maxIncome: 134000000, rate: 0.25 },
                    { maxIncome: 169000000, rate: 0.26 },
                    { maxIncome: 221000000, rate: 0.27 },
                    { maxIncome: 390000000, rate: 0.28 },
                    { maxIncome: 463000000, rate: 0.39 },
                    { maxIncome: 561000000, rate: 0.3 },
                    { maxIncome: 709000000, rate: 0.31 },
                    { maxIncome: 965000000, rate: 0.32 },
                    { maxIncome: 1419000000, rate: 0.33 },
                    { maxIncome: Infinity, rate: 0.34 } // For income above 1.405 billion
                ];
             // Calculate the applicable rate based on the income
             aplicableRate = taxBrackets.find(bracket => penghasilan <= bracket.maxIncome)?.rate || 0.01;
             // Calculate the tax amount based on the applicable rate and income
             taxAmount = penghasilan * aplicableRate;
            }  
            break;
        // Add more cases for different statuses if necessary
    }

    res.json({ ter: aplicableRate, taxAmount});
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});