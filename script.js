const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

  // get Quotes from API 

let apiQuotes = [];

  // show Loading

   function Loading() {

   loader.hidden = false;
   quoteContainer.hidden = true;
 }

 // Hide Loading
 function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
 }

// show New Qute

function newQoutes(){
    Loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Quotes UnKnown
    if (!quote.author){
        authorText.textContent = 'UnKnown';
    } else{
         authorText.textContent = quote.author;
         }

    // cheack Quotes lemghth
      
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }

    //set Quote , Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// get Quotes From API 
async function getQuotes() {
     Loading();

    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const respones = await fetch(apiUrl);
        apiQuotes = await respones.json();
        newQoutes();
    } catch (error) {

    }

}


//tweet Qutoes 

 function tweetQuote() {
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
   window.open(twitterUrl, '_blank');
 }


// Even Listeners
 newQuoteBtn.addEventListener('click',newQoutes);
 twitterBtn.addEventListener ('click',tweetQuote);


//On Load
getQuotes();
