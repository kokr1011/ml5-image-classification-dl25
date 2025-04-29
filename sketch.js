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

let classifier;

let images = [];

let resultsArray = [];

let classifiedCount = 0;

let uploadedRow = null; // holds the row for the uploaded image
 
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

  classifier = ml5.imageClassifier('MobileNet');

  images.push(loadImage('images/bird.jpg'));

  images.push(loadImage('images/bike.jpg'));

  images.push(loadImage('images/labrador.png'));

  images.push(loadImage('images/Laika.jpg'));

  images.push(loadImage('images/runner.png'));

  images.push(loadImage('images/eiffel.png'));

}
 
function setup() {

  let allImagesLoaded = false;

let allClassificationsDone = false;

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

// Nach dem vollständigen Laden:

document.getElementById('loading').style.display = 'none';

document.getElementById('outer-container').style.display = 'block'; 

  }

}
 
 
function displayImageAndChart(results, img, i) {

  const tableBody = document.querySelector('#container tbody');
 
  // Section headers

  if (i === 0) {

    addSectionHeader('Correctly classified images');

  }

  if (i === 3) {

    addSectionHeader('Falsely classified images');

  }
 
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
 
function addUploadSection() {

  addSectionHeader('Upload your own image to classify');
 
  const tableBody = document.querySelector('#container tbody');

  const uploadRow = document.createElement('tr');

  const uploadCell = document.createElement('td');

  uploadCell.colSpan = 2;

  uploadCell.style.textAlign = 'center';
 
  const dropZone = document.createElement('div');

  dropZone.id = 'drop-zone';

  dropZone.textContent = 'Click to upload or drag and drop';

  dropZone.style.cursor = 'pointer';

  dropZone.style.border = '2px dashed #90a4ae';

  dropZone.style.borderRadius = '10px';

  dropZone.style.padding = '40px';

  dropZone.style.marginBottom = '20px';

  dropZone.style.backgroundColor = '#eceff1';

  const helpText = document.createElement('small');

  helpText.textContent = 'Supported formats: JPG, PNG (max 5MB)';

  helpText.style.display = 'block';

  helpText.style.marginTop = '10px';

  helpText.style.color = '#555';

  dropZone.appendChild(helpText);
 
  const fileInput = document.createElement('input');

  fileInput.type = 'file';

  fileInput.accept = 'image/jpeg, image/png';

  fileInput.style.display = 'none';
 
  const selectButton = document.createElement('button');

  selectButton.textContent = 'Upload image';

  selectButton.onclick = () => fileInput.click();
 
  classifyButton = document.createElement('button');

  classifyButton.textContent = 'Classify';

  classifyButton.disabled = true;
 
  previewImg = document.createElement('img');

  previewImg.alt = 'Preview of uploaded image';

  previewImg.style.width = '300px';

  previewImg.style.height = '300px';

  previewImg.style.objectFit = 'cover';

  previewImg.style.display = 'none';

  previewImg.style.marginTop = '20px';

  previewImg.style.borderRadius = '8px';

  previewImg.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
 
  const feedbackText = document.createElement('div');

  feedbackText.style.marginTop = '10px';

  feedbackText.style.color = '#4caf50';

  feedbackText.style.display = 'none';
 
  dropZone.onclick = () => fileInput.click();
 
  fileInput.addEventListener('change', (event) => {

    handleFile(event.target.files[0], feedbackText);

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

    handleFile(event.dataTransfer.files[0], feedbackText);

  });
 
  classifyButton.onclick = () => {

    if (previewImg.src) {

      classifier.classify(previewImg, (results) => {

        if (uploadedRow) uploadedRow.remove();
 
        uploadedRow = document.createElement('tr');
 
        const imgCell = document.createElement('td');

        const imgElement = document.createElement('img');

        imgElement.src = previewImg.src;

        imgElement.alt = 'Classified uploaded image';

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

              y: { beginAtZero: true }

            }

          }

        });
 
        previewImg.style.display = 'none';

        classifyButton.disabled = true;

        feedbackText.textContent = 'Image successfully classified!';

        feedbackText.style.display = 'block';

      });

    }

  };
 
  uploadCell.appendChild(dropZone);

  uploadCell.appendChild(fileInput);

  uploadCell.appendChild(selectButton);

  uploadCell.appendChild(classifyButton);

  uploadCell.appendChild(previewImg);

  uploadCell.appendChild(feedbackText);
 
  uploadRow.appendChild(uploadCell);

  tableBody.appendChild(uploadRow);

}
 
function handleFile(file, feedbackText) {

  if (!file) {

    alert('No file selected.');

    return;

  }
 
  // Dateityp prüfen

  const allowedTypes = ['image/jpeg', 'image/png'];

  if (!allowedTypes.includes(file.type)) {

    alert('Unsupported file format. Please upload a JPG or PNG image.');

    return;

  }
 
  // Dateigröße prüfen

  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

  if (file.size > maxSizeInBytes) {

    alert('The uploaded file is too large. Please upload an image smaller than 5MB.');

    return;

  }
 
  // Falls bereits ein vorheriges hochgeladenes Bild und Chart existiert: entfernen

  if (uploadedRow) {

    uploadedRow.remove();

    uploadedRow = null;

  }
 
  const reader = new FileReader();

  reader.onload = (e) => {

    previewImg.src = e.target.result;

    previewImg.style.display = 'block';

    classifyButton.disabled = false;

    if (feedbackText) feedbackText.style.display = 'none';

  };

  reader.readAsDataURL(file);

}

 
