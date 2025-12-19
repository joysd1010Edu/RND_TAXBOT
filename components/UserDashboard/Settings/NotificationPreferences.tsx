"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toastManager } from "@/components/ui/toast";

//========== Notification Preferences Component ==========
const NotificationPreferences: React.FC = () => {
  const [smsAlerts, setSmsAlerts] = useState(true);

  //========== Handle Notification Change ==========
  const handleNotificationChange = () => {
    const newValue = !smsAlerts;
    setSmsAlerts(newValue);
    console.log("SMS Alerts:", newValue);
    toastManager.add({
      title: newValue ? "SMS Alerts Enabled" : "SMS Alerts Disabled",
      description: `You will ${
        newValue ? "now" : "no longer"
      } receive urgent notifications via SMS.`,
      type: "success",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Notification Preferences
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Customize how and when you receive notifications
        </p>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            SMS Alerts
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Receive urgent notifications via SMS
          </p>
        </div>
        <Switch
          checked={smsAlerts}
          onCheckedChange={handleNotificationChange}
        />
      </div>
    </div>
  );
};

export default NotificationPreferences;
