import "https://unpkg.com/element-internals-polyfill";

class ImageUpload extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.url = this.getAttribute("url");

    // Bind methods to maintain correct 'this' context
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
  }

  connectedCallback() {
    const value = this.getAttribute("value");

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
        ${value !== "null" && value ? `<img src="${value}" style="max-width: 100%; margin-bottom: 10px;">` : ''}
        <input type="file" accept="image/*" style="display: none;">
        <div class="upload-text">
          Drop image here or click to upload
        </div>
      </div>
    `;

    const dropZone = this.querySelector('.upload-zone');
    const fileInput = this.querySelector('input');

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
    formData.append("file", file);
    formData.append("upload_preset", "default-swtl");

    try {
      const uploadZone = this.querySelector('.upload-zone');
      uploadZone.style.opacity = '0.5';
      uploadZone.querySelector('.upload-text').textContent = 'Uploading...';

      const response = await fetch(this.url, {
        method: "POST",
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
      console.error("Upload failed:", error);
      this.querySelector('.upload-text').textContent = 'Upload failed. Try again.';
      this.querySelector('.upload-zone').style.opacity = '1';
    }
  }
}

customElements.define("cloudinary-upload", ImageUpload);