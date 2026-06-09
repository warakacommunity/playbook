// Web Worker for file processing - runs in separate thread
self.onmessage = async (event) => {
  const { arrayBuffer, fileName, ext } = event.data;

  try {
    console.log('[worker] Starting to process:', fileName);

    if (ext !== 'docx') {
      self.postMessage({ success: true, data: null });
      return;
    }

    // Dynamic import of mammoth inside worker
    const mammoth = await import('https://unpkg.com/mammoth@1.4.21/mammoth.browser.min.js').catch(() => null);

    if (!mammoth) {
      throw new Error('Could not load mammoth library');
    }

    console.log('[worker] Converting DOCX...');
    const result = await mammoth.default.convertToHtml({
      arrayBuffer,
      convertImage: () => Promise.resolve({ src: '' }),
    });

    console.log('[worker] Done converting, HTML length:', result.value.length);
    self.postMessage({
      success: true,
      data: {
        html: result.value,
        fileName,
      }
    });
  } catch (error) {
    console.error('[worker] Error:', error);
    self.postMessage({
      success: false,
      error: error.message
    });
  }
};
