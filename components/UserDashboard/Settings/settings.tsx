"use client";

import PersonalInformation from "./PersonalInformation";
import OrganizationDetails from "./OrganizationDetails";
import SecuritySettings from "./SecuritySettings";
import NotificationPreferences from "./NotificationPreferences";

//========== Settings Page ==========
const Settings = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 md:p-6">
      {/*========== Personal Information Section ==========*/}
      <PersonalInformation />

      {/*========== Organization Details Section ==========*/}
      <OrganizationDetails />

      {/*========== Security Section ==========*/}
      <SecuritySettings />

      {/*========== Notification Preferences Section ==========*/}
      <NotificationPreferences />
    </div>
  );
};

export default Settings;
