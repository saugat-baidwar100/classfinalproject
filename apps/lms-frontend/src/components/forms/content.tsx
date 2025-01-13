import React, { useState } from 'react';
import { CgPlayButtonO } from 'react-icons/cg';
import { IoImagesOutline } from 'react-icons/io5';
import { TbArticle } from 'react-icons/tb';
import SlateEditor from './slate-editor';

const ContentSelector = () => {
  const [showEditor, setShowEditor] = useState(false); // Track if the editor should be shown

  const handleVideoClick = () => {
    const videoUploadElement = document.getElementById('video-upload');
    if (videoUploadElement) {
      videoUploadElement.click();
    }
  };

  const handleMediaClick = () => {
    const mediaUploadElement = document.getElementById('media-upload');
    if (mediaUploadElement) {
      mediaUploadElement.click();
    }
  };

  const handleArticleClick = () => {
    setShowEditor(true); // Show only the article editor
  };

  const handleGoBack = () => {
    setShowEditor(false); // Return to the main selection
  };

  return (
    <div
      className="mt-4 border border-gray-100 rounded-md bg-white p-4 shadow-sm"
      style={{
        width: '100%',
      }}
    >
      {showEditor ? (
        // Show the Slate editor with a "Go Back" button
        <div>
          <div className="flex justify-between items-center mb-4"></div>
          <SlateEditor goBack={handleGoBack} />
        </div>
      ) : (
        // Show the main selection options
        <>
          <p className="text-sm font-semibold mb-4 text-gray-700">
            Select the main type of content:
          </p>
          <div className="flex justify-between items-center">
            {/* Video Option */}
            <div
              className="text-center cursor-pointer"
              onClick={handleVideoClick}
            >
              <div className="bg-gray-100 rounded-full p-4 mb-2 flex justify-center items-center">
                <CgPlayButtonO className="text-custom-teal" size={24} />
              </div>
              <p className="text-sm font-medium text-gray-700">Video</p>
              {/* Hidden file input for video */}
              <input
                type="file"
                id="video-upload"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    alert(`Selected Video: ${e.target.files[0].name}`);
                  }
                }}
              />
            </div>

            {/* Media Option */}
            <div
              className="text-center cursor-pointer"
              onClick={handleMediaClick}
            >
              <div className="bg-gray-100 rounded-full p-4 mb-2 flex justify-center items-center">
                <IoImagesOutline className="text-custom-teal" size={24} />
              </div>
              <p className="text-sm font-medium text-gray-700">Media</p>
              {/* Hidden file input for media */}
              <input
                type="file"
                id="media-upload"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    alert(`Selected Media: ${e.target.files[0].name}`);
                  }
                }}
              />
            </div>

            {/* Article Option */}
            <div
              className="text-center cursor-pointer"
              onClick={handleArticleClick}
            >
              <div className="bg-gray-100 rounded-full p-4 mb-2 flex justify-center items-center">
                <TbArticle className="text-custom-teal" size={24} />
              </div>
              <p className="text-sm font-medium text-gray-700">Article</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentSelector;
