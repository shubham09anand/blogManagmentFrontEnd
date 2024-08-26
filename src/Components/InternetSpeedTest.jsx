import React, { useEffect, useState } from 'react';
import { ReactInternetSpeedMeter } from "react-internet-meter";

function InternetSpeedTest() {
  const [speed, setSpeed] = useState("0.0");
  const [tested, setTested] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    // Event listeners for online and offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (

    display && (
      <div className='w-fit left-[40%] absolute mt-5'>
        {!isOnline ? (
          // Display when offline
          <>
            <div className="text-center">
              <img className='w-60 h-40' src="https://i.ibb.co/ck1SGFJ/Group.png" alt="No Internet" />
              <div className='fontTitle font-medium'>No Internet Connection</div>
            </div>
            <div className='relative'>
              <svg onClick={()=>setDisplay(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 top-0 absolute">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
          </>
        ) : (
          <div>
            <ReactInternetSpeedMeter
              txtSubHeading="Checking the speed"
              outputType="empty"
              customClassName={null}
              txtMainHeading="Oops..."
              pingInterval={10000}
              thresholdUnit="megabyte"
              threshold={1000}
              imageUrl="https://images.pexels.com/photos/3396664/pexels-photo-3396664.jpeg?cs=srgb&dl=pexels-josiah-farrow-3396664.jpg&fm=jpg"
              downloadSize="1781287"
              callbackFunctionOnNetworkDown={speed =>
                console.log(`Internet speed is down ${speed}`)
              }
              callbackFunctionOnNetworkTest={speed => {
                setSpeed(speed);
                setTested(true); // Mark as tested
              }}
            />

            {tested && parseFloat(speed) < 100 && (
              <>
                <div className='relative'>
                  <svg onClick={()=>setDisplay(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 top-0 absolute">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="text-center">
                  <img className='w-60 h-40' src="https://i.ibb.co/ck1SGFJ/Group.png" alt="Slow Internet" />
                  <div className='fontTitle font-medium select-none'>Slow Internet Speed</div>
                </div>
                <div className='text-center font-medium select-none'>
                  {tested ? `Current Speed: ${speed} mb` : "Testing speed..."}
                </div>
              </>
            )}

          </div>
        )}
      </div>
    )

  );
}

export default InternetSpeedTest;
