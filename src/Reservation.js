import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Reservation() {
    const [userId, setUserId] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [paymentOption, setPaymentOption] = useState(''); // New payment option state
    const [showPaymentOptions, setShowPaymentOptions] = useState(false); // Show/hide payment options modal
    const [paymentId, setPaymentId] = useState(null); // Track paymentId for polling
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    

    const slots = Array.from({ length: 8 }, (_, i) => i + 1);

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedSlot) {
            alert('Please select a slot to resfseerve.');
            return;
        }
        if (!userId) {
            alert('Please enter your User ID.');
            return;
        }
        setShowPaymentOptions(true); 
    };

    const reserveSlotAndGenerateQR = (data) => {
        console.log(JSON.stringify(data))
        // Step 1: Reserve the slot
        fetch('http://localhost:3000/reserve-slot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) throw new Error('Error reserving slot');
                return response.json();
            })
            .then(() => {
                // Step 2: Generate QR code for selected payment option
                return fetch('http://localhost:3000/generate-qrcode', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: data.userId,
                        slotNumber: data.slotNumber,
                        paymentMethod: paymentOption,
                        amount: 50,
                    }),
                });
            })
            .then((response) => {
                if (!response.ok) throw new Error('Error generating QR code');
                return response.json();
            })
            .then((qrData) => {
                setQrCode(qrData.qrCode);
                setPaymentId(1);
                setShowModal(true);
               
                const paymentDetails = {
                    userId,
                    slotNumber: selectedSlot,
                    paymentMethod : data?.paymentMethod,
                    amount: 50, // Use the correct amount based on your logic
                    paymentNumber: data?.paymentId, // Ensure this matches what your backend expects
                    email: 'user-email@example.com' // Pass the actual user email here
                };
                processPayment(paymentDetails);
               
            })
            .catch((error) => {
                console.error('Error:', error);
                setModalMessage('⚠️ Error processing reservation or generating QR code. Please try again later.');
                setShowModal(true);
            });
    };

    const confirmPayment = async (paymentDetails) => {
        try {
            const response = await fetch('http://localhost:3000/process-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentDetails),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                // Handle success
            } else {
                // Handle error
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
        }
    };

    const processPayment = async (paymentDetails) => {
        try {
            const response = await fetch('http://localhost:3000/process-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentDetails),
            });
            const data = await response.json();
            console.log(JSON.stringify(response))
            if (response.ok) {
                //pollPaymentStatus(paymentDetails?.paymentNumber);
                console.log('Payment processed successfully:', data);
            } else {
                console.error('Error processing payment:', data.message);
            }
        } catch (error) {
            console.error('Error in payment processing:', error);
        }
    };
    

    const pollPaymentStatus = (paymentId) => {
        if (!paymentId) return;
        const intervalId = setInterval(() => {
            fetch('http://localhost:3000/confirm-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, slotNumber: selectedSlot, paymentId })
            })
                .then((response) => response.json())
                .then((data) => {
                 
                    if (data.payment && data.payment.paymentStatus === 'Confirmed') {
                        setPaymentConfirmed(true);
                        clearInterval(intervalId); // Stop polling when confirmed

                      
                    }
                })
                .catch((error) => console.error('Polling error:', error));
        }, 2000); // Poll every 5 seconds
    };

    const handlePaymentOptionSelect = (option) => {
        setPaymentOption(option);
        setShowPaymentOptions(false);
        const data = { userId, slotNumber: selectedSlot, paymentMethod: option, paymentId : Math.random()   };
        reserveSlotAndGenerateQR(data);
    };

    const closeModal = () => setShowModal(false);
    const closePaymentOptions = () => setShowPaymentOptions(false);

    return (
        <div>
            {/* Header */}
            <header className="bg-dark text-white py-4 shadow">
                <div className="container">
                    <h1 className="mb-0"><i className="fas fa-parking"></i> Smart Parking Reservation</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="container my-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-center">Reserve Your Slot</h2>
                                <p className="text-center text-muted">Click on a parking slot to reserve</p>

                                {/* Parking Slots */}
                                <div className="d-flex justify-content-around mb-4">
                                    {slots.map((slot) => (
                                        <button
                                            key={slot}
                                            className={`btn btn-lg ${selectedSlot === slot ? 'btn-success' : 'btn-secondary'}`}
                                            onClick={() => handleSlotClick(slot)}
                                        >
                                            Slot {slot}
                                        </button>
                                    ))}
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="needs-validation">
                                    <div className="form-group mb-3">
                                        <label htmlFor="userId"><i className="fas fa-user"></i> User ID:</label>
                                        <input
                                            type="text"
                                            id="userId"
                                            name="userId"
                                            className="form-control"
                                            placeholder="Enter your User ID"
                                            required
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block">
                                        <i className="fas fa-check-circle"></i> Confirm Reservation
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Payment Options Modal */}
            {showPaymentOptions && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"><i className="fas fa-credit-card"></i> Select Payment Option</h5>
                                <button type="button" className="close" onClick={closePaymentOptions}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <button className="btn btn-primary m-2" onClick={() => handlePaymentOptionSelect('Paytm')}>Paytm</button>
                                <button className="btn btn-primary m-2" onClick={() => handlePaymentOptionSelect('Google Pay')}>Google Pay</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* QR Code Modal */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"><i className="fas fa-info-circle"></i> Confirmation</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                {qrCode ? (
                                    <>
                                        <img src={qrCode} alt="QR Code" />
                                        <p>Scan the QR code to complete the payment with {paymentOption}.</p>
                                    </>
                                ) : (
                                    <p>{modalMessage}</p>
                                )}
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-success" onClick={closeModal}>
                                    <i className="fas fa-check"></i> Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {paymentConfirmed && (
                <div className="alert alert-success">
                    Payment confirmed successfully!
                </div>
            )}
            {!paymentConfirmed && qrCode && (
                <div className="alert alert-warning">
                    Waiting for payment confirmation...
                </div>
            )}

            {/* Footer */}
            <footer className="bg-dark text-white py-3 mt-auto">
                <div className="container text-center">
                    <p className="mb-0">&copy; 2024 Smart Parking. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Reservation;
