export const Feature = ({ Icon, value }) => (
    <div className="flex flex-col items-center">
        <Icon className="w-6 h-6 text-gray-500 mb-1" />
        <p className="text-xs text-gray-600 text-center">{value}</p>
    </div>
);
