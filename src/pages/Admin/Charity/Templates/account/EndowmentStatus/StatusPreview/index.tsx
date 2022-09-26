import useStatusPreview from "./useStatusPreview";

export default function StatusPreview() {
  const { isRenderPreview, isPreviewLoading, endowmentStatus } =
    useStatusPreview();

  return (
    (isRenderPreview && (
      <div className="text-sm uppercase bg-angel-blue/30 justify-self-start py-1 px-2 -mt-4 mb-6 ml-1 rounded-sm font-semibold font-mono text-angel-grey">
        {isPreviewLoading ? "loading.." : endowmentStatus || "not found"}
      </div>
    )) ||
    null
  );
}
