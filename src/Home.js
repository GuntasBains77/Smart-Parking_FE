import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
    const [entry, setEntry] = useState(null);
    const [error, setError] = useState(null);
    const [qrCode, setQrCode] = useState('');
    // const [notification, setNotification] = useState(null);
    // const [notification, setNotification] = useState(null);
    const [exit, setExit] = useState(null);

    const fetchEntry = async () => {
        try {
            const response = await fetch('http://localhost:8080/system/notification');
            console.log(response.body);
            if (!response.ok) {
                throw new Error('Failed to fetch entry');
            }
            const data = await response.json();
            if(data.entry){
                setEntry(data.entry);
                setTimeout(() => {
                    setEntry(null);
                }, 10000);

            }
            else if(data.exit){

                setQrCode(data.exit.qrCode);
                setExit(data.exit);
                setTimeout(() => {
                    setExit(null);
                }, 20000);

            }
    
            
            //setEntry(data);

            // Show notification with entry details
            //setEntry(data.entry);

            // Hide notification after 5 seconds
            // setTimeout(() => {
            //     setEntry(null);
            // }, 8000);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        // Fetch entry when component mounts
        fetchEntry();

        // Set up polling to check for new entries every 3 seconds
        const intervalId = setInterval(() => {
            fetchEntry();
        }, 8000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div 
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/20945486.jpg)`,
                backgroundSize: 'cover', // Ensures image covers full screen
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',  // Full height of the viewport
                position: 'relative',
                margin: 0,  // Remove any margin that may cause white spaces
                padding: 0,  // Remove any padding that may cause white spaces
                width: '100%',  // Ensure full width
            }}
        >

{/* Notification Box */}
{entry && (
    <div className="fixed top-5 right-5 max-w-sm bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 text-white shadow-2xl rounded-2xl overflow-hidden p-6 z-50 transform transition-transform duration-300 ease-in-out opacity-100">
        <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-700 shadow-md mr-4">
                <i className="fas fa-bell fa-lg"></i>
            </div>
            <div>
                <h5 className="text-xl font-semibold">New User Information</h5>
                <p className="text-sm text-gray-200">You've received new user details</p>
            </div>
        </div>

        <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-4 space-y-2 text-gray-100">
            <p className="font-medium"><strong>ID:</strong> <span>{entry.id}</span></p>
            <p className="font-medium"><strong>Name:</strong> <span>{entry.name}</span></p>
            <p className="font-medium"><strong>Phone:</strong> <span>{entry.phone}</span></p>
            <p className="font-medium"><strong>Vehicle Type:</strong> <span>{entry.vehicle_type}</span></p>
            <p className="font-medium"><strong>Vehicle ID:</strong> <span>{entry.vehicle_id}</span></p>
        </div>

        <div className="text-center">
            <button className="bg-white text-indigo-700 px-5 py-2 rounded-lg shadow-lg hover:bg-indigo-700 hover:text-white focus:outline-none transition duration-300 transform hover:scale-105 hover:shadow-xl">
                View Details
            </button>
        </div>
    </div>
)}

{/* Notification Box */}
{exit && (
    <div className="fixed top-5 right-5 max-w-sm bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 text-white shadow-2xl rounded-2xl overflow-hidden p-6 z-50 transform transition-transform duration-300 ease-in-out opacity-100">
        <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-700 shadow-md mr-4">
                <i className="fas fa-bell fa-lg"></i>
            </div>
            <div>
                <h5 className="text-xl font-semibold">New User Information</h5>
                <p className="text-sm text-gray-200">You've received new user details</p>
            </div>
        </div>

        <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-4 space-y-2 text-gray-100">
            <p className="font-medium"><strong>Duration:</strong> <span>{exit.duration}</span></p>
            <p className="font-medium"><strong>Charges:</strong> <span>{exit.charges}</span></p>
            <p className="font-medium"><strong>QR Code:</strong> <span>{exit.qrcode}</span></p>
            <div className="modal-body text-center">
            {qrCode ? (
                <>
                    <img src={qrCode} alt="QR Code" />
                    <p>Scan the QR code to complete the payment</p>
                </>
            ) : (
                <p>QR CODE IMAGE</p>
            )}
            </div>
            </div>

        <div className="text-center">
            <button className="bg-white text-indigo-700 px-5 py-2 rounded-lg shadow-lg hover:bg-indigo-700 hover:text-white focus:outline-none transition duration-300 transform hover:scale-105 hover:shadow-xl">
                View Details
            </button>
        </div>
    </div>
)}


            {/* Hero Section with Stylish Background */}
            <div 
                className="jumbotron hero-section text-white text-center py-5" 
                style={{
                    position: 'relative', // Ensure it's above the background
                    zIndex: 2
                }}
            >
                <div className="overlay" style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)', zIndex: 1
                }}></div>
                <div className="container position-relative z-2">
                    <h1 className="display-4 font-weight-bold text-shadow">Welcome to Smart Parking</h1>
                    <p className="lead text-shadow">Effortlessly find and reserve parking spaces with just a few clicks!</p>
                    <Link to="/reservation" className="btn btn-info btn-sm mt-2">Reserve a Slot Now</Link>
                </div>
            </div>

            {/* Feature Section */}
            <div className="container my-5">
                <h2 className="text-center mb-4">Why Use Smart Parking?</h2>
                <div className="row">
                    {/* Feature 1 (Easy Reservations) */}
                    <div className="col-md-4">
                        <div className="card shadow-sm border-light h-100">
                            <div className="card-body text-center">
                                <i className="fas fa-car fa-3x mb-3 text-primary"></i>
                                <h5 className="card-title">Easy Reservation</h5>
                                <p className="card-text">Book your parking spot in advance and save time.</p>
                                <Link to="/reservation" className="btn btn-info btn-sm mt-2">Reserve Now</Link>
                            </div>
                        </div>
                    </div>

                  {/* Feature 2 (24/7 Availability) */}
<div className="col-md-4">
    <div className="card shadow-sm border-light h-100">
        <div className="card-body text-center">
            <i className="fas fa-clock fa-3x mb-3 text-success"></i>
            <h5 className="card-title">24/7 Availability</h5>
            <p className="card-text">Parking spots available round the clock with instant confirmations.</p>
            {/* Link to WhyChooseUs page */}
            <Link to="/why-choose-us" className="btn btn-success btn-sm mt-3">Learn More</Link>
        </div>
    </div>
</div>

                    {/* Feature 3 (Customer Feedback) */}
                    <div className="col-md-4">
                        <div className="card shadow-sm border-light h-100">
                            <div className="card-body text-center">
                                <i className="fas fa-comments fa-3x mb-3 text-info"></i>
                                <h5 className="card-title">Customer Feedback</h5>
                                <p className="card-text">We value your feedback. Let us know how we can improve.</p>
                                <Link to="/feedback" className="btn btn-info btn-sm mt-2">Submit Feedback</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-dark text-white py-5">
                <div className="container text-center">
                    <h2>Get Started Today</h2>
                    <p className="lead">Reserve your parking spot and save time on your next trip!</p>
                    <Link to="/reservation" className="btn btn-warning btn-lg">Reserve Now</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
