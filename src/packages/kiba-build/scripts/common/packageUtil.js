
const getExternalPackages = (package) => {
  return Object.keys(package.dependencies || {})
    .concat(Object.keys(package.peerDependencies || {}))
    .concat(Object.keys(package.optionalDependencies || {}));
}

const isExternalPackageRequest = (package, request) => {
  return getExternalPackages(package).some((packageName) => {
    return (request === packageName) || (request.indexOf(`${packageName}/`) === 0)
  });
}

module.exports = {
  getExternalPackages: getExternalPackages,
  isExternalPackageRequest: isExternalPackageRequest,
};
