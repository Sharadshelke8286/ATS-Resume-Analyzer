import { Document } from "@react-pdf/renderer";
import StandardPDF from "../pdf/StandardPDF";
import ModernPDF from "../pdf/ModernPDF";
import CompactPDF from "../pdf/CompactPDF";

export const ResumePDF = ({ data }) => {
  const template = data?.template || "standard";

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernPDF data={data} />;

      case "compact":
        return <CompactPDF data={data} />;

      case "standard":
      default:
        return <StandardPDF data={data} />;
    }
  };

  return <Document>{renderTemplate()}</Document>;
};