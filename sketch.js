let classifier;
let images = [];
let resultsArray = [];
let labelsArray = [[]];

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
  images.push(loadImage("images/bird.jpg"));
  images.push(loadImage("images/bike.jpg"));
  images.push(loadImage("images/laika.jpg"));
}

function setup() {
  noCanvas(); // Wir verwenden hier kein zentrales Canvas
  for (let i = 0; i < images.length; i++) {
    classifier.classify(images[i], function(results) {
      gotResult(results, i);
    });
  }
}

function gotResult(results, index) {
  resultsArray[index] = {
    label1: results[0].label,
    label2: results[1].label,
    label3: results[2].label,
    confidence1: nf(results[0].confidence * 100, 0, 1),
    confidence2: nf(results[1].confidence * 100, 0, 1),
    confidence3: nf(results[2].confidence * 100, 0, 1)
  };
  
  displayImageAndChart(resultsArray[index], images[index], index);
}

function displayImageAndChart(results, img, i) {
  const tableBody = document.querySelector('#container tbody');

  // Neue Tabellenzeile
  const row = document.createElement('tr');

  // Erste Zelle: Bild
  const imgCell = document.createElement('td');
  imgCell.style.verticalAlign = 'top'; // Oben ausrichten
  imgCell.style.padding = '40px';
  
  const imgElement = createImg(img.canvas.toDataURL(), 'classified image');
  imgElement.size(300, 300);
  imgElement.parent(imgCell);

  // Zweite Zelle: Chart
  const chartCell = document.createElement('td');
  chartCell.style.verticalAlign = 'top'; // Oben ausrichten
  chartCell.style.padding = '10px';

  const canvas = document.createElement('canvas');
  canvas.id = 'chart' + i;
  canvas.width = 300; // Feste Breite für saubere Ausrichtung
  canvas.height = 300;
  chartCell.appendChild(canvas);

  // Anhängen
  row.appendChild(imgCell);
  row.appendChild(chartCell);
  tableBody.appendChild(row);

  // Chart erstellen
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        results.label1.split(" "),
        results.label2.split(" "),
        results.label3.split(" ")
      ],
      datasets: [{
        label: '% Confidence',
        data: [results.confidence1, results.confidence2, results.confidence3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



function draw() {
  background(255); // Klarer Hintergrund
  
  fill(0);
  textSize(18);
  
  for (let i = 0; i < images.length; i++) {
    // Bilder anzeigen
    image(images[i], 0, i * 300, 200, 200);
    
    // Ergebnisse anzeigen, falls vorhanden
    if (resultsArray[i]) {
      text("Label: " + resultsArray[i].label1, 10, i * 300 + 220);
      text("Confidence: " + resultsArray[i].confidence1, 10, i * 300 + 240);
    }
  }
}

function kissMyAss(results, i) {
  console.log("Ebasi");
  
  const chartContainer = document.getElementById('charts');
  const chartCanvas = document.createElement('canvas');
  chartCanvas.id = 'myChart' + i;
  chartCanvas.width = 400;
  chartCanvas.height = 500;
  chartContainer.appendChild(chartCanvas);
  
  const ctx = chartCanvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [results.label1, results.label2, results.label3],
      datasets: [{
        label: '% of confidence',
        data: [results.confidence1, results.confidence2, results.confidence3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



