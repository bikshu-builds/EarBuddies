import { useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ onEmojiClick, onClose, show }) => {
  const pickerRef = useRef(null);

  // Handle clicks outside picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (show) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      ref={pickerRef}
      className="absolute bottom-12 left-0 z-50 bg-gray-800 rounded-lg shadow-lg"
    >
      <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
    </div>
  );
};

export default EmojiPickerPopup;
