import { useState } from 'react';

export default function RecordButton({ onStart, onStop }) {
  const [isRecording, setIsRecording] = useState(false);

  const handleClick = () => {
    if (isRecording) {
      onStop();
    } else {
      onStart();
    }
    setIsRecording(!isRecording);
  };

  return (
    
    <button
      onClick={handleClick}
      className={`w-[50%] h-[50%] m-1 rounded-full flex items-center cursor-pointer justify-center 
                  ${isRecording ? 'bg-[red]' : 'bg-[black] border-none '} 
                  transition-all duration-300 shadow-md `}
    >
      {isRecording && (
        <div className="w-6 h-6 bg-white rounded-sm transition-all duration-300" />
      )}
    </button>
  );
}
