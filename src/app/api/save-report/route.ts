import { NextRequest, NextResponse } from 'next/server';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8vnVSghQlPiI7Re17-RaFLik2x4jUfuE",
  authDomain: "water-monitoring-e2997.firebaseapp.com",
  databaseURL: "https://water-monitoring-e2997-default-rtdb.firebaseio.com",
  projectId: "water-monitoring-e2997",
  storageBucket: "water-monitoring-e2997.firebasestorage.app",
  messagingSenderId: "208153402903",
  appId: "1:208153402903:web:159c34315514f08ad7c652",
  measurementId: "G-V684M82BNJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function POST(request: NextRequest) {
  try {
    const reportData = await request.json();

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'waterReports'), {
      ...reportData,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        status: true,
        message: "Report saved successfully",
        reportId: docRef.id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving report:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Error saving report to database"
      },
      { status: 500 }
    );
  }
}
