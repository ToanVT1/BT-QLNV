// Tạo lớp đối tượng nhân viên.
export class NhanVien {
  constructor(
    mnv,
    ten,
    chucVu,
    luongCoBan,
    soGioLam,
  ) {
    this.mnv = mnv;
    this.name = ten;
    this.chucVu = chucVu;
    this.luongCoban = luongCoBan;
    this.soGioLam = soGioLam;
  }

  tinhDiemTB() {
    return (this.diemHoa + this.diemLy + this.diemToan) / 3;
  }

  xepLoai() {
    var dtb = this.tinhDiemTB();
  }
}
