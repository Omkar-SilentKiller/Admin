import React, { useState, useEffect } from 'react';
import './admin_panel.css';

export default function AdminPanel() {
    const [activeSection, setActiveSection] = useState('');
    const [activeDesignSection, setActiveDesignSection] = useState('');
    const [categories, setCategories] = useState(['Category 1', 'Category 2', 'Category 3']);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    // New state variables
    const [newTableName, setNewTableName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (selectedCategory && activeDesignSection !== '') {
            fetchImagesForCategory(selectedCategory);
        }
    }, [selectedCategory]);

    const fetchImagesForCategory = (category) => {
        console.log(`Fetching images for category "${category}"...`);
        const fetchedImages = [
            { id: 'image1', url: 'https://example.com/image1.jpg' },
            { id: 'image2', url: 'https://example.com/image2.jpg' },
        ];
        setImages(fetchedImages);
    };

    const handleAddTable = () => {
        if (newTableName) {
            setCategories([...categories, newTableName]);
            setNewTableName(''); // Clear the input after adding
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            console.log('Uploading file:', selectedFile);
            // Logic to upload the file to the server
            setSelectedFile(null); // Clear the file input after uploading
        }
    };

    const handleDeleteImage = () => {
        if (selectedImage) {
            console.log(`Deleting image with ID "${selectedImage}"...`);
            setImages(images.filter(image => image.id !== selectedImage));
            setSelectedImage(null);
        } else {
            console.log('Please select an image to delete.');
        }
    };

    const handleUpdateImage = () => {
        if (selectedImage && selectedFile) {
            console.log(`Replacing image with ID "${selectedImage}" with new image:`, selectedFile);
            // Logic to replace the image on the server
            setSelectedFile(null);
            setSelectedImage(null);
            // Optionally, you might want to refresh the images list after updating
            fetchImagesForCategory(selectedCategory);
        } else {
            console.log('Please select an image and a file to upload.');
        }
    };

    return (
        <div className='admin-container'>
            <div className='admin-Logo'>
                <p>Steam Work</p>
                <div className='p'>Software</div>
            </div>
            <div className='content'>
                <div className='selection-section'>
                    <a onClick={() => setActiveSection('client')}>Client Details</a>
                    <a onClick={() => setActiveSection('design')}>Designs</a>
                </div>

                {activeSection === 'client' && (
                    <div className='client-section'>
                        <p>Client Details Section</p>
                    </div>
                )}

                {activeSection === 'design' && (
                    <div className='Design-section'>
                        <div className='sec-btn'>
                            <a onClick={() => setActiveDesignSection('upload')}>Upload</a>
                            <a onClick={() => setActiveDesignSection('delete')}>Delete</a>
                            <a onClick={() => setActiveDesignSection('update')}>Update</a>
                        </div>

                        {activeDesignSection === 'upload' && (
                            <div className='upload-section'>
                                <p>Upload Section</p>

                                <div className='dropdown'>
                                     {/* Outer box */}
                                    <select     
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        {/* inner content */}
                                        <option value=''>Select Category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                        <option value='create-table'>Create New Table</option>
                                    </select>
                                </div>

                                {selectedCategory === 'create-table' && (
                                    <div className='new-table-section'>
                                        <input
                                            type='text'
                                            value={newTableName}
                                            placeholder='Enter new table name'
                                            onChange={(e) => setNewTableName(e.target.value)}
                                        />
                                        <button onClick={handleAddTable}>Create Table</button>
                                    </div>
                                )}

                                {/* Upload Image Section */}
                                <div className='upload-image-section'>
                                    <input
                                        type='file'
                                        onChange={handleFileChange}
                                    />
                                    <button onClick={handleUpload}>Upload Image</button>
                                </div>
                            </div>
                        )}

                        {activeDesignSection === 'delete' && (
                            <div className='delete-section'>
                                <p>Delete Section</p>

                                <div className='dropdown'>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value=''>Select Category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {selectedCategory && images.length > 0 && (
                                    <div className='image-selection'>
                                        <p>Select an image to delete:</p>
                                        {images.map((image) => (
                                            <div key={image.id} className='image-item'>
                                                <img
                                                    src={image.url}
                                                    alt={image.id}
                                                    onClick={() => setSelectedImage(image.id)}
                                                    className={selectedImage === image.id ? 'selected' : ''}
                                                />
                                            </div>
                                        ))}
                                        <button onClick={handleDeleteImage}>Delete Selected Image</button>
                                    </div>
                                )}

                                {selectedCategory && images.length === 0 && (
                                    <p>No images found for this category.</p>
                                )}
                            </div>
                        )}

                        {activeDesignSection === 'update' && (
                            <div className='update-section'>
                                <p>Update Section</p>

                                <div className='dropdown'>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value=''>Select Category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {selectedCategory && images.length > 0 && (
                                    <div className='image-selection'>
                                        <p>Select an image to replace:</p>
                                        {images.map((image) => (
                                            <div key={image.id} className='image-item'>
                                                <img
                                                    src={image.url}
                                                    alt={image.id}
                                                    onClick={() => setSelectedImage(image.id)}
                                                    className={selectedImage === image.id ? 'selected' : ''}
                                                />
                                            </div>
                                        ))}
                                        <div className='upload-image-section'>
                                            <input
                                                type='file'
                                                onChange={handleFileChange}
                                            />
                                            <button onClick={handleUpdateImage}>Replace Image</button>
                                        </div>
                                    </div>
                                )}

                                {selectedCategory && images.length === 0 && (
                                    <p>No images found for this category.</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
