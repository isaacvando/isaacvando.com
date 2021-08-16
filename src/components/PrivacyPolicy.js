import React from 'react';

const PrivacyPolicy = () => {
  return (
    <>
      <h1>remindrs - Privacy Policy</h1>
      <hr className="Separator"></hr>
      <div className="Container">
        <p>Last updated August 16, 2021</p>
        <p>If you have any questions or concerns about this privacy policy,
          please contact me at <strong>vandorenprojects at gmail dot com</strong>.</p>
        <h3>What information does remindrs collect?</h3>
        <p>remindrs only saves user generated data locally on your device.
          I have no access to any information on your device via remindrs.
          No information is collected or shared.</p>
        <h3>What permissions does remindrs request?</h3>
        <p>remindrs requests access to send push notifications.</p>
        <p>~Isaac Van Doren, devloper of remindrs</p>
      </div>
    </>
  );
}

export default PrivacyPolicy;