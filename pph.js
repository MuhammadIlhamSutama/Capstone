const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// PPH21 Calculator Line Start

app.post('/pph21', (req, res) => {
    const { penghasilan, status, golongan} = req.body;
   
     if (typeof penghasilan !== 'number' ) {
         return res.status(400).json({ error: 'Tolong Masukan Angka' });
     }
    let aplicableRate = 0;
    let taxAmount = 0;
    let taxBracketUsed = 'no-bracket-used';

    // Aturan Ter pajak untuk pegawai start

    const taxBrackets_terA = [
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

    const taxBrackets_terB = [
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

    const taxBrackets_terC = [
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

    // Aturan Ter pajak end

    switch (status) {
        case 'gross':
            if (golongan === 'TK/0' || golongan === 'K0' || golongan === 'TK/1') {
                taxBracketUsed = 'terA';
                if (penghasilan <= taxBrackets_terA[0].maxIncome){
                    aplicableRate = 0;
                }
                else {
                    // Calculate the applicable rate based on the income
                    aplicableRate = taxBrackets_terA.find(bracket => penghasilan <= bracket.maxIncome)?.rate || 0.01;
                }
                 // Calculate the tax amount based on the applicable rate and income
                 taxAmount = penghasilan * aplicableRate;
            } 
            else if (golongan === 'TK/2' || golongan === 'TK/3' || golongan === 'K/1' || golongan === 'K/2') {
                taxBracketUsed = 'terB';
  
                if (penghasilan <= taxBrackets_terB[0].maxIncome){
                    aplicableRate = 0;
                }
                else {
                    // Calculate the applicable rate based on the income
                    aplicableRate = taxBrackets_terB.find(bracket => penghasilan <= bracket.maxIncome)?.rate || 0.01;
                    // Calculate the tax amount based on the applicable rate and income
                    taxAmount = penghasilan * aplicableRate;
                }
             
            }
            else if (golongan === 'K/3') {
                taxBracketUsed = 'terC';
                if (penghasilan <= taxBrackets_terC[0].maxIncome){
                    aplicableRate = 0;
                }
                else{
                    // Calculate the applicable rate based on the income
                aplicableRate = taxBrackets_terC.find(bracket => penghasilan <= bracket.maxIncome)?.rate || 0.01;
                }   
                // Calculate the tax amount based on the applicable rate and income
                taxAmount = penghasilan * aplicableRate;
            } 
            else {
                console.log('invalid TER Segmentation');
            } 
            break;

        case 'gross up':
            if (golongan === 'TK/0' || golongan === 'K0' || golongan === 'TK/1') {
                taxBracketUsed = 'terA';
                // Calculate the applicable rate based on the income
                aplicableRate = taxBrackets_terA.find(bracket => penghasilan <= bracket.maxIncome)?.rate || 0.01;
                // Calculate the tax amount based on the applicable rate and income
                taxAmount = (penghasilan * aplicableRate) / (100 - (aplicableRate * 100)).toFixed(3);
            } 
            else if (golongan === 'TK/2' || golongan === 'TK/3' || golongan === 'K/1' || golongan === 'K/2') {
                taxBracketUsed = 'terB';
                // Calculate the applicable rate based on the income
                aplicableRate = taxBrackets_terB.find(bracket => penghasilan <= bracket.maxIncome)?.rate || 0.01;
                // Calculate the tax amount based on the applicable rate and income
                taxAmount = (penghasilan * aplicableRate) / (100 - (aplicableRate * 100)).toFixed(3);
            }
            else if (golongan === 'K/3') {
                taxBracketUsed = 'terC';
                // Calculate the applicable rate based on the income
                aplicableRate = taxBrackets_terC.find(bracket => penghasilan <= bracket.maxIncome)?.rate || 0.01;
                // Calculate the tax amount based on the applicable rate and income
                taxAmount = (penghasilan * aplicableRate) / (100 - (aplicableRate * 100)).toFixed(3);
            } 
            else {
                console.log('invalid TER Segmentation');
            } 
            break;

        // Add more cases for different statuses if necessary
    }

    res.json({  penghasilan : penghasilan,
                taxBracketUsed : taxBracketUsed,
                aplicableRate : aplicableRate,
                taxAmount : taxAmount
    });
});



// end of line PPH 21 Calculator


// Start of line PPH 22 Calculator

app.post('/pph22', (req, res) => {
    const { penghasilan, golongan, status} = req.body;

    // Check for zero or negative input for penghasilan
    if (penghasilan <= 0) {
        return res.status(400).json({ error: 'Penghasilan harus lebih besar dari 0' });
    }
   
    let taxAmount = 0;

    switch(golongan){
        case (golongan == 'API' && golongan == 'semen'):
            if (status == 'npwp'){
                taxAmount = penghasilan * 0.025;
            }
            else {
                taxAmount = penghasilan * 0.05;
            }
            break;

        case 'nonAPI':
            if (status == 'npwp'){
                taxAmount = penghasilan * 0.075;
            }
            else {
                taxAmount = penghasilan * 0.15;
            }
            break;

        case 'kedelai':
            if (status == 'npwp'){
                taxAmount = penghasilan * 0.005;
            }
            else {
                taxAmount = penghasilan * 0.01;
            }
            break;
            
        case 'kertas':
            if (status == 'npwp'){
                taxAmount = penghasilan * 0.001;
            }
            else {
                taxAmount = penghasilan * 0.002;
            }
            break;

            
        case 'baja':
            if (status == 'npwp'){
                taxAmount = penghasilan * 0.003;
            }
            else {
                taxAmount = penghasilan * 0.006;
            }
            break;

        case 'otomotif':
            if (status == 'npwp'){
                taxAmount = penghasilan * 0.0045;
            }
            else {
                taxAmount = penghasilan * 0.009;
            }
            break;
            
        case (golongan == 'perkebunan' && golongan == 'DJPB'):
            if (status == 'npwp'){
                taxAmount = penghasilan * 0.015;
            }
            else {
                taxAmount = penghasilan * 0.03;
            }
            break;   
         
        case (golongan == 'BBM' && golongan == 'noFinal BBM'):
            taxAmount = 0;
            break;
            
        case 'farmasi':
            if (status == 'npwp'){
                taxAmount = penghasilan * 0.03;
            }
            else {
                taxAmount = penghasilan * 0.06;
            }
            break;

            
        case 'barangTertentu':
            if (status == 'npwp'){
                taxAmount = penghasilan * 0.05;
            }
            else {
                taxAmount = penghasilan * 0.1;
            }
            break;
        
    }


    res.json({taxAmount: taxAmount.toFixed(2)});
});

//start of line PPH 23

app.post('/pph15', (req, res) => {
    const { penghasilan, golongan} = req.body;

    // Check for zero or negative input for penghasilan
    if (penghasilan <= 0) {
        return res.status(400).json({ error: 'Penghasilan harus lebih besar dari 0' });
    }
   
    let taxAmount = 0.02;
    let taxTotal = 0;

    switch(golongan){
      
        default : 
            taxAmount = 0.02;
            taxTotal = penghasilan * taxAmount;
        break;
        case 'hadiah':
        case 'bunga':
        case 'royalti':
        case 'dividen':
            taxAmount = 0.15; // Set tax amount to 2%
            taxTotal = penghasilan * taxAmount;
        break;
      
    }

    res.json({penghasilan: penghasilan, kodeObjekPajak: golongan , taxAmount: (taxAmount * 100) + '%', taxTotal: taxTotal});
})

// end of line PPH23


// PPH 15 Line Start

app.post('/pph15', (req, res) => {
    const { penghasilan, golongan} = req.body;

    // Check for zero or negative input for penghasilan
    if (penghasilan <= 0) {
        return res.status(400).json({ error: 'Penghasilan harus lebih besar dari 0' });
    }
   
    let taxAmount = 0;
    let taxTotal = 0;

    switch(golongan){
       // 28-410-01 - Imbalan yang Diterima/Diperoleh Sehubungan dengan Pengangkutan Orang dan/atau Barang Termasuk Penyewaan Kapal Laut Oleh Perusahaan Pelayaran Dalam Negeri
       // 28-410-02 - Imbalan yang Dibayarkan/Terutang kepada Perusahaan Pelayaran Dalam Negeri
       case (golongan == 'angkutOrang' || golongan == 'pelayaranDN'):
          taxAmount = 0.012;
          taxTotal = penghasilan * taxAmount;
        break;
        //28-411-01 - Imbalan yang Dibayarkan/Terutang kepada Perusahaan Pelayaran dan/atau Penerbangan Luar Negeri Sehubungan dengan Pengangkutan Orang dan/atau Barang (Selain aBerdasarkan Perjanjian Charter)
        //28-411-02 - Imbalan Charter Kapal Laut dan/atau Pesawat Udara yang Dibayarkan/Terutang kepada Perusahaan Pelayaran dan/atau Penerbangan Luar Negeri melalui BUT di Indonesia
        case (golongan == 'pelayaranLN' || golongan == 'pelayaranBUT'):
          taxAmount = 0.0264;
          taxTotal = penghasilan * taxAmount ;
        break;

        case 'LN Dagang':
          taxAmount = 0.0044
          taxTotal = penghasilan * taxAmount;
        break;

        case 'maklon':
          taxAmount = 0.021;
          taxTotal = penghasilan * taxAmount;  
        break;

        case 'carter':
          taxAmount = 0.018;
          taxTotal = penghasilan * taxAmount; 
        break;
        
    }

    res.json({kodeObjekPajak: golongan , taxAmount: (taxAmount * 100) + '%', taxTotal: taxTotal});
})

// end of line PPH15

//start of line PPN 

app.post('/ppn', (req, res) => {
    const {penghasilan} = req.body;

    const taxAmount = 0.11;
    let taxTotal = 0;
    let priceTotal = 0;

    taxTotal = penghasilan * taxAmount;
    priceTotal = taxTotal + penghasilan;

    res.json({DPP: penghasilan , taxAmount: (taxAmount * 100) + '%', taxTotal: taxTotal, priceTotal : priceTotal});
})

// End of line PPN

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});