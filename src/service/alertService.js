// alertService.js
import Swal from 'sweetalert2';

export const showSuccessAlert = (title, message) => {
  Swal.fire({
    position: "top-end",
    icon: 'success',
    title: title,
    text: message,
    timer: 2000,
    timerProgressBar: true,
    // didOpen: () => {
    //   Swal.showLoading();
    // }
  });
};

export const showErrorAlert = (title, message) => {
  Swal.fire({
    position: "top-end",
    icon: 'error',
    title: title,
    text: message,
    timer: 2000,
    timerProgressBar: true,
    // didOpen: () => {
    //   Swal.showLoading();
    // }
  });
};
