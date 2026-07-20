"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import Image from "next/image";

export default function DonateModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={modalRef}
        className="relative w-full bg-surface border border-black/10 dark:border-white/10 rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-w-lg flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5">
          <h2 className="text-xl font-semibold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FF5E5B]">favorite</span>
            Support E404R
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 text-center">
          <p className="text-text-muted text-sm mb-6">
            E404R is open-source and maintained with passion. If this router saves you time or money, consider buying me a coffee! Your support helps cover server costs and fuels future development.
          </p>
          
          <div className="flex flex-col items-center p-6 rounded-xl border-2 border-black/5 dark:border-white/5 bg-surface-2 hover:border-[#FF5E5B]/40 transition-colors shadow-sm">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[#FF5E5B]/20 text-[#FF5E5B]"
            >
              <span className="material-symbols-outlined text-[32px]">local_cafe</span>
            </div>
            
            <div className="font-bold text-lg text-text-main mb-1">Buy me a coffee on Ko-fi</div>
            <div className="text-sm text-text-muted mb-6">Support via Visa / Mastercard / PayPal</div>
            
            <div className="bg-white p-2 rounded-xl shadow-sm mb-6 inline-block border border-black/5">
              <img
                src="/kofi-qr.jpg"
                alt="Ko-fi QR Code"
                className="w-[180px] h-[180px] object-contain rounded-lg"
              />
            </div>
            
            <a
              href="https://ko-fi.com/adamafaye"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-base font-semibold text-white hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
              style={{ backgroundColor: "#FF5E5B" }}
            >
              Donate Now
              <span className="material-symbols-outlined text-[20px]">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

DonateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
