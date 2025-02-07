import React from "react";

const MobileStepProgress = ({ activeStep, steps }) => {
    const currentStep = steps.find((s) => s.id === activeStep);
    return (
        <div className="block sm:hidden mb-4 text-center">
            {/* Only show the current step number in a circle */}
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-300 font-medium text-gray-800 group-focus:bg-gray-200 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:text-white">
                {activeStep}
            </div>
            {/* Display current step title */}
            <div className="text-lg font-bold text-primary mt-2">
                Step {activeStep} of {steps.length}: {currentStep?.title}
            </div>
        </div>
    );
};

const DesktopStepProgress = ({ activeStep, steps }) => (
    <div className="hidden sm:flex justify-between items-center mb-8">
        {steps.map((step, index) => (
            <div
                key={step.id}
                className="flex flex-col items-center justify-center text-center w-1/4 relative"
            >
                {/* Step Circle */}
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-colors duration-300 mb-3 ${
                        activeStep >= step.id
                            ? "bg-primary border-primary text-white"
                            : "bg-white border-gray-300 text-gray-600"
                    }`}
                >
                    {step.id}
                </div>
                {/* Step Title */}
                <span
                    className={`tms-2 text-sm font-medium  mt-2 text-center px-2 transition-colors duration-300 ${
                        activeStep >= step.id
                            ? "font-semibold text-primary"
                            : "text-gray-500"
                    }`}
                >
                    {step.title}
                </span>
                {/* Horizontal Progress Bar */}
                {index !== steps.length - 1 && (
                    <div className="absolute right-0 top-4 transform translate-x-1/2 h-1 w-full bg-gray-200">
                        <div
                            className="bg-primary h-full transition-all duration-300"
                            style={{
                                width:
                                    activeStep > step.id
                                        ? "100%"
                                        : activeStep === step.id
                                        ? "50%"
                                        : "0%",
                            }}
                        ></div>
                    </div>
                )}
            </div>
        ))}
    </div>
);

const StepProgress = ({ activeStep, steps }) => {
    return (
        <>
            <MobileStepProgress activeStep={activeStep} steps={steps} />
            <DesktopStepProgress activeStep={activeStep} steps={steps} />
        </>
    );
};

export default StepProgress;
