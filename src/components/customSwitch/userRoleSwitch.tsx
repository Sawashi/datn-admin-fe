import React, { useState } from "react";
import { Switch, message } from "antd";
import { User } from "../../apis/users";
import { changeUserRole } from "../../apis/users";
import { ref } from "firebase/storage";

interface UserRoleSwitchProps {
  user: User;
  refreshData: () => void;
}

const UserRoleSwitch: React.FC<UserRoleSwitchProps> = ({
  user,
  refreshData,
}) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(user.role);

  const handleChange = async (checked: boolean) => {
    setLoading(true);
    const newRole = checked ? "admin" : "user"; // Assuming 'admin' and 'user' are the roles

    try {
      const updatedUser = await changeUserRole(parseInt(user.id), newRole);
      setRole(newRole);
      message.success("User role updated successfully");
      refreshData();
    } catch (error) {
      message.error("Failed to update user role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Switch
      checked={role === "admin"}
      onChange={handleChange}
      loading={loading}
      checkedChildren="Admin"
      unCheckedChildren="User"
    />
  );
};

export default UserRoleSwitch;
