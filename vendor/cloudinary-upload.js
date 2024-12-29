import "https://unpkg.com/element-internals-polyfill";

class ImageUpload extends HTMLElement {
  static formAssociated = true;
  constructor() {
    super();
    this.internals = this.attachInternals(); // Attach form internals
    this.url = this.getAttribute("url"); // Cloudinary URL
  }

  connectedCallback() {
    var value;
    // Render the file input
    if (((value = this.getAttribute("value")), value !== "null")) {
      console.log(value);
      this.innerHTML = `<img src="${value}" ><input type="file" />`;
    } else {
      this.innerHTML = `<input type="file" />`;
    }

    // Listen for file changes
    this.querySelector("input").addEventListener("change", (event) =>
      this.uploadFile(event),
    );
  }

  async uploadFile(event) {
    const files = event.target.files;

    if (files.length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "default-swtl");
      try {
        const response = await fetch(this.url, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        const imageUrl = data.secure_url; // Cloudinary URL after upload

        // Set the input value to the returned image URL
        this.internals.setFormValue(imageUrl);
        this.innerHTML = `<img src="${imageUrl}" >`;
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  }
}

// Register the custom element
customElements.define("cloudinary-upload", ImageUpload);
