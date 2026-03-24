import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@lib/utils/cn';
import { X } from 'lucide-react';
import Button from '../button/Button';
import { Popover } from '../popover/Popover';

export interface TourStep {
    target: string | HTMLElement; // CSS Selector like '#my-btn' or element reference
    title: React.ReactNode;
    description: React.ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
}

export interface TourProps {
    open: boolean;
    onClose: () => void;
    steps: TourStep[];
}

interface RectState {
    top: number;
    left: number;
    width: number;
    height: number;
}

const PADDING = 8; // padding around the target hole

const Tour: React.FC<TourProps> = ({ open, onClose, steps }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [targetRect, setTargetRect] = useState<RectState | null>(null);
    const [isClient, setIsClient] = useState(false);
    
    const targetRef = React.useRef<Element | null>(null);
    const [, setRenderTick] = useState(0);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const updateRect = useCallback(() => {
        if (!open || steps.length === 0) return;
        const step = steps[currentStep];
        if (!step) return;

        let el: HTMLElement | null = null;
        if (typeof step.target === 'string') {
            el = document.querySelector(step.target);
        } else {
            el = step.target;
        }

        if (el) {
            targetRef.current = el;
            // Scroll element into view if not visible
            el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            
            // Wait slightly for scroll to finish
            setTimeout(() => {
                const rect = el?.getBoundingClientRect();
                if (rect) {
                    setTargetRect({
                        top: rect.top + window.scrollY,
                        left: rect.left + window.scrollX,
                        width: rect.width,
                        height: rect.height
                    });
                    setRenderTick(t => t + 1);
                }
            }, 300); // 300ms is smooth scroll duration approx
        } else {
            targetRef.current = null;
            setTargetRect(null); // Element not found
            setRenderTick(t => t + 1);
        }
    }, [open, steps, currentStep]);

    const handleScroll = useCallback(() => {
        if (!targetRef.current || !open) return;
        const rect = targetRef.current.getBoundingClientRect();
        setTargetRect({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height
        });
        setRenderTick(t => t + 1);
    }, [open]);

    useLayoutEffect(() => {
        updateRect();
        window.addEventListener('resize', updateRect);
        window.addEventListener('scroll', handleScroll, true); // Use capture to get all scrolls inside
        return () => {
            window.removeEventListener('resize', updateRect);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [updateRect, handleScroll]);

    if (!isClient || !open || steps.length === 0) return null;

    const stepInfo = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
        else onClose();
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    return (
        <>
            {createPortal(
                <div className="fixed inset-0 z-9999 pointer-events-none">
                    {/* SVG Overlay to create the spotlight hole */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-auto"
                        style={{ zIndex: 1 }}
                        onClick={(e) => {
                             // Optionally close on backdrop click: onClose();
                             e.stopPropagation();
                        }}
                    >
                        <defs>
                            <mask id="tour-mask">
                                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                                {targetRect && (
                                    <rect
                                        x={targetRect.left - PADDING - window.scrollX}
                                        y={targetRect.top - PADDING - window.scrollY}
                                        width={targetRect.width + PADDING * 2}
                                        height={targetRect.height + PADDING * 2}
                                        rx="8"
                                        fill="black"
                                        className="transition-all duration-300 ease-in-out origin-center"
                                    />
                                )}
                            </mask>
                        </defs>
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="rgba(0,0,0,0.5)"
                            mask="url(#tour-mask)"
                        />
                    </svg>
                </div>,
                document.body
            )}

            {/* Popover Card */}
            {targetRef.current && (
                <Popover
                    isOpen={true}
                    triggerRef={targetRef as any}
                    placement={stepInfo.placement || 'bottom'}
                    showArrow
                    isNonModal
                    className="z-10000 w-80 p-5 shadow-2xl transition-all duration-300 ease-in-out"
                >
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 outline-none z-10"
                        aria-label="Close Tour"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="mb-1 text-sm font-semibold text-gray-900 pr-6">
                        {stepInfo.title}
                    </div>
                    <div className="mb-5 text-sm text-gray-500 leading-relaxed">
                        {stepInfo.description}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex space-x-1">
                            {steps.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={cn(
                                        "block w-2 h-2 rounded-full transition-colors",
                                        idx === currentStep ? "bg-primary" : "bg-gray-200"
                                    )}
                                />
                            ))}
                        </div>

                        <div className="flex gap-2">
                            {currentStep > 0 && (
                                <Button variant="outline" size="sm" onClick={prevStep}>
                                    Trở lại
                                </Button>
                            )}
                            <Button variant="primary" size="sm" onClick={nextStep}>
                                {isLastStep ? 'Hoàn thành' : 'Tiếp tục'}
                            </Button>
                        </div>
                    </div>
                </Popover>
            )}
        </>
    );
};

export default Tour;
