import React, { useState, useEffect, useMemo } from 'react';
import firebaseConfig from './firebaseConfig';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/storage';
import 'firebase/firestore';
import './touristSpots.css'
import { useCollection } from 'react-firebase-hooks/firestore';
import Dropzone from 'react-dropzone';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Spinner from 'react-bootstrap/Spinner';
import { TagsInput } from "react-tag-input-component";
import { GeoPoint } from 'firebase/firestore';


const TouristSpots = () => {
  firebase.initializeApp(firebaseConfig);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [value, setValue] = useState('');
  const [information, setInformation] = useState('');
  const [address, setAddress] = useState('');
  const [open, setOpen] = useState('');
  const [number, setNumber] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [admissionFee, setAdmissionFee] = useState('');
  const [locale, setLocale] = useState('');
  const [recommended, setRecommendations] = useState(false)
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  const [coordinates, setCoordinates] = useState([])

  

  ///
  const [encodedImage, setEncodedImage] = useState('');
  const [firebaseError, setFirebaseError] = useState(null);

  const [documents, documentsLoading, documentsError] = useCollection(
    firebase
      .firestore()
      .collection('locality')
      .orderBy('name'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );



  const handleSubmit = useMemo(
    () => event => {
      event.preventDefault();
  
      // Create a new GeoPoint object with the latitude and longitude coordinates
      const geoPoint = new GeoPoint(parseFloat(latitude), parseFloat(longitude));
  
      // Create a reference to the child collection for the selected parent document
      const childCollection = firebase
        .firestore()
        .collection('locality')
        .doc(selectedDocument.id)
        .collection('touristSpots');
  
      // Add a new child document to the selected parent document
      childCollection
        .add({
          touristSpotName: value,
          information: information,
          image: encodedImage,
          address: address,
          number: number,
          facilities: facilities,
          activities: activities,
          admissionFee: admissionFee,
          locale: locale,
          isRecommendation: recommended,
          latitude: geoPoint
        })
        .then(() => {
          setValue('');
          setInformation('');
          setActivities([]);
          setAddress('');
          setAdmissionFee('');
          setLocale('');
          setFacilities([]);
          setNumber('');
          setOpen('');
          setRecommendations('');
          setEncodedImage('');
          setFirebaseError(null);
          setLatitude('');
          setLongitude('');
        })
        .catch(error => {
          setFirebaseError(error.message);
        });
    },
    [    selectedDocument,    value,    information,    encodedImage,    address,    activities,    facilities,    number,    admissionFee,    locale,    recommended,    latitude,    longitude  ]
  );

  
  const handleDrop = useMemo(
    () => acceptedFiles => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result;
        setEncodedImage(binaryStr);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const documentArray = documents ? documents.docs : [];

  if (documentsLoading) {
    <div className='justify-center'>
      <Spinner animation="border" />
      </div>
  }

  if (documentsError) {
    return <p>Error: {documentsError.message}</p>;
  }

  
  

  return (
    <Form className='mx-[30%] my-9' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter the Tourist Spot Name" value={value}
      onChange={event => {
        setValue(event.target.value);
      }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicInformation">
      <Form.Label>Information</Form.Label>

      <FloatingLabel controlId="floatingTextarea2">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }} value={information}
          onChange={event => {
            setInformation(event.target.value);
          }}
        />
      </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicInformation">
      <Form.Label>Where?</Form.Label>
      <Form.Select  value={selectedDocument ? selectedDocument.id : ''}
      onChange={event => {
        setSelectedDocument(
          documentArray.find(document => document.id === event.target.value)
        );
      }}>
        <option>Choose Locale</option>
        {documentArray.map(document => (
        <option key={document.id} value={document.id}>
          {document.data().name}
        </option>
      ))}
      </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Locality</Form.Label>
        <Form.Control type="text" placeholder="Enter Locality" value={locale}
      onChange={event => {
        setLocale(event.target.value);
       }}  required/>
      </Form.Group>

      

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Contact Number</Form.Label>
        <Form.Control type="number" placeholder="Enter Phone Number" value={number}
      onChange={event => {
        setNumber(event.target.value);
      }}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter Address" value={address}
      onChange={event => {
        setAddress(event.target.value);
       }}  required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Recommended?</Form.Label>
        <Form.Control as="select" value={recommended} onChange={(e) => setRecommendations(JSON.parse(e.target.value))} required>
            <option value={true}>True</option>
            <option value={false}>False</option>
        </Form.Control>
      </Form.Group>

      
  
    
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Open Hours</Form.Label>
        <Form.Control type="text" placeholder="Enter Open Hours" value={open}
      onChange={event => {
        setOpen(event.target.value);
      }}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Admission Fee</Form.Label>
        <Form.Control type="text" placeholder="Enter Admission Fee" value={admissionFee}
      onChange={event => {
        setAdmissionFee(event.target.value);
      }}/>
      </Form.Group>

      <Form.Group>
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          type="number"
          step="0.000001"
          placeholder="Enter latitude"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="number"
          step="0.000001"
          placeholder="Enter longitude"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Facilities</Form.Label>
        <TagsInput
        value={facilities}
        onChange= {setFacilities}
        name="Facilities"
      />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Activities</Form.Label>
        <TagsInput
        value={activities}
        onChange= {setActivities}
        name="Activities"
      />

      </Form.Group>

    <div className='border-2 p-2 mb-2'>
      <Dropzone onDrop={handleDrop}>
       {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input  {...getInputProps()} />
          Choose file
        </div>
      )}
      
    </Dropzone>
    </div>

    


      <Button variant="primary" type="submit" color='maroon'>
        Submit
      </Button>
    </Form>
  );
};

export default TouristSpots;


