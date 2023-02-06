import React, { useState,useEffect } from 'react';
import firebaseConfig from './firebaseConfig';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';
import 'firebase/storage';
import Dropzone from 'react-dropzone';
import './LocalSpots.css'

import { Form, Input, Button, Upload, message, Spin } from 'antd';

const LocalSpots = () => {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const [name, setName] = useState('');
  const [locality, setLocality] = useState('');
  const [nameError, setNameError] = useState('');
  const [localityError, setLocalityError] = useState('');
  const [documents, setDocuments] = useState([]);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the input fields
    let hasError = false;
    if (!name) {
      setNameError('Please enter a name for the document.');
      hasError = true;
    }
    if (!locality) {
      setLocalityError('Please enter a locality for the document.');
      hasError = true;
    }
    if (!image) {
      setImageError('Please select an image for the document.');
      hasError = true;
    }
    if (hasError) {
      return;
    }

    // Convert the File object to a Base64-encoded string
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const encodedImage = reader.result;

      // Create the document in Firebase
      firebase.firestore().collection('locality').add({
        name,
        locality,
        image: encodedImage,
      });

      // Clear the input fields and error messages
      setName('');
      setLocality('');
      setNameError('');
      setLocalityError('');
      setImage(null);
    }
  }

  useEffect(() => {
    db.collection('locality')
      .get()
      .then(snapshot => {
        const docs = [];
        snapshot.forEach(doc => {
          docs.push({ id: doc.id, data: doc.data() });
        });
        setDocuments(docs);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }, []);

  const handleImageDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }
  
  return (
    <div className='form-header'>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          {nameError && <span>{nameError}</span>}
        </label>
        <label>
          Locality:
          <input
            type="text"
            value={locality}
            onChange={event => setLocality(event.target.value)}
          />
          {localityError && <span>{localityError}</span>}
        </label>
        <Dropzone onDrop={handleImageDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                  Drag and drop an image or click to select a file
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        {image && <img src={image.preview} alt={image.name} />}
        <button type="submit">Create Document</button>
      </form>
      <div>
        {documents.map(doc => (
          <div key={doc.id}>
            <h1>{doc.data.name}</h1>
            {doc.data.image && <img src={doc.data.image} alt={doc.data.name} />}
          </div>
        ))}
      </div>
    </div>
  );
  };

export default LocalSpots