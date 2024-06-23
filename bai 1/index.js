function inThongTinSinhVien(sv) {
  document.getElementById("spanTenSV").innerHTML = sv.ten;
  document.getElementById("spanMaSV").innerHTML = sv.msv;
  document.getElementById("spanLoaiSV").innerHTML = sv.loai;
  document.getElementById("spanDTB").innerHTML = sv.tinhDiemTB;
  document.getElementById("spanXepLoai").innerHTML = sv.xepLoai();
}

function layThongTinCuaSinhVien() {
  var ten = document.getElementById("txtTenSV").value;
  var msv = document.getElementById("txtMaSV").value;
  var loai = document.getElementById("loaiSV").value;
  var diemToan = Number(document.getElementById("txtDiemToan").value);
  var diemVan = Number(document.getElementById("txtDiemVan").value);

  console.log(msv, loai, ten, diemToan, diemVan);

  var sv = {
    msv,
    loai,
    ten,
    diemToan,
    diemVan,

    tinhDiemTB() {
      return (this.diemToan + this.diemVan) / 2;
    },

    xepLoai() {
      var dtb = this.tinhDiemTB();

      if (dtb < 5) {
        return "Trung Bình";
      }

      if (dtb >= 5 && dtb < 8) {
        return "Khá";
      }

      if (dtb >= 8) {
        return "Giỏi";
      }
    },
  };

  return sv;

  var sv = {
    msv,
    loai,
    ten,
    diemToan,
    diemVan,
  };

  return sv;

  // Đưa tất cả thông tin này ra bên ngoài
  return msv, loai, ten, diemToan, diemVan;
  return loai;
  return ten;
}

function handleHienThiThongTin() {
  // 1.
  var sv = layThongTinCuaSinhVien();

  // 2.
  inThongTinSinhVien(sv);
}

// Gắn function khi htt được click bởi người dùng
document.getElementById("htt").onclick = handleHienThiThongTin;
