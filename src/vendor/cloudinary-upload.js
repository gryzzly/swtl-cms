// Helper function to decode HTML entities
function decodeHtmlEntities(encodedString) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = encodedString;
  return textarea.value;
}

// Check if ElementInternals is supported
function isElementInternalsSupported() {
  return 'ElementInternals' in window;
}

async function loadElementInternalsPolyfill() {
  if (!isElementInternalsSupported()) {
    try {
      await import('https://unpkg.com/element-internals-polyfill');
      console.log('ElementInternals polyfill loaded successfully');
    } catch (error) {
      console.error('Failed to load ElementInternals polyfill:', error);
    }
  } else {
    console.log('ElementInternals is natively supported');
  }
}

class ImageUpload extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.url = ''; // Default URL, may be overridden by config attribute
  }

  connectedCallback() {
    const value = this.getAttribute('value');
    const config = this.getAttribute('config');

    // Parse and decode config JSON if provided
    if (config) {
      try {
        const decodedConfig = decodeHtmlEntities(config);
        const parsedConfig = JSON.parse(decodedConfig);
        if (parsedConfig.url) {
          this.url = parsedConfig.url;
        }
      } catch (error) {
        console.error('Invalid JSON in config attribute:', error);
      }
    }

    // Create drop zone with file input
    this.innerHTML = `
      <div class="upload-zone" style="
        border: 2px dashed #ccc;
        border-radius: 4px;
        padding: 20px;
        text-align: center;
        background: #f8f8f8;
        cursor: pointer;
        transition: all 0.3s ease;
      ">
        ${value !== 'null' && value ? `<img src="${value}" style="max-width: 100%; margin-bottom: 10px;">` : ''}
        <input type="file" accept="image/*" style="display: none;">
        <div class="upload-text">
          Drop image here or click to upload
        </div>
      </div>
    `;

    const dropZone = this.querySelector('.upload-zone');
    const fileInput = this.querySelector('input');

    // Bind event handlers
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);

    // Add drag and drop event listeners
    dropZone.addEventListener('dragover', this.handleDragOver);
    dropZone.addEventListener('dragenter', this.handleDragEnter);
    dropZone.addEventListener('dragleave', this.handleDragLeave);
    dropZone.addEventListener('drop', this.handleDrop);

    // Handle click to upload
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (event) => this.uploadFile(event.target.files[0]));
  }

  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  handleDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();
    this.querySelector('.upload-zone').style.borderColor = '#2196f3';
    this.querySelector('.upload-zone').style.background = '#e3f2fd';
  }

  handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.querySelector('.upload-zone').style.borderColor = '#ccc';
    this.querySelector('.upload-zone').style.background = '#f8f8f8';
  }

  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    this.querySelector('.upload-zone').style.borderColor = '#ccc';
    this.querySelector('.upload-zone').style.background = '#f8f8f8';

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.uploadFile(files[0]);
    }
  }

  async uploadFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      console.error('Please upload an image file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'default-swtl');

    try {
      const uploadZone = this.querySelector('.upload-zone');
      uploadZone.style.opacity = '0.5';
      uploadZone.querySelector('.upload-text').textContent = 'Uploading...';

      const response = await fetch(this.url, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.secure_url;

      this.internals.setFormValue(imageUrl);

      uploadZone.style.opacity = '1';
      uploadZone.innerHTML = `
        <img src="${imageUrl}" style="max-width: 100%; margin-bottom: 10px;">
        <input type="file" accept="image/*" style="display: none;">
        <div class="upload-text">
          Drop image here or click to upload
        </div>
      `;
    } catch (error) {
      console.error('Upload failed:', error);
      this.querySelector('.upload-text').textContent = 'Upload failed. Try again.';
      this.querySelector('.upload-zone').style.opacity = '1';
    }
  }
}

async function initializeCustomElement() {
  await loadElementInternalsPolyfill();
  customElements.define('cloudinary-upload', ImageUpload);
}

initializeCustomElement();