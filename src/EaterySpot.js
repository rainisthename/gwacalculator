import React, { useState, useEffect } from 'react';
import { Form, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap';
import firebaseConfig from './firebaseConfig';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/storage';
import 'firebase/firestore';

const EaterySpot = ({ locality }) => {
    firebase.initializeApp(firebaseConfig);
    const [localities, setLocalities] = useState([]);
    const [selectedLocality, setSelectedLocality] = useState('');
    const [touristSpots, setTouristSpots] = useState([]);
    const [selectedTouristSpot, setSelectedTouristSpot] = useState('');
    const [eateryName, setEateryName] = useState('');
    const [eateryAddress, setEateryAddress] = useState('');
    const [image, setImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
  
    useEffect(() => {
      const fetchLocalities = async () => {
        try {
          const localitiesSnapshot = await firebase.firestore()
            .collection('locality')
            .get();
          setLocalities(localitiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.log(error);
        }
      };
      fetchLocalities();
    }, []);
  
    useEffect(() => {
      if (!selectedLocality) {
        return;
      }
      const fetchTouristSpots = async () => {
        try {
          const touristSpotsSnapshot = await firebase.firestore()
            .collection('locality')
            .doc(selectedLocality)
            .collection('touristSpots')
            .get(); setTouristSpots(touristSpotsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.log(error);
        }
      };
      fetchTouristSpots();
    }, [selectedLocality]);
  
    const handleSubmit = async () => {
      try {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`images/${image.name}`);
        const uploadTask = imageRef.put(image);
  
        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          error => {
            console.log(error);
          },
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            await firebase.firestore()
              .collection('locality')
              .doc(selectedLocality)
              .collection('touristSpots')
              .doc(selectedTouristSpot)
              .update({
                Eatery: firebase.firestore.FieldValue.arrayUnion({eateryName, eateryImage: downloadURL, eateryAddress: eateryAddress})
              });
            setEateryName('');
            setEateryAddress('');
            setImage(null);
            setUploadProgress(0);
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    
    const handleChange = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }
    return (
      <Form>
        <FormGroup>
          <FormLabel>Select Locality</FormLabel>
          <FormControl as="select" value={selectedLocality} onChange={e => setSelectedLocality(e.target.value)}>
            <option value="">Select a Locality</option>
            {localities.map((locality, index) => (
              <option key={index} value={locality.id}>{locality.name}</option>
            ))}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel>Select Tourist Spot</FormLabel>
          <FormControl as="select" value={selectedTouristSpot} onChange={e => setSelectedTouristSpot(e.target.value)}>
            <option value="">Select </option>
    <option value="">Select a Tourist Spot</option>
            {touristSpots.map((touristSpot, index) => (
              <option key={index} value={touristSpot.id}>{touristSpot.touristSpotName}</option>
            ))}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormLabel>Eatery Name</FormLabel>
          <FormControl type="text" value={eateryName} onChange={e => setEateryName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Eatery Address</FormLabel>
          <FormControl type="text" value={eateryAddress} onChange={e => setEateryAddress(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Eatery Image</FormLabel>
          <FormControl type="file" onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Button variant="primary" onClick={handleSubmit}>
            Add Eatery
          </Button>
        </FormGroup>
      </Form>
    );
  };
export default EaterySpot;