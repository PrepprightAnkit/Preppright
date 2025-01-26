import React from "react";
import { Gift, Smartphone, Laptop, Watch, DollarSign } from "lucide-react";
import theme from '../theme'; // Assuming the theme is imported similarly to the original component

const ReferAndWin = () => {
  const handleButtonClick = () => {
    window.open("https://forms.gle/XgCLQqcb1B8RZaax8", "_blank");
  };

  return (
    <div className="bg-gradient-to-br from-primary-light to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className={`text-3xl md:text-5xl font-bold text-center ${theme.typography.gradient} mb-6`}>
            Refer & Win Amazing Rewards
          </h2>
          <p className="text-center text-gray-600 text-xl mb-8">
            Invite your friends to join and unlock exclusive rewards like MacBooks,
            iPhones, Apple Watches, AirPods, and cash prizes. The more you refer,
            the more you win!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <button
                onClick={handleButtonClick}
                className={`bg-primary-main ${theme.components.button.base} ${theme.components.button.primary} hover:bg-${theme.colors.primary.hover} transition-all  text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-lg transition-transform transform hover:scale-105`}
              >
                Get Started
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {[
                { Icon: Laptop, label: "MacBook" },
                { Icon: Smartphone, label: "iPhone" },
                { Icon: Gift, label: "AirPods" },
                { Icon: Watch, label: "Apple Watch" },
                { Icon: DollarSign, label: "Cash Rewards" }
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center">
                  <Icon className="w-12 h-12 text-primary-main mb-2" />
                  <span className="text-primary-dark font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferAndWin;