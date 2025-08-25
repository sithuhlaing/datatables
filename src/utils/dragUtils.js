
export const getDragPreview = (element) => {
  // Create a custom drag preview
  const preview = element.cloneNode(true);
  preview.style.transform = 'rotate(2deg)';
  preview.style.opacity = '0.8';
  preview.style.backgroundColor = '#f8f9fa';
  preview.style.border = '2px solid #007bff';
  preview.style.borderRadius = '4px';
  return preview;
};

export const isValidDropTarget = (dragIndex, hoverIndex, columnsLength) => {
  return (
    dragIndex !== hoverIndex &&
    dragIndex >= 0 &&
    hoverIndex >= 0 &&
    dragIndex < columnsLength &&
    hoverIndex < columnsLength
  );
};

export const getDropPosition = (e, element) => {
  const rect = element.getBoundingClientRect();
  const midpoint = rect.left + rect.width / 2;
  return e.clientX < midpoint ? 'before' : 'after';
};
