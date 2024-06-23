import { fetchApi } from "./config.js";
export const listSinhVien = [];
const toastEle = document.getElementById("liveToast");

export let isEdit = false;
let idStudentEdit = null;

function render(response) {
  const tbodyEle = document.getElementById("tbodyNhanVien");

  const content = response
    .map((item) => {
      return `
        <tr>
            <td>${item.mnv}</td>
            <td>${item.name}</td>
            <td>${item.chucVu}</td>
            <td>${item.luongCoBan}</td>
            <td>${item.tongLuong}</td>
            <td>${item.soGioLam}</td>
            <td>${item.xepLoạiNv}</td>
           
            <td>
                
                <button class="btn btn-danger" onclick="xoaNhanVien('${
                  item.id
                }')">Xóa</button>
            </td>
        </tr>
    `;
    })
    .join("");

  // render ra giao diện
  tbodyEle.innerHTML = content;
}

export const renderTableNhanVien = () => {
  /**
   * 1. Gọi Api để lấy danh sách sinh viên về.
   * 2. Render danh sách ra giao diện.
   */

  // Lấy dữ liệu
  // students: promise
  const employeePromise = fetchApi("student", {
    method: "GET",
  });

  //   then: Lắng nghe response thành công.
  //   catch: Lắng nghe response thất bại.
  employeePromise
    .then((response) => {
      if (response.ok) {
        // Chuyển dữ liệu nhận được là JSON và parse về kiểu dữ liệu JS.
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((response) => {
      render(response);
    })
    .catch((err) => {
      console.log({ err });
    });
};

export const createNhanVien = (nv) => {


  fetchApi("student", {
    method: "POST",
    body: JSON.stringify(nv),
  })
    // .then(() => {})
    // .catch(() => {})
    .finally(() => {
     
      renderTableNhanVien();
    });
};

export const mapper = {
  txtMaMV: "mnv",
  txtTenNV: "name",
  chucvu: "chucVu",
  txtluongCoBan: "luongCoBan",
  txtsoGioLam: "soGioLam",
};

const handleInput = () => {
  // Cứ mỗi lần nhập vào thì sẽ gắn lại giá trị cũ. ngăn chặn nhập giá trị mới.
  ele.value = nv.mnv;
};



export const xoaNhanVien = (id) => {
  console.log({ id });

  fetchApi(`student/${id}`, {
    method: "delete",
  })
    .then((response) => {
      if (response.ok) {
        // Chuyển dữ liệu nhận được là JSON và parse về kiểu dữ liệu JS.
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((response) => {
      console.log(response);

      /**
       * 1. Show toast
       * 2. Thay đổi nội dung của toast
       * 3. Tự động tắt toast sau 3s
       */

      toastEle.classList.add("show");

      // document.querySelector

      /**
       * querySelector
       * querySelectorAll
       * getElementById
       *
       * của element
       */
      // document.querySelector("#idLiveToast .toast-body");
      const toastBodyEle = toastEle.querySelector(".toast-body");

      toastBodyEle.innerHTML = `Xóa nhân viên: ${response.name} thành công`;

      // Sau 3s thì ẩn toast
      setTimeout(() => {
        toastEle.classList.remove("show");
      }, 3000);

      // Nếu như thành công thì sẽ render lại table sinh viên.
      renderTableNhanVien();
    })
    .catch((err) => {
      console.log(err);
    });
};
// Thêm thuộc tính xoaSinhVien vào đối tượng window là một function để cho phép bên phía file HTML có thể gọi được function xoaSinhVien
window.xoaNhanVien = xoaNhanVien;

const tinhDiemTrungBinh = (...diems) => {
  let total = 0;

  for (let diem of diems) {
    // total += diem;
    total = total + diem;
  }

  return (total / diems.length).toFixed(2);
};

const _tinhDiemTrungBinh = (...diems) => {
  const total = diems.reduce((total, item) => {
    return total + item;
  }, 0);

  return total / diems.length;
};

class FakeArray {
  constructor(arr) {
    this.arr = arr;
  }

  reduce(fn, init = this.arr[0]) {
    let total = init;

    for (let item of this.arr) {
      // total += diem;
      total = fn(total, item);
    }

    return total;
  }
}

// document.getElementById("btnSearch").onclick = () => {
//   const searchEle = document.getElementById("txtSearch");

//   fetchApi(`student?name=${searchEle.value}`)
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error(response.statusText);
//       }
//     })
//     .then((resp) => {
//       render(resp);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
