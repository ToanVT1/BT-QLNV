import { NhanVien } from "./nhan-vien.js";
import {
  createNhanVien,
  isEdit,
  renderTableNhanVien,
} from "./manage-nhan-vien.js";
import { mapper } from "./manage-nhan-vien.js";
import { Validator } from "./validator.js";
function layThongTinSinhVien() {
  // return new SinhVien(msv, ten, email)
}

/**
 * Vừa nhận được phím enter để submit
 * Vừa nhận được click button để submit
 *
 * ||
 * VV
 * onsubmit của thẻ form
 */

const formEle = document.getElementById("formQLSV");

/**
 * test case:
 * - có dữ liệu
 * - không có dữ liệu
 */

const listEle = document.querySelectorAll("#formQLSV input, #formQLSV select");

formEle.onsubmit = (event) => {
  // Chặn đi sự kiện mặc định của thẻ form: reload page.
  event.preventDefault();

  forceValidate();

  // Nếu còn có lỗi thì không cho submit
  if (!isValid()) {
    return;
  }

  // const msv = document.getElementById("txtMaSV").value;
  // const txtTenSV = document.getElementById("txtTenSV").value;
  // const txtEmail = document.getElementById("txtEmail").value;
  // const txtPass = document.getElementById("txtPass").value;
  // const khSV = document.getElementById("khSV").value;
  // const txtDiemToan = document.getElementById("txtDiemToan").value;
  // const txtDiemLy = document.getElementById("txtDiemLy").value;
  // const txtDiemHoa = document.getElementById("txtDiemHoa").value;

  // querySelectorAll
  // NodeList: mảng nhưng không phải là Array
  // NodeList -> Array
  // Array.from(NodeList)

  const nv = {};

  listEle.forEach((ele) => {
    // console.log(ele.id, ele.value);
    // ele.id = 'txtMaSV'
    // sv[ele.id] => sv['txtMaSV']
    nv[ele.id] = ele.value;
  });

  const newNhanVien = new NhanVien(
    sv.txtMaNV,
    sv.txtTenNV,
    sv.chucVu,
    +sv.txtluongCoBan,
    +sv.txtsoGioLam,
  );


    createNhanVien(newNhanVien);


  // ❌: Có thể bị lỗi.
  // new SinhVien(...sv);

  // Clear form input người dùng đã nhập vào.
  formEle.reset();
};

// Lắng nghe trang web đã tải xong.
document.addEventListener("DOMContentLoaded", () => {
  renderTableNhanVien();
});

/**
 *
 * 1. Validate khi người dùng rời khỏi input
 * 2. Tạo một biến lưu trữ những ô input mà người dùng đã từng đi qua.
 * - visited
 * - touches ✅
 *
 * 3. Chưa nhập dữ liệu nhưng nhấn button submit
 * - Xét cho biến lưu trữ toàn bộ ô input là người dùng đã đi qua.
 * - Validate
 */
/**
 * msv: bắt buộc, ký tự chữ, ít nhất là 3 ký tự, nhiều nhất là 10 ký tự.
 * name: bắt buộc, ký tự chữ, ít nhất là 2 ký tự, nhiều nhất là 50 ký tự.
 * email: bắt buộc, email.
 * password: bắt buộc, có ít nhất 1 ký tự in hoa + 1 ký tự số + 1 ký tự đặc biệt.
 * birthday: bắt buộc.
 * course: bắt buộc.
 * math: bắt buộc, number, ít nhất 0, nhiều nhất 10.
 * physic: bắt buộc, number, ít nhất 0, nhiều nhất 10.
 * chemistry: bắt buộc, number, ít nhất 0, nhiều nhất 10.
 */

function handleValidate() {
  const filterNhanVien = Object.entries(nhanVien).filter(([key, value]) => {
    return value.touch === true;
  });

  filterNhanVien.forEach(([key, value]) => {
    switch (key) {
      case "mnv":
        nhanVien[key].errMsg = new Validator(value.value)
          .isRequire()
          .isOnlyString()
          .min(3)
          .max(10).message;
        break;
      case "name":
        nhanVien[key].errMsg = new Validator(value.value)
          .isRequire()
          .isOnlyString()
          .min(2)
          .max(50).message;
        break;
      case "chucVu":
        nhanVien[key].errMsg = new Validator(value.value).isRequire().message;
        break;
      case "luongCoBan":
        nhanVien[key].errMsg = new Validator(value.value)
          .isRequire()
          .isNumber()
          .min(0)
          .max(10).message;
        break;
      case "soGioLam":
        nhanVien[key].errMsg = new Validator(value.value)
          .isRequire()
          .isNumber()
          .min(0)
          .max(10).message;
        break;
      default:
        break;
    }
  });
}

function handleBlur(event) {
  // value
  nhanVien[mapper[event.target.id]].value = event.target.value;

  // validate
  // 1. Chỉ validate những ô input đã từng đi qua.

  // Convert Object -> Array: Object.entries(obj), Object.keys(obj), Object.values(obj)

  handleValidate();

  renderForm();
}

const mapperErrors = {
  spanMaNV: "mnv",
  spanTenNV: "name",
  spanchucVu: "chucVu",
  spanluongCoBan: "luongCoBan",
  spansoGioLam: "soGioLam",
};
function renderForm() {
  const listEleErrs = document.querySelectorAll(
    "#formQLSV input + span, #formQLSV select + span"
  );

  listEleErrs.forEach((ele) => {
    const key = mapperErrors[ele.id];

    if (nhanVien[key].touch) {
      ele.innerHTML = nhanVien[key].errMsg;
    }
  });
}

function handleFocus(event) {

  // if (event.target.id === "txtMSV") {
  //   sinhVien.msv.touch = true;
  // }

  // Xét touch
  nhanVien[mapper[event.target.id]].touch = true;
}

function isValid() {
  return Object.values(nhanVien).every((item) => {
    return item.errMsg === "";
  });
}

// dành cho trường hợp số 3;
function forceValidate() {
  // Cập nhật tất cả đều là đã từng đi qua.
  Object.values(nhanVien).forEach((item) => {
    item.touch = true;
  });

  handleValidate();

  renderForm();
}

class DefaultValue {
  constructor(touch = false, value = "", errMsg = "") {
    this.touch = touch;
    this.value = value;
    this.errMsg = errMsg;
  }
}

const nhanVien = {
  mnv: new DefaultValue(),
  name: new DefaultValue(),
  chucVu: new DefaultValue(),
  luongCoBan: new DefaultValue(),
  soGioLam: new DefaultValue(),
};

listEle.forEach((ele) => {
  ele.onblur = handleBlur;

  ele.onfocus = handleFocus;
});
