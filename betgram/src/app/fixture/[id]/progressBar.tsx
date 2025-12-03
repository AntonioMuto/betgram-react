import { motion } from "framer-motion";

type ProgressBarProps = {
    homeValue: number;
    awayValue: number; 
    homeColor?: string;
    awayColor?: string;
    height?: string,
    animate?: boolean
};

export default function ProgressBar({
    homeValue,
    awayValue,
    homeColor = "bg-red-500",
    awayColor = "bg-green-600",
    height = "h-1.5",
    animate = true,
}: ProgressBarProps) {
    return (
        <div
            className={`relative w-full ${height} rounded-full bg-gray-700 overflow-hidden`}
            role="progressbar"
            aria-valuenow={homeValue}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            <motion.div
                className={`${homeColor} h-full absolute left-0 top-0`}
                initial={{ width: 0 }}
                animate={animate ? { width: `${homeValue}%` } : false}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <motion.div
                className={`${awayColor} h-full absolute right-0 top-0`}
                initial={{ width: 0 }}
                animate={animate ? { width: `${awayValue}%` } : false}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
        </div>
    );
}