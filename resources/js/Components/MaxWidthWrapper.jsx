import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({ className, children }) => {
    return (
        <div
            className={cn(
                "mx-auto w-full px-4  max-w-[1400px] ",
                className
            )}
        >
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
