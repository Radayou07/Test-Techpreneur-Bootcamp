
const url = 'https://api.example.com/users'
async function fetchWithRetry(url, maxRetries = 3){
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < maxRetries; i++){
        try {

            const response = await fetch(url);

            if (!response.ok){
                throw new Error(`error to fetch ${url}`);
            };

            const data = await response.json();
            console.log(data);
            return data
        } catch(error) {
            console.error(`Attempt ${i+1} failed`);    
            if (i < maxRetries - 1) {
                const backoffDelay = 100 * Math.pow(2, i);
                await delay(backoffDelay);
            };
        };
    };
    throw new Error(`Failed to fetch '${url}' after ${maxRetries} attempts`)
};  
await fetchWithRetry(url)

module.exports = fetchWithRetry(url, maxRetries);