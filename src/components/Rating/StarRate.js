import React from "react";
import { StarIcon } from "../../icons";

export const StarRate = ({ rate }) => {
    const starCount = [...Array(rate).fill({ fill: true }), ...Array(5 - rate).fill({ fill: false })]
    return (
        <div className="flex flex-row">
            {starCount.map((star, index) =>
                <span>
                    <StarIcon className={"h-5 w-5 " + (star.fill ? "text-black dark:text-white" : "text-gray-500")} />
                </span>
            )}
        </div>
    );
}