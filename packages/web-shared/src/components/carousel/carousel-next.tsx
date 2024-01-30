"use client";
import { tw } from "@/tailwind";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentProps, forwardRef } from "react";

import { Button } from "../button";
import { useCarousel } from "./use-carousel";

export const CarouselNext = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  ({ className, size = "icon", variant = "outline", ...props }, ref) => {
    const { canScrollNext, orientation, scrollNext } = useCarousel();

    return (
      <Button
        className={tw(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        ref={ref}
        size={size}
        variant={variant}
        {...props}
      >
        <ArrowRightIcon className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";
