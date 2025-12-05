"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeAlert } from '@/store/errorSlice';

const ErrorAlerts: React.FC = () => {
  const dispatch = useDispatch();
  const errors = useSelector((state: RootState) => state.error.messages);

  useEffect(() => {
    errors.forEach((error) => {
      const timer = setTimeout(() => dispatch(removeAlert(error.id)), 10000);
      return () => clearTimeout(timer);
    });
  }, [errors, dispatch]);

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {errors.map((error) => (
        //mostra questo div solo se type errror è error, un altro se è info o success
        error.type === "error" ? (
          <div
            key={error.id}
            role="alert"
            className="alert alert-error shadow-lg relative overflow-hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error.text}</span>
            <button
              className="ml-2 btn btn-sm btn-outline"
              onClick={() => dispatch(removeAlert(error.id))}
            >
              Dismiss
            </button>
            <div
              className="absolute bottom-0 left-0 h-1 bg-red-500"
              style={{ animation: `progress-bar-${error.id} 10s linear` }}
            ></div>
            <style jsx>{`
            @keyframes progress-bar-${error.id} {
              from {
                width: 100%;
              }
              to {
                width: 0%;
              }
            }
          `}</style>
          </div>
        ) : error.type === "success" ? (
          <div key={error.id} className="toast toast-end">
            <div className="alert alert-success">
              <span>{error.text}</span>
            </div>
            <div
              className="absolute bottom-0 left-0 h-1 bg-green-800"
              style={{ animation: `progress-bar-${error.id} 6s linear` }}
            ></div>
            <style jsx>{`
            @keyframes progress-bar-${error.id} {
              from {
                width: 100%;
              }
              to {
                width: 0%;
              }
            }
          `}</style>
          </div>
        ) : (
          <div key={error.id} className="toast toast-end">
            <div className="alert alert-info">
              <span>{error.text}</span>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default ErrorAlerts;