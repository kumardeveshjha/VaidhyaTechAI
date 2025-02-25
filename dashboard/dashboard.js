document.addEventListener('DOMContentLoaded', () => {
  const routes = {
      '#home': './home.html',
      '#appointments': './appointments.html',
      '#medical-history': './medical-history.html',
      '#settings': './settings.html',
  };

  function loadContent() {
      const hash = window.location.hash || '#home';
      const pageTitle = document.getElementById('page-title');
      const contentArea = document.getElementById('content-area');
      const url = routes[hash] || 'pages/home.html';

      fetch(url)
          .then(response => response.text())
          .then(html => {
              contentArea.innerHTML = html;
              pageTitle.textContent = hash.replace('#', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
              if (hash === '#medical-history') {
                  setTimeout(setupReportUpload, 0);
              }
          })
          .catch(() => {
              contentArea.innerHTML = '<p>Page not found.</p>';
          });
  }

  function setupReportUpload() {
      const uploadButton = document.querySelector('#report-upload-form button');
      if (uploadButton) {
          uploadButton.addEventListener('click', uploadReport);
      }
  }

  function uploadReport() {
      const fileInput = document.getElementById('report-file');
      if (fileInput.files.length > 0) {
          alert('Your report has been successfully uploaded.');
      } else {
          alert('Please select a file to upload.');
      }
  }

  window.addEventListener('hashchange', loadContent);
  loadContent(); // Load initial content
});
 