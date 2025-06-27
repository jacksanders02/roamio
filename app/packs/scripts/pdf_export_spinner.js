import buildNewToast from './lib/ToastUtils';

function showPdfToast() {
  buildNewToast('PDF loading. Please wait...', 'info', true);
}

document.addEventListener('turbo:load', () => {
  document.getElementById('export-pdf-trip').addEventListener('click', showPdfToast);
});
