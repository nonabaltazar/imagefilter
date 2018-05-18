



const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let fileName = "";

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");

// Filter & Effect Handlers
document.addEventListener("click", e => {
  if (e.target.classList.contains("filter-btn")) {
    if (e.target.classList.contains("brightness-add")) {
      Caman("#canvas", img, function () {
        this.brightness(2).render();
      });
    } else if (e.target.classList.contains("brightness-remove")) {
      Caman("#canvas", img, function () {
        this.brightness(-2).render();
      });
    } else if (e.target.classList.contains("contrast-add")) {
      Caman("#canvas", img, function () {
        this.contrast(2).render();
      });
    } else if (e.target.classList.contains("contrast-remove")) {
      Caman("#canvas", img, function () {
        this.contrast(-2).render();
      });
    } else if (e.target.classList.contains("saturation-add")) {
      Caman("#canvas", img, function () {
        this.saturation(2).render();
      });
    } else if (e.target.classList.contains("saturation-remove")) {
      Caman("#canvas", img, function () {
        this.saturation(-2).render();
      });
    } else if (e.target.classList.contains("vibrance-add")) {
      console.log("vibrance")
      Caman("#canvas", img, function () {
        this.vibrance(2).render();
      });
    } else if (e.target.classList.contains("sepia-add")) {
      Caman("#canvas", img, function () {
        this.sepia(5).render();
      });
    } else if (e.target.classList.contains("sepia-remove")) {
      Caman("#canvas", img, function () {
        this.sepia(-5).render();
      });
    } else if (e.target.classList.contains("gamma-remove")) {
      Caman("#canvas", img, function () {
        this.gamma(-0.2).render();
      });
    } else if (e.target.classList.contains("gamma-add")) {
      Caman("#canvas", img, function () {
        this.gamma(0.2).render();
      });
    } else if (e.target.classList.contains("vibrance-remove")) {
      Caman("#canvas", img, function () {
        this.vibrance(-2).render();
      });
    } else if (e.target.classList.contains("exposure-remove")) {
      Caman("#canvas", img, function () {
        this.exposure(-2).render();
      });
    } else if (e.target.classList.contains("exposure-add")) {
      console.log("exp")
      Caman("#canvas", img, function () {
        this.exposure(-2).render();
      });
    } else if (e.target.classList.contains("hue-remove")) {
      Caman("#canvas", img, function () {
        this.hue(-2).render();
      });
    } else if (e.target.classList.contains("hue-add")) {
      console.log("hue")
      Caman("#canvas", img, function () {
        this.hue(2).render();
      });
    } else if (e.target.classList.contains("noise-remove")) {
      console.log("noise")
      Caman("#canvas", img, function () {
        this.noise(-15).render();
      });
    } else if (e.target.classList.contains("noise-add")) {
      Caman("#canvas", img, function () {
        this.noise(15).render();
      });
    }
     else if (e.target.classList.contains('greenminus')) {
      console.log("green");
      Caman("#canvas", function () {
        this.channels({
          green: -2,
        }).render();
      });
    } else if (e.target.classList.contains('greenplus')) {
      console.log("addgreen")
      Caman("#canvas", function () {
        this.channels({
          green: 2,
        }).render();
      });
    } else if (e.target.classList.contains("less-blue")) {
      console.log("blue")
      Caman("#canvas", function () {
        this.channels({
          blue: -2,
        }).render();
      });
    } else if (e.target.classList.contains('more-blue')) {
      console.log("moreblue")
      Caman("#canvas", function () {
        this.channels({
          blue: 2,
        }).render();
      });
    } else if (e.target.classList.contains('red-remove')) {
      Caman("#canvas", function () {
        this.channels({
          red: -2,
        }).render();
      });
    } else if (e.target.classList.contains('red-add')) {
      console.log("red")
      Caman("#canvas", function () {
        this.channels({
          red: 2,
        }).render();
      });
    }
   
}});

// Revert Filters
revertBtn.addEventListener("click", e => {
  Caman("#canvas", img, function () {
    this.revert();
  });
});

// Upload File
uploadFile.addEventListener("change", () => {
  // Get File
  const file = document.getElementById("upload-file").files[0];
  // Init FileReader API
  const reader = new FileReader();

  // Check for file
  if (file) {
    // Set file name
    fileName = file.name;
    // Read data as URL
    reader.readAsDataURL(file);
  }

  // Add image to canvas
  reader.addEventListener(
    "load",
    () => {
      // Create image
      img = new Image();
      // Set image src
      img.src = reader.result;
      // On image load add to canvas
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.removeAttribute("data-caman-id");
      };
    },
    false
  );
});

// Download Event
downloadBtn.addEventListener("click", () => {
  // Get ext
  const fileExtension = fileName.slice(-4);

  // Init new filename
  let newFilename;

  // Check image type
  if (fileExtension === ".jpg" || fileExtension === ".png") {
    // new filename
    newFilename = fileName.substring(0, fileName.length - 4) + "-filtered.jpg";
  }

  // Call download
  download(canvas, newFilename);
});

// Download
function download(canvas, filename) {
  // Init event
  let e;
  // Create link
  const link = document.createElement("a");

  // Set props
  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 0.8);
  // New mouse event
  e = new MouseEvent("click");
  // Dispatch event
  link.dispatchEvent(e);
}
