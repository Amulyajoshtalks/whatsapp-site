import { useEffect } from "react";
import HomePageForm from "./HomePageForm";

const HomePageFormModal = ({ open, onSubmitted }) => {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-3 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Required form"
      // Intentionally non-dismissible: no onClick-to-close, no close button.
    >
      <div className="w-full max-w-5xl max-h-[92dvh] overflow-y-auto">
        <HomePageForm
          embedded
          variant="modal"
          source="modal"
          onSubmitSuccess={onSubmitted}
        />
      </div>
    </div>
  );
};

export default HomePageFormModal;


