const listFields: { [key: string]: string[] } = {
  waterService: [
    "id",
    "appNumber",
    "propertyType",
    "meterSize",
    "createdAt",
    "applicationStatus",
  ]
};
export const getListFields = (moduleName: string): string[] => {
  return listFields[moduleName] || [];
}