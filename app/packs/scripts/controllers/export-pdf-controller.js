import { Controller } from '@hotwired/stimulus';
import buildNewToast from '../lib/ToastUtils';

/**
 * Asynchronously request & download the PDF, with a spinner informing the user
 * that their PDF is being prepared.
 */
async function downloadPdf(fromUrl) {
  const pdfSpinner = buildNewToast('PDF loading. Please wait...', 'info', true);

  const res = await fetch(fromUrl);

  const filename = res.headers.get('content-disposition')
    .split('filename="')[1]
    .split('";')[0];

  // Generate anchor element containing file, and click
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  link.click();

  // Post-download cleanup
  URL.revokeObjectURL(objectUrl);
  pdfSpinner.hide();
}

export default class extends Controller {
  connect() {
    this.element.addEventListener('click', () => downloadPdf(this.element.dataset.url));
  }
}
