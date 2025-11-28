import { useEffect } from "react";

const EditPermissionTable = ({ permissionsData, data, setPermissionsData }) => {
  const permissionDependencies = {
    dashboard: ["GET"],
    companies: ["GET", "POST", "PUT"],
    plans: ["GET", "POST", "PUT"],
    emailTemplate: ["GET", "PUT", "DELETE"],
    logs: ["GET", "DELETE"],
    paymentRecords: ["GET", "DELETE"],
  };
  const isPermissionAllowed = (moduleKey, permissionType) => {
    if (!permissionDependencies.hasOwnProperty(moduleKey)) {
      return true;
    }
    return permissionDependencies[moduleKey].includes(permissionType);
  };

  useEffect(() => {
    if (
      data &&
      (!permissionsData || Object.keys(permissionsData).length === 0)
    ) {
      const initialPermissions = {};
      data.forEach((row) => {
        initialPermissions[row.key] = {
          GET: false,
          POST: false,
          PUT: false,
          DELETE: false,
        };
      });
      setPermissionsData(initialPermissions);
    }
  }, [data, permissionsData, setPermissionsData]);

  // Safe check for permission value
  const getPermissionValue = (permissions, key, type) => {
    return permissions?.[key]?.[type] || false;
  };

  // Check if all permissions are selected for all rows
  const areAllPermissionsSelected = () => {
    return data?.every((row) => {
      const permissions = permissionsData[row.key];
      return (
        permissions?.GET &&
        permissions?.POST &&
        permissions?.PUT &&
        permissions?.DELETE
      );
    });
  };

  // Handle Select All checkbox
  const handleSelectAll = () => {
    const shouldSelectAll = !areAllPermissionsSelected();
    const newPermissionsData = { ...permissionsData };

    data?.forEach((row) => {
      newPermissionsData[row.key] = {
        GET: shouldSelectAll,
        POST: shouldSelectAll,
        PUT: shouldSelectAll,
        DELETE: shouldSelectAll,
      };
    });

    setPermissionsData(newPermissionsData);
  };

  const toggleAllPermissions = (rowKey) => {
    setPermissionsData((prevPermissions) => {
      const currentRowState = prevPermissions[rowKey] || {
        GET: false,
        POST: false,
        PUT: false,
        DELETE: false,
      };
      const shouldSelectAll = !(
        currentRowState.GET &&
        currentRowState.POST &&
        currentRowState.PUT &&
        currentRowState.DELETE
      );

      const newPermissions = {
        GET: shouldSelectAll && isPermissionAllowed(rowKey, "GET"),
        POST: shouldSelectAll && isPermissionAllowed(rowKey, "POST"),
        PUT: shouldSelectAll && isPermissionAllowed(rowKey, "PUT"),
        DELETE: shouldSelectAll && isPermissionAllowed(rowKey, "DELETE"),
      };

      return {
        ...prevPermissions,
        [rowKey]: newPermissions,
      };
    });
  };

  const toggleColumnPermissions = (type) => {
    const allChecked = data?.every((row) =>
      getPermissionValue(permissionsData, row.key, type)
    );

    const newPermissionsData = { ...permissionsData };
    data?.forEach((row) => {
      const current = newPermissionsData[row.key] || {
        GET: false,
        POST: false,
        PUT: false,
        DELETE: false,
      };
      const newValue = !allChecked;

      if (type === "GET" && !newValue) {
        newPermissionsData[row.key] = {
          GET: false,
          POST: false,
          PUT: false,
          DELETE: false,
        };
      }
      else if (["POST", "PUT", "DELETE"].includes(type) && newValue) {
        newPermissionsData[row.key] = {
          ...current,
          [type]: newValue,
          GET: true,
        };
      }
      else {
        newPermissionsData[row.key] = {
          ...current,
          [type]: newValue,
        };
      }
    });

    setPermissionsData(newPermissionsData);
  };

  const toggleRowPermission = (rowKey, type) => {
    if (!isPermissionAllowed(rowKey, type)) return;

    setPermissionsData((prevPermissions) => {
      const currentPermissions = prevPermissions[rowKey] || {
        GET: false,
        POST: false,
        PUT: false,
        DELETE: false,
      };

      const isCurrentlyEnabled = currentPermissions[type];
      const newValue = !isCurrentlyEnabled;

      let updatedPermissions = {
        ...currentPermissions,
        [type]: newValue,
      };

      if (["POST", "PUT", "DELETE"].includes(type) && newValue) {
        updatedPermissions.GET = isPermissionAllowed(rowKey, "GET")
          ? true
          : false;
      }

      if (type === "GET" && !newValue) {
        updatedPermissions.POST = false;
        updatedPermissions.PUT = false;
        updatedPermissions.DELETE = false;
      }

      return {
        ...prevPermissions,
        [rowKey]: updatedPermissions,
      };
    });
  };

  
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="min-w-full">
        <thead className="border-b border-primary">
          <tr>
            <th className="px-6 py-2.5 text-left font-semibold text-primary">
              <input
                type="checkbox"
                name="selectAll"
                checked={areAllPermissionsSelected()}
                onChange={handleSelectAll}
                className="form-checkbox h-4 w-4 text-blue-600 focus:outline-none"
              />
            </th>
            <th className="px-6 py-2.5 text-left font-semibold text-primary">
              Permissions
            </th>
            {["GET", "POST", "PUT", "DELETE"].map((type) => (
              <th
                key={type}
                className="px-6 py-2.5 text-left font-semibold text-primary"
              >
                <input
                  type="checkbox"
                  name={`${type.toLowerCase()}All`}
                  checked={data?.every((row) =>
                    getPermissionValue(permissionsData, row.key, type)
                  )}
                  onChange={() => toggleColumnPermissions(type)}
                  className="form-checkbox h-4 w-4 text-blue-600 focus:outline-none mr-2"
                />
                {type === "GET"
                  ? "View"
                  : type === "POST"
                  ? "Add"
                  : type === "PUT"
                  ? "Edit"
                  : type === "DELETE"
                  ? "Delete"
                  : ""}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data?.map((row) => (
            <tr
              key={row.key}
              className="border-b border-primary hover:bg-hover"
            >
              <td className="px-6 py-3 text-secondary whitespace-nowrap font-medium">
                <input
                  type="checkbox"
                  checked={
                    getPermissionValue(permissionsData, row.key, "GET") &&
                    getPermissionValue(permissionsData, row.key, "POST") &&
                    getPermissionValue(permissionsData, row.key, "PUT") &&
                    getPermissionValue(permissionsData, row.key, "DELETE")
                  }
                  onChange={() => toggleAllPermissions(row.key)}
                  className="form-checkbox h-4 w-4 text-blue-600 focus:outline-none"
                />
              </td>
              <td className="px-6 py-3 text-secondary whitespace-nowrap font-medium">
                {row.title}
              </td>
              {["GET", "POST", "PUT", "DELETE"].map((type) => (
                <td
                  key={type}
                  className="px-6 py-3 text-secondary whitespace-nowrap font-medium"
                >
                  <input
                    type="checkbox"
                    checked={getPermissionValue(permissionsData, row.key, type)}
                    onChange={() => toggleRowPermission(row.key, type)}
                    disabled={!isPermissionAllowed(row.key, type)}
                    className={`form-checkbox h-4 w-4 focus:outline-none ${
                      !isPermissionAllowed(row.key, type)
                        ? "text-gray-400 cursor-not-allowed "
                        : "text-blue-600"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditPermissionTable;
