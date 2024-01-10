export function getUserLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(data) {
      resolve(data);
    }
    function error(error) {
      reject(error);
    }
  });
}
