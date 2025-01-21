// Import jsdom to simulate a browser environment
const { JSDOM } = require('jsdom');

// Create a mock HTML structure
const dom = new JSDOM(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Test Page</title>
    </head>
    <body>
      <!-- Sidebar and button for sidebar toggle -->
      <div data-sidebar></div>
      <button data-sidebar-btn>Toggle Sidebar</button>

      <!-- Testimonial Section -->
      <div data-testimonials-item>
        <img data-testimonials-avatar src="avatar.jpg" alt="avatar">
        <div data-testimonials-title>Testimonial Title</div>
        <div data-testimonials-text>Testimonial Text</div>
      </div>

      <!-- Modal Elements -->
      <div data-modal-container></div>
      <button data-modal-close-btn>Close</button>
      <div data-overlay></div>
    </body>
  </html>
`);

// Make the document object globally accessible
global.document = dom.window.document;
global.window = dom.window;
global.navigator = { userAgent: 'node.js' };

// Now, you can write the rest of your original script
'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); };

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Only add event listener if the sidebar button exists
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// Testimonials variables (modal functionality)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

if (modalContainer && modalCloseBtn && overlay) {
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      const modalImg = document.querySelector("[data-modal-img]");
      const modalTitle = document.querySelector("[data-modal-title]");
      const modalText = document.querySelector("[data-modal-text]");

      if (modalImg && modalTitle && modalText) {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        testimonialsModalFunc();
      }
    });
  }

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}
