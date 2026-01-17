import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc,
    query,
    orderBy,
    Timestamp 
  } from 'firebase/firestore';
  import { db } from './config';
  
  // Activities Collection
  export const addActivity = async (activityData) => {
    try {
      const docRef = await addDoc(collection(db, 'activities'), {
        ...activityData,
        createdAt: Timestamp.now()
      });
      return { id: docRef.id, ...activityData };
    } catch (error) {
      console.error("Error adding activity: ", error);
      throw error;
    }
  };
  
  export const getActivities = async () => {
    try {
      const q = query(collection(db, 'activities'), orderBy('date', 'asc'));
      const querySnapshot = await getDocs(q);
      const activities = [];
      querySnapshot.forEach((doc) => {
        activities.push({ id: doc.id, ...doc.data() });
      });
      return activities;
    } catch (error) {
      console.error("Error getting activities: ", error);
      throw error;
    }
  };
  
  export const updateActivity = async (id, updatedData) => {
    try {
      const activityRef = doc(db, 'activities', id);
      await updateDoc(activityRef, updatedData);
    } catch (error) {
      console.error("Error updating activity: ", error);
      throw error;
    }
  };
  
  export const deleteActivity = async (id) => {
    try {
      await deleteDoc(doc(db, 'activities', id));
    } catch (error) {
      console.error("Error deleting activity: ", error);
      throw error;
    }
  };
  
  // Registrations Collection
  export const addRegistration = async (registrationData) => {
    try {
      const docRef = await addDoc(collection(db, 'registrations'), {
        ...registrationData,
        registeredAt: Timestamp.now()
      });
      return { id: docRef.id, ...registrationData };
    } catch (error) {
      console.error("Error adding registration: ", error);
      throw error;
    }
  };
  
  export const getRegistrations = async () => {
    try {
      const q = query(collection(db, 'registrations'), orderBy('registeredAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const registrations = [];
      querySnapshot.forEach((doc) => {
        registrations.push({ id: doc.id, ...doc.data() });
      });
      return registrations;
    } catch (error) {
      console.error("Error getting registrations: ", error);
      throw error;
    }
  };