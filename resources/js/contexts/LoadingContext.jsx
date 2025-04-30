import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");
    const [isInitialized, setIsInitialized] = useState(false);

    const showLoading = useCallback((message = "Loading...") => {
        setLoadingMessage(message);
        setIsLoading(true);
    }, []);

    const hideLoading = useCallback(() => {
        setIsLoading(false);
        setLoadingMessage("Loading...");
    }, []);

    // Initialize the app
    useEffect(() => {
        const initializeApp = async () => {
            try {
                // Simulate some initialization time
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setIsInitialized(true);
                hideLoading();
            } catch (error) {
                console.error("Initialization error:", error);
                hideLoading();
            }
        };

        initializeApp();
    }, [hideLoading]);

    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                loadingMessage,
                showLoading,
                hideLoading,
                isInitialized,
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
