let classifier;
let images = [];
let resultsArray = [];
let classifiedCount = 0;
let uploadedRow = null; // holds the row for the uploaded image

let modelReady = false;
let allImagesLoaded = false;
let allClassificationsDone = false;

const captions = [
  "Crane",
  "Tandem bicycle",
  "Labrador retriever",
  "West Siberian Laika",
  "Runner",
  "Eiffel tower mosaic"
];

let previewImg;
let classifyButton;

function preload() {
  const imgPaths = [
    'images/bird.jpg',
    'images/bike.jpg',
    'images/labrador.png',
    'images/Laika.jpg',
    'images/runner.png',
    'images/eiffel.png'
  ];

  let loadedCount = 0;

  imgPaths.forEach((path, index) => {
    images[index] = loadImage(path, () => {
      loadedCount++;
      if (loadedCount === imgPaths.length) {
        allImagesLoaded = true;
        checkIfReady();
      }
    });
  });

  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded() {
  console.log('Model is ready.');
  modelReady = true;
  classifyAllImages();
  checkIfReady();
}

function setup() {
  noCanvas();
}

function classifyAllImages() {
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
    allClassificationsDone = true;
    checkIfReady();
  }
}

function checkIfReady() {
  if (modelReady && allImagesLoaded && allClassificationsDone) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('outer-container').style.display = 'block';
  }
}

function displayImageAndChart(results, img, i) {
  const tableBody = document.querySelector('#container tbody');

  if (i === 0) addSectionHeader('Correctly classified images');
  if (i === 3) addSectionHeader('Falsely classified images');

  const row = document.createElement('tr');

  const imgCell = document.createElement('td');
  imgCell.style.textAlign = 'center';

  const imgContainer = document.createElement('div');
  imgContainer.style.display = 'flex';
  imgContainer.style.flexDirection = 'column';
  imgContainer.style.alignItems = 'center';

  const imgElement = createImg(img.canvas.toDataURL(), 'classified image');
  imgElement.size(300, 300);
  imgElement.parent(imgContainer);

  const caption = document.createElement('div');
  caption.textContent = captions[i];
  caption.style.marginTop = '10px';
  caption.style.fontSize = '16px';
  caption.style.color = '#555';
  imgContainer.appendChild(caption);

  imgCell.appendChild(imgContainer);

  const chartCell = document.createElement('td');
  const canvas = document.createElement('canvas');
  canvas.id = 'chart' + i;
  canvas.style.maxWidth = '600px';
  canvas.style.width = '100%';
  canvas.height = 300;
  chartCell.appendChild(canvas);

  row.appendChild(imgCell);
  row.appendChild(chartCell);
  tableBody.appendChild(row);

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
        y: { beginAtZero: true }
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

// Alle Upload-Funktionen (addUploadSection, handleFile) bleiben unverändert.
// Sie können Ihren bisherigen Code hier direkt übernehmen.
