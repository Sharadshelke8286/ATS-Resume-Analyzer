/**
 * pdfGenerator.js
 * Generates a pixel-perfect PDF that matches the browser preview exactly.
 *
 * HOW IT WORKS:
 * - Targets "pdf-wrapper" div which wraps the resume at exactly 794px
 * - windowWidth: 794 locks html2canvas to A4 width — no reflow or wrapping
 * - jsPDF unit "px" + format [794, 1123] = exact A4 in pixels
 * - margin: 0 because templates control their own internal padding
 * - scale: 2 = retina sharpness
 * - scrollY: -window.scrollY fixes capture offset when page is scrolled
 */
const downloadResumePdf = async (wrapperId = "pdf-wrapper", filename = "resume") => {
  const element = document.getElementById(wrapperId);
  if (!element) {
    console.error(`[pdfGenerator] Element #${wrapperId} not found.`);
    return;
  }

  const html2pdf = (await import("html2pdf.js")).default;

  // Temporarily force the element to be visible at full size for capture
  const originalStyle = element.style.cssText;
  element.style.width = "794px";
  element.style.maxWidth = "794px";
  element.style.overflow = "visible";

  const options = {
    margin: 0,
    filename: `${filename}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      scrollX: 0,
      scrollY: -window.scrollY,   // Fix capture offset from page scroll
      windowWidth: 794,            // Lock to A4 width — prevents text reflow
      width: 794,
      backgroundColor: "#ffffff",
    },
    jsPDF: {
      unit: "px",
      format: [794, 1123],         // Exact A4 at 96dpi
      orientation: "portrait",
      hotfixes: ["px_scaling"],
    },
  };

  await html2pdf().set(options).from(element).save();

  // Restore original styles
  element.style.cssText = originalStyle;
};

export default downloadResumePdf;