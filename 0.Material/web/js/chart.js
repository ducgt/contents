// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
// google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
rates = {};  

function exchangeRate() {
    const from1 = "USD"
    const amount1 = "1"
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const rate1 = JSON.parse(this.responseText).rates.KRW.rate
            rates.usd = rate1
        }
    });

    xhr.open("GET", "https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=" + from1 + "&to=KRW&amount=" + amount1);
    xhr.setRequestHeader("x-rapidapi-host", "currency-converter5.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "12fac7aa82msh76741745510d79cp1b31a9jsna944b5ad8362");
    
    xhr.send(data);

    const from3 = "EUR"
    const amount3 = "1"
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const rate3 = JSON.parse(this.responseText).rates.KRW.rate
            console.log(rate3)
            rates.eur = rate3
        }
    });
    
    xhr.open("GET", "https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=" + from3 + "&to=KRW&amount=" + amount3);
    xhr.setRequestHeader("x-rapidapi-host", "currency-converter5.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "12fac7aa82msh76741745510d79cp1b31a9jsna944b5ad8362");
    
    xhr.send(data);

    const from2 = "JPY"
    const amount2 = "1"
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const rate2 = JSON.parse(this.responseText).rates.KRW.rate
            console.log(rate2)
            rates.jpy = rate2
            google.charts.setOnLoadCallback(drawChart);
        }
    });
    
    xhr.open("GET", "https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=" + from2 + "&to=KRW&amount=" + amount2);
    xhr.setRequestHeader("x-rapidapi-host", "currency-converter5.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "12fac7aa82msh76741745510d79cp1b31a9jsna944b5ad8362");
    
    xhr.send(data);
}

function drawChart() {

  // Create the data table.
  const data = new google.visualization.DataTable();
  data.addColumn('string', '통화 종류');
  data.addColumn('number', '환율(원)');
  console.log(rates)
  data.addRows([
    ['달러(USD)', Number(rates.usd)],
    ['엔(JPY)', Number(rates.jpy) * 100],
    ['유로(EUR)', Number(rates.eur)]
  ]);

  // Set chart options
  var options = {'title':'실시간 원화 환율',
                 'width': 640,
                 'height': 480};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

document.getElementById("today").innerHTML = new Date().toLocaleDateString()
exchangeRate()