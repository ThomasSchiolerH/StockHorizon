import React from 'react';
import '../styles/Notice.css'; // Import the corresponding CSS file for styling

const Notice = () => {
  return (
    <div className="notice">
      <h2>Important Notice</h2>
      <p>
        To ensure the authentication process works smoothly, please make sure
        that third-party cookies and pop-ups are allowed in your browser settings.
      </p>
      <p>Instructions:</p>
      <ul>
        <li>
          <strong>Chrome:</strong> Go to Settings &gt; Privacy and Security &gt; Cookies and other site data &gt; Allow all cookies.
        </li>
        <li>
          <strong>Safari:</strong> Go to Preferences &gt; Privacy &gt; Uncheck Prevent cross-site tracking.
        </li>
        <li>
          <strong>Firefox:</strong> Go to Options &gt; Privacy & Security &gt; Cookies and Site Data &gt; Enable third-party cookies.
        </li>
      </ul>
    </div>
  );
};

export default Notice;
