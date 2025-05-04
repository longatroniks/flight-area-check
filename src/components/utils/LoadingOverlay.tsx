import React from 'react';
import Spinner from './Spinner';
import '../../assets/styles/components/loading-overlay.css';

interface LoadingOverlayProps {
    isLoading: boolean;
    message?: string;
    fullScreen?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    isLoading,
    message = 'Loading...',
    fullScreen = false
}) => {
    if (!isLoading) return null;

    return (
        <div className={`loading-overlay ${fullScreen ? 'fullscreen' : ''}`}>
            <div className="loading-box">
                <Spinner color={'secondary'} />
                <span className="loading-message">{message}</span>
            </div>
        </div>
    );
};

export default LoadingOverlay;
