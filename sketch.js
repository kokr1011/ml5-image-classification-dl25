let classifier;
let images = [];
let resultsArray = [];
let classifiedCount = 0;
let uploadedRow = null; // hält die Zeile für das hochgeladene Bild

const captions = [
  "Crane",
  "Tandem bicycle",
  "Labrador retriever",
  "Laika",
  "Runner",
  "Eiffel tower mosaic"
];


function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  images.push(loadImage('images/bird.jpg'));
  images.push(loadImage('images/bike.jpg'));
  images.push(loadImage('images/labrador.png'));
  images.push(loadImage('images/laika.jpg'));
  images.push(loadImage('images/runner.png'));
  images.push(loadImage('images/eiffel.png'));
}

function setup() {
  noCanvas();
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

  classifiedCount++;
  if (classifiedCount === images.length) {
    addUploadSection();
  }
}

function displayImageAndChart(results, img, i) {
  const tableBody = document.querySelector('#container tbody');

  // Überschriften für Bereiche einfügen
  if (i === 0) {
    addSectionHeader('Richtig klassifizierte Bilder');
  }
  if (i === 3) {
    addSectionHeader('Falsch klassifizierte Bilder');
  }

  // Neue Tabellenzeile
  const row = document.createElement('tr');

  // === Linke Zelle: Bild mit Unterschrift ===
  const imgCell = document.createElement('td');
  imgCell.style.textAlign = 'center';

  // Container für Bild + Bildunterschrift
  const imgContainer = document.createElement('div');
  imgContainer.style.display = 'flex';
  imgContainer.style.flexDirection = 'column';
  imgContainer.style.alignItems = 'center';

  // Bild selbst
  const imgElement = createImg(img.canvas.toDataURL(), 'classified image');
  imgElement.size(300, 300);
  imgElement.parent(imgContainer);

  const caption = document.createElement('div');
  caption.textContent = captions[i];
  caption.style.marginTop = '10px';
  caption.style.fontSize = '16px';
  caption.style.color = '#555';
  imgContainer.appendChild(caption);

  // Container in die Zelle einfügen
  imgCell.appendChild(imgContainer);

  // === Rechte Zelle: Chart ===
  const chartCell = document.createElement('td');

  const canvas = document.createElement('canvas');
  canvas.id = 'chart' + i;
  canvas.style.maxWidth = '600px';
  canvas.style.width = '100%';
  canvas.height = 300;
  chartCell.appendChild(canvas);

  // Zeile zusammensetzen
  row.appendChild(imgCell);
  row.appendChild(chartCell);
  tableBody.appendChild(row);

  // === Chart erzeugen ===
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        results.label1.split(' '),
        results.label2.split(' '),
        results.label3.split(' ')
      ],
      datasets: [{
        label: '% Confidence',
        data: [results.confidence1, results.confidence2, results.confidence3],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


function addSectionHeader(title) {
  const tableBody = document.querySelector('#container tbody');
  const headingRow = document.createElement('tr');
  const headingCell = document.createElement('td');
  headingCell.colSpan = 2;
  headingCell.innerHTML = `<h2>${title}</h2>`;
  headingRow.appendChild(headingCell);
  tableBody.appendChild(headingRow);
}

function addUploadSection() {
  addSectionHeader('Eigenes Bild zum Klassifizieren hochladen');

  const tableBody = document.querySelector('#container tbody');
  const uploadRowContainer = document.createElement('tr');
  const uploadCell = document.createElement('td');
  uploadCell.colSpan = 2;
  uploadCell.style.textAlign = 'center';

  const dropZone = document.createElement('div');
  dropZone.id = 'drop-zone';
  dropZone.textContent = 'Ziehe ein Bild hierher oder klicke zum Auswählen';
  dropZone.style.cursor = 'pointer';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.id = 'image-input';
  fileInput.style.display = 'none';

  const selectButton = document.createElement('button');
  selectButton.textContent = 'Bild auswählen';
  selectButton.onclick = () => fileInput.click();

  const classifyButton = document.createElement('button');
  classifyButton.textContent = 'Klassifizieren';
  classifyButton.disabled = true;

  let previewImg = document.createElement('img');
  previewImg.style.width = '300px';
  previewImg.style.height = '300px';
  previewImg.style.objectFit = 'cover';
  previewImg.style.display = 'none';
  previewImg.style.marginTop = '20px';
  previewImg.style.borderRadius = '8px';
  previewImg.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';

  dropZone.onclick = () => fileInput.click(); // Klick auf Dropzone öffnet auch Dateiauswahl

  fileInput.addEventListener('change', (event) => {
    handleFile(event.target.files[0]);
  });

  dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.style.backgroundColor = '#d0d7dd';
  });

  dropZone.addEventListener('dragleave', (event) => {
    event.preventDefault();
    dropZone.style.backgroundColor = '#eceff1';
  });

  dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropZone.style.backgroundColor = '#eceff1';
    handleFile(event.dataTransfer.files[0]);
  });

  function handleFile(file) {
  if (file && file.type.startsWith('image/')) {
    if (uploadedRow) {
      uploadedRow.remove();  // Altes Ergebnis sofort entfernen
      uploadedRow = null;    // Zeiger zurücksetzen
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewImg.style.display = 'block';
      classifyButton.disabled = false;
    };
    reader.readAsDataURL(file);
  }
}

  classifyButton.onclick = () => {
    if (previewImg.src) {
      classifier.classify(previewImg, (results) => {
        if (uploadedRow) {
          uploadedRow.remove();
        }
        uploadedRow = document.createElement('tr');

        const imgCell = document.createElement('td');
        const imgElement = document.createElement('img');
        imgElement.src = previewImg.src;
        imgElement.style.width = '300px';
        imgElement.style.height = '300px';
        imgElement.style.objectFit = 'cover';
        imgElement.style.borderRadius = '8px';
        imgElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        imgCell.appendChild(imgElement);

        const chartCell = document.createElement('td');
        const canvas = document.createElement('canvas');
        canvas.style.maxWidth = '600px';
        canvas.style.width = '100%';
        canvas.height = 300;
        chartCell.appendChild(canvas);

        uploadedRow.appendChild(imgCell);
        uploadedRow.appendChild(chartCell);

        const tableBody = document.querySelector('#container tbody');
        tableBody.appendChild(uploadedRow);

        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [
              results[0].label.split(' '),
              results[1].label.split(' '),
              results[2].label.split(' ')
            ],
            datasets: [{
              label: '% Confidence',
              data: [
                (results[0].confidence * 100).toFixed(1),
                (results[1].confidence * 100).toFixed(1),
                (results[2].confidence * 100).toFixed(1)
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        // Bildvorschau entfernen
        previewImg.style.display = 'none';
      });
    }
  };

  uploadCell.appendChild(dropZone);
  uploadCell.appendChild(fileInput);
  uploadCell.appendChild(selectButton);
  uploadCell.appendChild(classifyButton);
  uploadCell.appendChild(previewImg);

  uploadRowContainer.appendChild(uploadCell);
  tableBody.appendChild(uploadRowContainer);
}
