let classifier;
let images = [];
let resultsArray = [];
let labelsArray = [[]];



function preload() {
  classifier = ml5.imageClassifier("MobileNet");
  images.push(loadImage("images/bird.jpg"));
  images.push(loadImage("images/bike.jpg"));
  images.push(loadImage("images/labrador.png"));
  images.push(loadImage("images/laika.jpg"));
  images.push(loadImage("images/runner.png"));
  images.push(loadImage("images/eiffel.png"));
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
  
    // === NEU: Überschrift vor dem ersten Bild ===
  if (i === 0) {
    const headingRow = document.createElement('tr');
    const headingCell = document.createElement('td');
    headingCell.colSpan = 2;
    headingCell.style.textAlign = 'left';
    headingCell.style.padding = '20px 10px 10px 10px';

    const heading = document.createElement('h2');
    heading.textContent = 'Richtig klassifizierte Bilder';
    heading.style.margin = '0';

    headingCell.appendChild(heading);
    headingRow.appendChild(headingCell);
    tableBody.appendChild(headingRow);
  }
  // === Ende erste Überschrift ===
  
  // === NEU: Überschrift nach dem dritten Bild ===
  if (i === 3) { // Beachte: Index 3 ist das 4. Bild (0-basiert)
    const headingRow = document.createElement('tr');
    const headingCell = document.createElement('td');
    headingCell.colSpan = 2;
    headingCell.style.textAlign = 'left';
    headingCell.style.padding = '20px 10px 10px 10px';

    const heading = document.createElement('h2');
    heading.textContent = 'Falsch klassifizierte Bilder';
    heading.style.margin = '0'; // Kein zusätzlicher Abstand

    headingCell.appendChild(heading);
    headingRow.appendChild(headingCell);
    tableBody.appendChild(headingRow);
  }
  // === Ende neue Überschrift ===

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
  canvas.style.maxWidth = '600px';  // Maximale Breite
  canvas.style.width = '100%';      // Flexible Breite bis maximal 300px
  canvas.style.height = '300px';              // Höhe bleibt konstant
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
  chartCanvas.height = 300;
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
          beginAtZero: true,
          responsive: true,
maintainAspectRatio: false
        }
      }
    }
  });
  
  // === Dritte Überschrift (nach dem letzten Bild) ===
  if (i === images.length - 1) { // Nach dem letzten Bild
    const finalHeadingRow = document.createElement('tr');
    const finalHeadingCell = document.createElement('td');
    finalHeadingCell.colSpan = 2;
    finalHeadingCell.style.textAlign = 'left';
    finalHeadingCell.style.padding = '30px 10px 10px 10px';

    const finalHeading = document.createElement('h2');
    finalHeading.textContent = 'Eigenes Bild zum Klassifizieren hochladen';
    finalHeading.style.margin = '0';

    finalHeadingCell.appendChild(finalHeading);
    finalHeadingRow.appendChild(finalHeadingCell);
    tableBody.appendChild(finalHeadingRow);

    
  // === NEU: Drag&Drop-Feld und Buttons hinzufügen ===
  const uploadRow = document.createElement('tr');
  const uploadCell = document.createElement('td');
  uploadCell.colSpan = 2;
  uploadCell.style.textAlign = 'center';
  uploadCell.style.padding = '20px';

  // Drag&Drop Bereich
  const dropZone = document.createElement('div');
  dropZone.id = 'drop-zone';
  dropZone.style.border = '2px dashed #999';
  dropZone.style.borderRadius = '10px';
  dropZone.style.padding = '40px';
  dropZone.style.marginBottom = '20px';
  dropZone.style.backgroundColor = '#f9f9f9';
  dropZone.textContent = 'Ziehe ein Bild hierher oder wähle ein Bild aus';
  
  // Dateieingabe
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.id = 'image-input';
  fileInput.style.display = 'none'; // wird vom Button ausgelöst

  // "Bild auswählen" Button
  const selectButton = document.createElement('button');
  selectButton.textContent = 'Bild auswählen';
  selectButton.style.marginRight = '10px';
  selectButton.onclick = function() {
    fileInput.click(); // Klick auf verstecktes File-Input
  };

  // "Klassifizieren" Button
  const classifyButton = document.createElement('button');
  classifyButton.textContent = 'Klassifizieren';
  classifyButton.disabled = true; // Anfangs deaktiviert

  // Bildvorschau (optional, klassisch sinnvoll)
  const previewImg = document.createElement('img');
  previewImg.style.maxWidth = '300px';
  previewImg.style.marginTop = '20px';
  previewImg.style.display = 'none';

  // Event Listener für File Input
  fileInput.addEventListener('change', (event) => {
    handleFile(event.target.files[0]);
  });

  // Drag & Drop Events
  dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.style.backgroundColor = '#e0e0e0';
  });

  dropZone.addEventListener('dragleave', (event) => {
    event.preventDefault();
    dropZone.style.backgroundColor = '#f9f9f9';
  });

  dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropZone.style.backgroundColor = '#f9f9f9';
    const file = event.dataTransfer.files[0];
    handleFile(file);
  });

  function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        previewImg.src = e.target.result;
        previewImg.style.display = 'block';
        classifyButton.disabled = false;
      };
      reader.readAsDataURL(file);
    }
  }

  // Button "Klassifizieren" klickbar machen
  classifyButton.onclick = function() {
    if (previewImg.src) {
      classifier.classify(previewImg, (results) => {
        console.log('Klassifizierungsergebnis:', results);
        alert('Top Ergebnis: ' + results[0].label + ' (' + (results[0].confidence * 100).toFixed(1) + '%)');
      });
    }
  };

  // Alle Elemente anhängen
  uploadCell.appendChild(dropZone);
  uploadCell.appendChild(fileInput);
  uploadCell.appendChild(selectButton);
  uploadCell.appendChild(classifyButton);
  uploadCell.appendChild(previewImg);

  uploadRow.appendChild(uploadCell);
  tableBody.appendChild(uploadRow);
}
}
