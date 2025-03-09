
// import React from "react";
// import { FaLock, FaLockOpen, FaQuestionCircle } from "react-icons/fa";

// export default function VaultStatus({ isSetup, isUnlocked }) {

//   let status = "Not Set Up";

//         mainText: "Vault Locked",
//         subText: "Unlock to access your passwords",
//         color: "bg-red-700",
//         textColor: "text-red-100",
//         progressWidth: "w-2/3",
//         progressColor: "bg-red-400"
//       };
//     } else {
//       return {
//         icon: <FaLockOpen />,
//         mainText: "Vault Unlocked",
//         subText: "Your passwords are accessible",
//         color: "bg-green-700",
//         textColor: "text-green-100",
//         progressWidth: "w-full",
//         progressColor: "bg-green-400"
//       };
//     }
//   };

//   const config = getStatusConfig();

//   return (
//     <div className={`rounded-lg ${config.color} p-2 shadow-lg flex items-center`}>
//       <div className={`p-2 rounded-full ${config.textColor} mr-3`}>
//         {config.icon}
//       </div>
//       <div className="mr-3">
//         <div className={`font-bold ${config.textColor}`}>{config.mainText}</div>
//         <div className={`text-xs ${config.textColor} opacity-90`}>{config.subText}</div>
//         <div className="w-32 bg-gray-800 rounded-full h-1.5 mt-1">
//           <div className={`${config.progressWidth} ${config.progressColor} h-1.5 rounded-full`}></div>
//         </div>
//       </div>
//     </div>
//   );
// }



// 3rd Version
import React, { useState, useEffect } from "react";
import { FaLock, FaLockOpen, FaShieldAlt, FaCog } from "react-icons/fa";

export default function VaultStatus({ isSetup, isUnlocked }) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Determine status configuration based on vault state
  const getStatusConfig = () => {
    if (!isSetup) {
      return {
        icon: <FaCog className={`${isAnimating ? 'animate-spin' : ''}`} />,
        mainText: "Setup Required",
        subText: "Your vault needs to be configured",
        color: "bg-yellow-600",
        textColor: "text-yellow-100",
        progressWidth: "w-1/3",
        progressColor: "bg-yellow-400"
      };
    } else if (isSetup && !isUnlocked) {
      return {
        icon: <FaLock className={`${isAnimating ? 'animate-bounce' : ''}`} />,
        mainText: "Vault Locked",
        subText: "Unlock to access your passwords",
        color: "bg-red-700",
        textColor: "text-red-100",
        progressWidth: "w-2/3",
        progressColor: "bg-red-400"
      };
    } else {
      return {
        icon: <FaLockOpen className={`${isAnimating ? 'animate-pulse' : ''}`} />,
        mainText: "Vault Unlocked",
        subText: "Your passwords are accessible",
        color: "bg-green-700",
        textColor: "text-green-100",
        progressWidth: "w-full",
        progressColor: "bg-green-400"
      };
    }
  };

  const config = getStatusConfig();

  useEffect(() => {
    console.log("VaultStatus component: isUnlocked =", isUnlocked);
  }, [isUnlocked]);



  return (
    <div 
// This down line is Newly Added 
key={`vault-status-${isUnlocked}-${isSetup}`}

      className={`rounded-lg ${config.color} p-2 shadow-lg flex items-center transform transition-transform duration-300 ${isAnimating ? 'scale-105' : ''}`}
    >
      <div className={`p-2 rounded-full ${config.textColor} mr-3`}>
        {config.icon}
      </div>
      <div className="mr-3">
        <div className={`font-bold ${config.textColor}`}>{config.mainText}</div>
        <div className={`text-xs ${config.textColor} opacity-90`}>{config.subText}</div>
        <div className="w-32 bg-gray-800 rounded-full h-1.5 mt-1 overflow-hidden">
          <div 
            className={`${config.progressWidth} ${config.progressColor} h-1.5 rounded-full transition-all duration-1000 ease-in-out`}
            style={{ 
              animation: isAnimating ? 'pulse 1s ease-in-out' : 'none'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}