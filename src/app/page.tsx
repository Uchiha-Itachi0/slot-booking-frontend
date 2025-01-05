'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import formatTime from "@/utils/formatDate";

type Slot = {
  start: number;
  end: number;
  booked: boolean;
};

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async (date: string) => {
    try {
      const response = await axios.get(`/api/slots?date=${date}`);
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handleBooking = async (slot: Slot) => {
    try {
      const response = await axios.post('/api/book-slot', { date: selectedDate, slot });
      if (response.data.success) {
        fetchAvailableSlots(selectedDate);
        alert('Slot booked successfully');
      }
    } catch (error) {
      console.error('Error booking slot:', error);
      alert('Failed to book slot. Please try again');
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
      <div className="container mx-auto w-[50vw] shadow-2xl rounded-2xl mt-20 p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Slot Booking</h1>

        <div className="mb-10 p-4 w-1/2 flex items-center justify-between gap-4 border rounded-2xl">
        <p className="text-lg mb-0">Select Date</p>
        <input
            type="date"
            id="date"
            min={getTodayDate()}
            onChange={handleDateChange}
            className="p-2 border border-gray-300 rounded"
        />
      </div>


  {selectedDate && (
            <div>
              <h2 className="text-2xl mb-4">Available Slots for {format(new Date(selectedDate), 'MMMM dd, yyyy')}</h2>
              <div className="grid grid-cols-2 gap-4">
                {availableSlots.length === 0 ? (
                    <p>No available slots</p>
                ) : (
                    availableSlots.map((slot, index) => (
                        <div
                            key={index}
                            className={`${slot.booked ? 'line-through cursor-not-allowed bg-gray-200' : 'cursor-pointer bg-gray-100 hover:bg-gray-300'} p-4 rounded shadow-md`}
                            {...(!slot.booked && {onClick : () => handleBooking(slot)})}
                        >
                          <p className="text-lg">
                            {formatTime(slot.start)} - {formatTime(slot.end)}
                          </p>
                        </div>
                    ))
                )}
              </div>
            </div>
        )}
      </div>
  );
};

export default Home;
