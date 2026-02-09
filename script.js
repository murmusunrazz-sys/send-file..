const serverURL = "https://file.io";

function sendFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("File select karo");

  let formData = new FormData();
  formData.append("file", file);

  fetch(serverURL, {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("sendCode").innerHTML =
      "📥 Download Link:<br>" + data.link;
  });
}let html5QrCode;

// 6-digit code
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// SEND FILE
function sendFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("File select karo");

  const code = generateCode();
  const formData = new FormData();
  formData.append("file", file);

  fetch("https://file.io", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem(code, data.link);
    document.getElementById("codeBox").innerHTML =
      "🔑 Code: <b>" + code + "</b>";

    new QRious({
      element: document.getElementById("qrCanvas"),
      value: code,
      size: 180
    });
  });
}

// RECEIVE FILE
function receiveFile() {
  const code = document.getElementById("codeInput").value;
  const link = localStorage.getItem(code);
  if (!link) return alert("Invalid code");
  window.open(link, "_blank");
}

// 📷 START QR SCAN
function startScan() {
  html5QrCode = new Html5Qrcode("reader");
  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    qrCodeMessage => {
      document.getElementById("codeInput").value = qrCodeMessage;
      html5QrCode.stop();
      receiveFile(); // ✅ auto receive
    },
    error => {}
  );
}

function receiveFile() {
  const link = document.getElementById("codeInput").value;
  if (!link) return alert("Link paste karo");
  window.open(link, "_blank");
}// 6-digit code generate
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// SEND FILE
function sendFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("Please select a file");
    return;
  }

  const code = generateCode();
  const formData = new FormData();
  formData.append("file", file);

  fetch("https://file.io", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    // save code + link (TEMP demo)
    localStorage.setItem(code, data.link);

    document.getElementById("codeBox").innerHTML =
      "🔑 6-digit Code: <b>" + code + "</b>";
  })
  .catch(() => alert("Upload failed"));
}

// RECEIVE FILE
function receiveFile() {
  const code = document.getElementById("codeInput").value;
  const link = localStorage.getItem(code);

  if (!link) {
    alert("Invalid or expired code");
    return;
  }

  window.open(link, "_blank");
}// 6-digit code generator
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// SEND FILE
function sendFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("File select karo");
    return;
  }

  const code = generateCode();
  const formData = new FormData();
  formData.append("file", file);

  fetch("https://file.io", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    // demo storage
    localStorage.setItem(code, data.link);

    document.getElementById("codeBox").innerHTML =
      "🔑 6-digit Code: <b>" + code + "</b>";

    // ✅ QR Code generate
    new QRious({
      element: document.getElementById("qrCanvas"),
      value: code,
      size: 180
    });
  })
  .catch(() => alert("Upload failed"));
}

// RECEIVE FILE
function receiveFile() {
  const code = document.getElementById("codeInput").value;
  const link = localStorage.getItem(code);

  if (!link) {
    alert("Invalid or expired code");
    return;
  }

  window.open(link, "_blank");
}