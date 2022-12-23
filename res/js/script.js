(function QuoteGenerator()
{ 
    const API_URL = "https://type.fit/api/quotes";
    const generateButton = document.getElementById('generateButton');

    let quotes = [];
    
    async function FetchQuotesFromAPI(url)
    {
        // Load the json object returned by the API_URL and push all objects into the
        // "quotes" array
        const response = await fetch(url);
        let data = await response.json();
    
        for(let i = 0; i < data.length; ++i)
        {
            quotes.push(data[i]);
        }

        // Call generateQuote() so we populate the page once loaded with a random quote
        // saves the user being presented with nothing on the page
        generateQuote();
    }
    
    // Generates and returns a random number from 0 to the size of the "quotes"
    // array, flooring the result will round up or down to prevent decimals and giving
    // an incorrect index 
    const generateQuoteIndex = () =>
    {
        let quoteIndex = Math.floor(Math.random() * quotes.length);
        return quoteIndex;
    };
    
    // Generates a random index, pulls the quote from the "quotes" array that is stored 
    // at that index, fills the DOM elements with the information from that quote
    // such as the quote text and author and then sets the relative elements innerText 
    // to that information for it to be displayed to the user
    const generateQuote = () =>
    {
        let index = generateQuoteIndex();
        
        let chosenQuote = quotes[index]?.text;
        let quoteAuthor = quotes[index]?.author;
    
        let text = document.getElementById('quoteText');
        text.innerText = chosenQuote;
    
        let author = document.getElementById('quoteAuthor');
        if(quoteAuthor)
            author.innerText = quoteAuthor;
        else
            author.innerText = 'No author found';
    }
    
    // Call fetchQuotes on start 
    FetchQuotesFromAPI(API_URL);

    // Add event listener to the generateButton to call the callback funtion 'generateQuote"
    // on button click
    generateButton.addEventListener('click', generateQuote);
})();