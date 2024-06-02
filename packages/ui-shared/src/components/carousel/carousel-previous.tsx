"use client";
import { tw } from "@/tailwind";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { ComponentProps, forwardRef } from "react";

import { Button } from "../button";
import { useCarousel } from "./use-carousel";

export const CarouselPrevious = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  ({ className, size = "icon", variant = "outline", ...props }, ref) => {
    const { canScrollPrev, orientation, scrollPrev } = useCarousel();

    return (
      <Button
        className={tw(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        ref={ref}
        size={size}
        variant={variant}
        {...props}
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";
