import React from "react";

type StepType = {
  label: string;
  time: string;
  icon: string;
  completed: boolean;
};

const ProgressTracker = ({ steps }: { steps: StepType[] }) => {
  return (
    <div className="flex items-center justify-center gap-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {/* Step Icon and Label */}
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${
                step.completed
                  ? "bg-gold-300 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              <span className="text-xl">{step.icon}</span>
            </div>
            <p className="mt-2 text-sm text-center">{step.label}</p>
            {step.time && <p className="text-xs text-gray-600">{step.time}</p>}
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-12 ${
                steps[index + 1].completed ? "bg-gold-300" : "bg-gray-300"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;
