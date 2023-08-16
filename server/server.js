const express = require('express');
const axios = require('axios');
const app = express();
const port = 5005;

app.listen(port,()=>{console.log(`listening to port ${port}`)});


app.get('/numbers', async (req, res) => {
    const maxTime = 5000;
    const allUrls = req.query.url || [];
    var answer = [];

    for (const url of allUrls) { 
        try {
            const response = await axios.get(url, { timeout: maxTime }); 

            if (response.data.numbers.length > 0) { 
                answer.push(...response.data.numbers); 
            }
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error.message);
        }
    }

    console.log(allUrls);
    console.log(answer);

    answer = answer.sort((a, b) => a - b);

    
    answer = answer.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    console.log(answer);
    const obj={"numbers":answer};
    res.json(obj); 
});