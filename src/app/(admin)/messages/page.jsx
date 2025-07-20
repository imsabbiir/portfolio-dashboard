"use client";
import React, { useEffect, useState } from "react";
import { Scrollbar } from "smooth-scrollbar-react";

function page() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState();

  // Fetch messages sorted by createdAt
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/messages");
        const data = await response.json();
        // Messages should come sorted by createdAt descending and with proper read flag from DB
        setMessages(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Handle selecting a message and mark it as read
  const handleSelectedMessage = async (_id) => {
    try {
      // Call backend to mark message as read
      const res = await fetch(`/api/messages/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      if (!res.ok) {
        throw new Error("Failed to update message read status");
      }

      const updatedMessage = await res.json();

      // Update local messages state with the updated message
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      );

      // Show details panel for selected message
      setSelectedMessage(updatedMessage);
    } catch (error) {
      console.error(error);
      // Optionally show error alert here
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-6 gap-10 overflow-hidden">
      <div className="col-span-2 flex flex-col gap-5 overflow-auto">
        <Scrollbar
          className="hide-scrollbar flex flex-col gap-3"
          plugins={{ overscroll: { effect: "bounce" } }}
          damping={0.05}
          thumbMaxSize={20}
          renderByPixels={true}
          alwaysShowTracks={false}
          continuousScrolling={true}
        >
          {messages?.map((message) => {
            return (
              <div
                className="relative px-5 py-2 gradientBg rounded flex items-center gap-5 cursor-pointer"
                key={message._id}
                onClick={() => handleSelectedMessage(message._id)}
              >
                {/* New Badge */}
                {!message.read && (
                  <span className="absolute top-1 right-2 bg-yellow-400 text-[#20202a] text-xs px-2 py-0.5 rounded-full font-bold">
                    NEW
                  </span>
                )}

                <div className="w-10 h-10 rounded-full activeBg flex justify-center items-center text-lg font-semibold uppercase swapText">
                  {message?.name?.slice(0, 2)}
                </div>
                <div className="h-fit mt-2 box-border">
                  <h3 className="titleText text-lg font-thin leading-2">
                    {message?.name}
                  </h3>
                  <span className="subTitleText text-xs">{message?.email}</span>
                </div>
              </div>
            );
          })}
        </Scrollbar>
      </div>

      {/* Right Panel */}
      <div className="col-span-3 p-10 rounded gradientBg">
        {selectedMessage ? (
          <div className="text-white space-y-2">
            <div className="flex gap-3 items-center">
              <h2>Name:</h2>
              <h2 className="text-xl font-semibold">{selectedMessage.name}</h2>
            </div>
            <div className="flex gap-3 items-center">
              <h2>Email:</h2>
              <p className="text-sm text-gray-300">{selectedMessage.email}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedMessage.email);
                  alert("Email copied to clipboard!");
                }}
                className="text-xs bg-yellow-400 text-black px-2 py-1 rounded cursor-pointer hover:bg-yellow-300 transition"
              >
                Copy
              </button>
            </div>
            <div className="flex gap-3 items-center">
              <h2>Service Type:</h2>
              <p className="text-base">{selectedMessage.service}</p>
            </div>
            <div className="flex gap-3 items-center">
              <h2>Package Type:</h2>
              <p className="text-base">{selectedMessage.package}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Click a message to view details.</p>
        )}
      </div>
    </div>
  );
}

export default page;
