import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({ className, children }) => {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-screen-3xl px-2.5 sm:px-4 md:px-8 lg:px-12",
                className
            )}
        >
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
