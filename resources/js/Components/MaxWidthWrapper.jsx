import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({ className, children }) => {
    return (
        <div
            className={cn(
                "mx-auto w-full px-2 md:px-4 lg:max-w-[1300px] xl:max-w-[1400px] ",
                className
            )}
        >
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
