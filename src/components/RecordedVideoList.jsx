import { useEffect, useState } from 'react';

const RecordedVideosList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem('recordedVideos')) || [];
    setVideos(storedVideos);
  }, []);

  const handleView = (blobUrl) => {
    const videoWindow = window.open();
    if (videoWindow) {
      videoWindow.document.write(`
        <video controls autoplay style="width:100%">
          <source src="${blobUrl}" type="video/webm">
          Your browser does not support the video tag.
        </video>
      `);
    }
  };

  const handleDownload = (blobUrl, index) => {
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `recorded_video_${index + 1}.webm`;
    a.click();
  };

  return (
    <div className="p-4 space-y-4 flex-1 ml-[15px] bg-[#0000] RecordVdWr ">
      <h2 className="text-[1.3rem] font-bold p-3 w-[80%] text-center mb-[20px] text-[#ffff] font-[Poppins] max-[768px]:w-[100%]">Recorded Videos</h2>
      {videos.length === 0 ? (
        <p className="text-[#ffff] w-[100%] text-center font-[Poppins] text-[1.1rem] mt-[10px]">No videos recorded yet.</p>
      ) : (
        <ul className="space-y-3 max-[768px]:pl-[0px]">
          {videos.map((video, index) => (
            <li
              key={index}
              className="bg-gray-100  rounded-lg shadow flex items-center  mb-[15px] glass-effect w-[70%] h-[10rem] flex justify-center items-center rounded-[15px] max-[768px]:w-[100%]"
            >
              {/* <video src={video} controls className="w- rounded" />
               */}
               <video
                    src={video}
                    className="w-[200px] h-[120px] object-cover rounded-[15px] overflow-hidden max-[768px]:ml-[5px]"
                    preload="metadata"
                    onClick={() => handleView(video)}
                    />
              <div className="space-x-2 flex justify-between ml-[25px] max-[768px]:ml-[10px] mr-[10px]">
                <button
                  onClick={() => handleView(video)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-[5rem] mr-[10px] h-[2rem] rounded-[25px] border-none cursor-pointer max-[768px]:text-[.7rem] !w-[3.5rem]"
                >
                  View
                </button>
                <button
                  onClick={() => handleDownload(video, index)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-[5rem] h-[2rem] rounded-[25px] border-none cursor-pointer max-[768px]:text-[.7rem] !w-[3.5rem]"
                >
                  Download
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecordedVideosList;
