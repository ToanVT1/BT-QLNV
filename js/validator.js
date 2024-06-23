export class Validator {
    constructor(value) {
      this.value = value.trim();
  
      this.__errorMessage = "";
    }
  
    isRequire(message = "Bắt buộc nhập vào.") {
      if (this.__errorMessage) return this;
  
      if (this.value.length === 0) {
        this.__errorMessage = message;
      }
  
      return this;
    }
  
  
    isNumber() {
      if (this.__errorMessage) return this;
  
      if (Number.isNaN(+this.value)) {
        this.__errorMessage = "Bắt buộc nhập vào ký tự số.";
      }
  
      this.value = Number(this.value);
  
      return this;
    }
  
    isOnlyString() {
      if (this.__errorMessage) return this;
  
      const REGEX_STRING = /^[a-zA-Z]+$/g;
      if (!REGEX_STRING.test(this.value)) {
        this.__errorMessage = "Chỉ được nhập vào ký tự chữ";
      }
  
      return this;
    }
  
    isStringWithSpace() {
      if (this.__errorMessage) return this;
  
      const REGEX_STRING_ALLOW_SPACE = /^[a-zA-Z ]+$/g;
  
      if (!REGEX_STRING_ALLOW_SPACE.test(this.value)) {
        this.__errorMessage = "Chỉ được nhập vào ký tự chữ";
      }
  
      return this;
    }
  
    min(value) {
      if (this.__errorMessage) return this;
  
      if (typeof this.value === "string") {
        if (this.value.length < value) {
          this.__errorMessage = `Không được nhập ít hơn ${value} ký tự.`;
        }
      }
  
      if (typeof this.value === "number") {
        if (this.value < value) {
          this.__errorMessage = `Không được nhập nhỏ hơn số ${value}`;
        }
      }
  
      return this;
    }
  
    max(value) {
      if (this.__errorMessage) return this;
  
      if (typeof this.value === "string") {
        if (this.value.length > value) {
          this.__errorMessage = `Không được nhập nhiều hơn ${value} ký tự.`;
        }
      }
  
      if (typeof this.value === "number") {
        if (this.value > value) {
          this.__errorMessage = `Không được nhập lớn hơn số ${value}`;
        }
      }
  
      return this;
    }
  
    get message() {
      return this.__errorMessage;
    }
  }
  
  console.log(
    new Validator("").isRequire("Require").isOnlyString().min(3).max(5)
      .message
  );
  
  console.log(new Validator("").isRequire().isNumber().min(3).max(5).message);
  